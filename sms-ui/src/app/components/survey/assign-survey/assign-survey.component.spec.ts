import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignSurveyComponent } from './assign-survey.component';

describe('AssignSurveyComponent', () => {
  let component: AssignSurveyComponent;
  let fixture: ComponentFixture<AssignSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
