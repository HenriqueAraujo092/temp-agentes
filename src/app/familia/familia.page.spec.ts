import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamiliaPage } from './familia.page';

describe('FamiliaPage', () => {
  let component: FamiliaPage;
  let fixture: ComponentFixture<FamiliaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamiliaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamiliaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
