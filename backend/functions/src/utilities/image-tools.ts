const sharp = require("sharp");
const os = require('os');
const fs = require('fs');

export class ImageTools {
    static async resizeAndSaveExisting(fileName: string, filePath: string,  options?: { width: number, height: number}) {
        const convertedFilePath = `${os.tmpdir()}/C_${fileName}`;
        await sharp(filePath).resize(
            options && options.height ? options.height : 320,
            options && options.width ? options.width: 240)
            .toFile(convertedFilePath);
        fs.unlinkSync(filePath);
        fs.renameSync(convertedFilePath,filePath);
    }
}
