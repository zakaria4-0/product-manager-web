import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReclamComponent } from './list-reclam.component';

describe('ListReclamComponent', () => {
  let component: ListReclamComponent;
  let fixture: ComponentFixture<ListReclamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListReclamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReclamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
