import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerLoginRegistrationComponent } from './customer-login-registration.component';

describe('CustomerLoginRegistrationComponent', () => {
  let component: CustomerLoginRegistrationComponent;
  let fixture: ComponentFixture<CustomerLoginRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerLoginRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerLoginRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
