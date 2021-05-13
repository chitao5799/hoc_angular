import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoIputComponent } from './todo-input.component';

describe('TodoIputComponent', () => {
  let component: TodoIputComponent;
  let fixture: ComponentFixture<TodoIputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoIputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoIputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
