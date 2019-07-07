import {ImageTools} from "./image-tools";

const Busboy = require('busboy');
const fs = require('fs');
const path = require('path');
const os = require('os');

export interface UploadedFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Array<any>;
    size: number;
}

// @ts-ignore
export const filesUpload = function(req, res, next) {
    // See https://cloud.google.com/functions/docs/writing/http#multipart_data
    const busboy = new Busboy({
        headers: req.headers,
        limits: {
            // Cloud functions impose this restriction anyway
            fileSize: 10 * 1024 * 1024,
        }
    });

    const fields = {};
    // @ts-ignore
    const files: Array<UploadedFile> = [];
    // @ts-ignore
    const fileWrites = [];
    // Note: os.tmpdir() points to an in-memory file system on GCF
    // Thus, any files in it must fit in the instance's memory.
    const tmpdir = os.tmpdir();

    // @ts-ignore
    busboy.on('field', (key, value) => {
        // You could do additional deserialization logic here, values will just be
        // strings
        // @ts-ignore
        fields[key] = value;
    });

    // @ts-ignore
    busboy.on('file',  (fieldname, file, filename, encoding, mimetype) => {
        const filePath = path.join(tmpdir, filename);
        console.log(`Handling file upload field ${fieldname}: ${filename} (${filePath})`);
        const writeStream = fs.createWriteStream(filePath);

        file.pipe(writeStream);

        fileWrites.push(new Promise((resolve, reject) => {
            file.on('end', () => writeStream.end());
            writeStream.on('finish', async () => {
                await ImageTools.resizeAndSaveExisting(filename, filePath);

                // @ts-ignore
                fs.readFile(filePath, async (err, buffer) => {
                    const size = Buffer.byteLength(buffer);
                    console.log(`${filename} is ${size} bytes`);

                    if (err) {
                        reject(err);
                        return;
                    }

                    files.push({
                        fieldname,
                        originalname: filename,
                        encoding,
                        mimetype,
                        buffer,
                        size,
                    });

                    resolve();
                });
            });
            writeStream.on('error', reject);
        }));
    });

    busboy.on('finish', () => {
        // @ts-ignore
        Promise.all(fileWrites)
            .then(() => {
                req.body = fields;
                // @ts-ignore
                req.files = files;
                next();
            })
            .catch(next);
    });

    busboy.end(req.rawBody);
}
