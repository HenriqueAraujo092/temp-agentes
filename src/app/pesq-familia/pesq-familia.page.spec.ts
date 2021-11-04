import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesqFamiliaPage } from './pesq-familia.page';

describe('PesqFamiliaPage', () => {
  let component: PesqFamiliaPage;
  let fixture: ComponentFixture<PesqFamiliaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesqFamiliaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesqFamiliaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
