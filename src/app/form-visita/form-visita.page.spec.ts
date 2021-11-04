import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormVisitaPage } from './form-visita.page';

describe('FormVisitaPage', () => {
  let component: FormVisitaPage;
  let fixture: ComponentFixture<FormVisitaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormVisitaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormVisitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
