import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldGanttComponent } from './old-gantt.component';

describe('OldGanttComponent', () => {
  let component: OldGanttComponent;
  let fixture: ComponentFixture<OldGanttComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldGanttComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OldGanttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
