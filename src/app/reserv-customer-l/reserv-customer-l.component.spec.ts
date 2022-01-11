import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservCustomerLComponent } from './reserv-customer-l.component';

describe('ReservCustomerLComponent', () => {
  let component: ReservCustomerLComponent;
  let fixture: ComponentFixture<ReservCustomerLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservCustomerLComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservCustomerLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
