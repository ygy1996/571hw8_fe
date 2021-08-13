/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TopTvComponent } from './top-tv.component';

describe('TopTvComponent', () => {
  let component: TopTvComponent;
  let fixture: ComponentFixture<TopTvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopTvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
