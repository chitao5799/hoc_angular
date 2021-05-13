import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { trigger, state, style, transition, animate } from '@angular/animations';

// animation trong BrowserAnimationsModule khai báo trong app.module.ts
const fadeStrikeThroughAnimation = trigger('my_fadeStrikeThrough',[
    state('my_active',style({
      fontSize: '18px',
      color:'black'
    })),
    state('my_completed', style({
      fontSize: '16px',
      color:'lightgrey',
      textDecoration: 'line-through'
    })),
    transition('my_active <=> my_completed', [animate(250)]),
  ]);
@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  animations: [ fadeStrikeThroughAnimation ]
})
export class TodoItemComponent implements OnInit {
  @Input() todoItem: Todo=new Todo(1,'');
  @Output() changeStatus: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() editTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  isHovered = false;
  isEditing =  false;
  constructor() { }

  ngOnInit(): void {
  }

 //khi click vào checkbox thì nó thay đổi trạng thái (checked - uncheck) thì chạy hàm này
  changeTodoStatus()
  {
    this.changeStatus.emit({...this.todoItem, isCompleted: !this.todoItem.isCompleted});
  }

  submitEditForm(event: KeyboardEvent){
    const {keyCode} =event;
    event.preventDefault(); //ngăn chặn form sẽ submit by default
    if(keyCode ===13) //13 là phím enter
    {
      this.editTodo.emit(this.todoItem);
      this.isEditing = false;
    }
  }

  removeTodo(){
    this.deleteTodo.emit(this.todoItem);
  }
}
