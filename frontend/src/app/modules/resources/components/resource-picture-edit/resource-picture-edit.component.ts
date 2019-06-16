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

  constructor(private resourceQuery: ResourcesQuery,
              private resourcesService: ResourcesService) { }

  ngOnInit() {
    this.pictureUrl = this.resourceQuery.getEntity(this.id).pictureUrl;
  }

  isDefaultPicture() {
    return this.pictureUrl === '/assets/no-product.png';
  }

  removePreUploadedFile() {
    this.selectedFile = null;
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

      this.resourcesService.uploadImage(this.id, this.selectedFile.file).subscribe(
        (res) => {

        },
        (err) => {

        })
    });

    file && reader.readAsDataURL(file);
  }


}
