import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesqVisitaPage } from './pesq-visita.page';

describe('PesqVisitaPage', () => {
  let component: PesqVisitaPage;
  let fixture: ComponentFixture<PesqVisitaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesqVisitaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesqVisitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
