import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceBuyProvidersComponent } from './resource-buy-providers.component';

describe('ResourceBuyProvidersComponent', () => {
  let component: ResourceBuyProvidersComponent;
  let fixture: ComponentFixture<ResourceBuyProvidersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceBuyProvidersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceBuyProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
