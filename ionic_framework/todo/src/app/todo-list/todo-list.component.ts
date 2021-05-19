import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import {Todo} from '../models/todo.model';
import { Observable } from 'rxjs';
import { TodoService } from '../services/todo.service';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todosList: Observable<Todo[]>;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todosList= this.todoService.todos$;
  }

  itemTodoClick(todoItem: Todo){
    this.todoService.getItemTodoClicked(todoItem);
  }

}
