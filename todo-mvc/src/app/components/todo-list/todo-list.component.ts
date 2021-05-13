import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoService } from 'src/app/services/todo.service';
import {Todo} from 'src/app/models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos$: Observable<Todo[]>;

  constructor(private todoService: TodoService) {
    this.todos$ = this.todoService.todos$; //để tạm đây cho không báo error
   }

  ngOnInit(): void {
    this.todos$ = this.todoService.todos$;
  }

  onChangeTodoStatus(todo: Todo){
    this.todoService.changeTodoStatus(todo.id, todo.isCompleted);
  }

  onEditTodo(todo: Todo){
    this.todoService.editToto(todo.id, todo.content);
  }

  onDeleteTodo(todo: Todo)
  {
    this.todoService.deleteToto(todo.id);
  }

}
