import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicateFinderComponent } from './duplicate-finder.component';

describe('DuplicateFinderComponent', () => {
  let component: DuplicateFinderComponent;
  let fixture: ComponentFixture<DuplicateFinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuplicateFinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicateFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
