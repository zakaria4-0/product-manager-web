import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewestProductComponent } from './newest-product.component';

describe('NewestProductComponent', () => {
  let component: NewestProductComponent;
  let fixture: ComponentFixture<NewestProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewestProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewestProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
