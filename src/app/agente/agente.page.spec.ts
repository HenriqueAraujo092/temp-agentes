import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentePage } from './agente.page';

describe('AgentePage', () => {
  let component: AgentePage;
  let fixture: ComponentFixture<AgentePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
