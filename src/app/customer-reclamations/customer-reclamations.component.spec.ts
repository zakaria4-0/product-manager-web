import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerReclamationsComponent } from './customer-reclamations.component';

describe('CustomerReclamationsComponent', () => {
  let component: CustomerReclamationsComponent;
  let fixture: ComponentFixture<CustomerReclamationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerReclamationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerReclamationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
