import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceBuyComponent } from './resource-buy.component';

describe('ResourceBuyComponent', () => {
  let component: ResourceBuyComponent;
  let fixture: ComponentFixture<ResourceBuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceBuyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
