import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitaPage } from './visita.page';

describe('VisitaPage', () => {
  let component: VisitaPage;
  let fixture: ComponentFixture<VisitaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
