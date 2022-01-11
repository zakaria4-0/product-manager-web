import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminControlPageComponent } from './admin-control-page.component';

describe('AdminControlPageComponent', () => {
  let component: AdminControlPageComponent;
  let fixture: ComponentFixture<AdminControlPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminControlPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminControlPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
