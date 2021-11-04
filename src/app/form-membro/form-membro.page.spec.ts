import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMembroPage } from './form-membro.page';

describe('FormMembroPage', () => {
  let component: FormMembroPage;
  let fixture: ComponentFixture<FormMembroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormMembroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMembroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
