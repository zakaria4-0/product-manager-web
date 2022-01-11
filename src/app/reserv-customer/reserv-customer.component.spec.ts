import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservCustomerComponent } from './reserv-customer.component';

describe('ReservCustomerComponent', () => {
  let component: ReservCustomerComponent;
  let fixture: ComponentFixture<ReservCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
