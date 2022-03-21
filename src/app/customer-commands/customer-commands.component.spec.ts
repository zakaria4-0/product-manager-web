import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCommandsComponent } from './customer-commands.component';

describe('CustomerCommandsComponent', () => {
  let component: CustomerCommandsComponent;
  let fixture: ComponentFixture<CustomerCommandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerCommandsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCommandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
