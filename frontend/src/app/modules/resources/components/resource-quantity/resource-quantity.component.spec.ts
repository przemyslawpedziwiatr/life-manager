import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceQuantityComponent } from './resource-quantity.component';

describe('ResourceQuantityComponent', () => {
  let component: ResourceQuantityComponent;
  let fixture: ComponentFixture<ResourceQuantityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceQuantityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
