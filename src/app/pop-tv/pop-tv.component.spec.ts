/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PopTvComponent } from './pop-tv.component';

describe('PopTvComponent', () => {
  let component: PopTvComponent;
  let fixture: ComponentFixture<PopTvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopTvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
