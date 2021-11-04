import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetarSenhaPage } from './resetar-senha.page';

describe('ResetarSenhaPage', () => {
  let component: ResetarSenhaPage;
  let fixture: ComponentFixture<ResetarSenhaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetarSenhaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetarSenhaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
