import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss']
})
export class TodoIputComponent implements OnInit {

  todoContent: string = '';

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }

  onSubmit()
  {
    if(this.todoContent.trim() === '')
    {
      return;
    }

    this.todoService.addToDo(this.todoContent);
    this.todoContent='';
  }

}
