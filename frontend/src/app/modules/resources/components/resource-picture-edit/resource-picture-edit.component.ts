import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ResourcesQuery, ResourcesService } from '../../state';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-resource-picture-edit',
  templateUrl: './resource-picture-edit.component.html',
  styleUrls: ['./resource-picture-edit.component.scss']
})
export class ResourcePictureEditComponent implements OnInit {
  @Input() id;
  pictureUrl: String;

  @ViewChild('imageInput') imageInput: ElementRef;
  selectedFile: ImageSnippet;

  isSaving = false;

  constructor(private resourceQuery: ResourcesQuery,
              private resourcesService: ResourcesService) { }

  ngOnInit() {
    this.resourcesService.receiveImage(this.id).subscribe(
        imageUrl => this.pictureUrl = imageUrl,
        () => this.pictureUrl = '/assets/no-product.png'
    );
  }

  isDefaultPicture() {
    return this.pictureUrl === '/assets/no-product.png';
  }

  removePreUploadedFile() {
    const fileInput: HTMLInputElement = this.imageInput.nativeElement;
    this.selectedFile = null;
    fileInput.value = '';
  }

  launchFileInput() {
    const fileInput: HTMLInputElement = this.imageInput.nativeElement;
    fileInput.click();
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
    });

    file && reader.readAsDataURL(file);
  }

  removeImage() {
    this.isSaving = true;

    this.resourcesService.removeImage(this.id).subscribe(
        (res) => {
          this.pictureUrl = '/assets/no-product.png'
        },
        (err) => {

        }, () => {
          this.isSaving = false
        })
  }

  uploadImage() {
    this.isSaving = true;

    this.resourcesService.uploadImage(this.id, this.selectedFile.file).subscribe(
        (res) => {
          this.resourcesService.receiveImage(this.id).subscribe(
              imageUrl => {
                this.pictureUrl = imageUrl;
                this.removePreUploadedFile();
              },
              () => this.pictureUrl = '/assets/no-product.png'
          );
        },
        (err) => {

        }, () => {
          this.isSaving = false
        })
  }


}
