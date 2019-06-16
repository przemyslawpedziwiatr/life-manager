import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcePictureComponent } from './resource-picture.component';

describe('ResourcePictureComponent', () => {
  let component: ResourcePictureComponent;
  let fixture: ComponentFixture<ResourcePictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourcePictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcePictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
