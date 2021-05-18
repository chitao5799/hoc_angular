import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Filter } from '../models/filtering.model';
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: Todo[] = []; //danh sách của tất cả todo
  private filterdTodos: Todo[] =[]; // danh sách todo được filter và sẽ hiển thị trên view

  private displayTodosSubject: BehaviorSubject<Todo[]> =new BehaviorSubject<Todo[]>([]);
  private currentFilter:Filter = Filter.NotStart;

  todos$: Observable<Todo[]> = this.displayTodosSubject.asObservable(); //danh sách todo truyền cho các component khác để hiển lên view

  constructor() { }

  filterTodos(filter: Filter){
    this.currentFilter = filter;
    // console.log('-------------------------current filter:'+this.currentFilter);
    // switch(this.currentFilter){
    //   case Filter.NotStart: {
    //       this.filterdTodos =  this.todos.filter(todo =>  todo.status === Filter.NotStart);
    //       console.log('-------------------------not start:');
    //     };
    //     break;
    //   case Filter.Inprogress: {
    //       this.filterdTodos = this.todos.filter(todo =>  todo.status === Filter.Inprogress);
    //       console.log('-------------------------improgress');
    //     };
    //     break;
    //   case Filter.Completed: {
    //       this.filterdTodos = this.todos.filter(todo =>  todo.status === Filter.Completed);
    //     };
    //     break;
    //   default:{
    //     console.log('================defaulte');
    //   }
    // }
    if(this.currentFilter == Filter.NotStart) {
      this.filterdTodos =  this.todos.filter(todo =>  todo.status === Filter.NotStart);
    }
    else if(this.currentFilter == Filter.Inprogress){
      this.filterdTodos = this.todos.filter(todo =>  todo.status === Filter.Inprogress);
    }
    else if(this.currentFilter == Filter.Completed){
      this.filterdTodos = this.todos.filter(todo =>  todo.status === Filter.Completed);
    }

    //đẩy dữ liệu filter cho todos$
    this.displayTodosSubject.next(this.filterdTodos);

  }

  addToDo(content: string, status: Filter)
  {
    const date= new Date(Date.now()).getTime();/// milliseconds.
    const newTodo = new Todo(date, content, status);
    this.todos.unshift(newTodo);//chèn lên đầu mảng.
    this.filterTodos(this.currentFilter);
  }

}
