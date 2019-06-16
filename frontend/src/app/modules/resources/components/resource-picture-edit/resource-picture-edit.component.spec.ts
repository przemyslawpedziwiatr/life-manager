import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcePictureEditComponent } from './resource-picture-edit.component';

describe('ResourcePictureEditComponent', () => {
  let component: ResourcePictureEditComponent;
  let fixture: ComponentFixture<ResourcePictureEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourcePictureEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcePictureEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
