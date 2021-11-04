import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFamiliaPage } from './form-familia.page';

describe('FormFamiliaPage', () => {
  let component: FormFamiliaPage;
  let fixture: ComponentFixture<FormFamiliaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFamiliaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFamiliaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
