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

  @Output() editTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

  constructor(private todoService: TodoService) { }


  ngOnInit() {
    this.todosList= this.todoService.todos$;
  }

  itemTodoClick(todoItem: Todo){
    this.editTodo.emit(todoItem);
    /**
     * khi click vào 1 item_todo trên list todo trên màn hình thì
     * gửi item_todo đó cho app component thông qua @Output() của todo-list component
     * app component gửi item_todo đó cho inputs component thông qua @Input()
     */
    this.todoService.getItemTodoClicked(todoItem);
  }

}
