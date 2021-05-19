import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Filter } from '../models/filtering.model';
import { Plugins } from '@capacitor/core';
import { ButtonType } from '../models/buttons.model';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: Todo[] = []; //danh sách của tất cả todo
  private filterdTodos: Todo[] =[]; // danh sách todo được filter và sẽ hiển thị trên view
  private TODO_STORAGE_KEY: string = "list_todo";
  private currentFilter:Filter = Filter.NotStart;

  private displayTodosSubject: BehaviorSubject<Todo[]> =new BehaviorSubject<Todo[]>([]);
  private todoItemClickedSubject: BehaviorSubject<Todo> =new BehaviorSubject<Todo>(new Todo(0,'',0));
  private isActionEditTodoItemSubject: BehaviorSubject<boolean> =new BehaviorSubject<boolean>(false);
  private typeButtonClickedSubject: BehaviorSubject<ButtonType> =new BehaviorSubject<ButtonType>(-1);

  todos$: Observable<Todo[]> = this.displayTodosSubject.asObservable(); //danh sách todo truyền cho các component khác để hiển lên view
  todoItemClicked$: Observable<Todo> = this.todoItemClickedSubject.asObservable(); // item todo được click trong danh sách todo ở màn hình
  isActionEditTodoItem$: Observable<boolean> = this.isActionEditTodoItemSubject.asObservable(); // trạng thái có phải sắp update hay delete todo item không
  typeButtonClicked$: Observable<ButtonType> = this.typeButtonClickedSubject.asObservable(); // cho biết button nào đã click

  constructor() { }

  async loadTodoListSaved() {
    // Retrieve cached todo array data
    const todoList = await Storage.get({ key: this.TODO_STORAGE_KEY });
    this.todos = JSON.parse(todoList.value) || [];

    this.filterTodos(this.currentFilter);
  }

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
      this.filterdTodos =  this.todos.filter(todo =>  todo.status == Filter.NotStart);
    }
    else if(this.currentFilter == Filter.Inprogress){
      this.filterdTodos = this.todos.filter(todo =>  todo.status == Filter.Inprogress);
    }
    else if(this.currentFilter == Filter.Completed){
      this.filterdTodos = this.todos.filter(todo =>  todo.status == Filter.Completed);
    }

    //đẩy dữ liệu đã filter cho todos$
    this.displayTodosSubject.next(this.filterdTodos);
  }

  //khi click 1 item todo trên màn hình
  getItemTodoClicked(itemTodo: Todo){
    this.todoItemClickedSubject.next(itemTodo);
    this.isActionEditTodoItemSubject.next(true);
  }

  //khi click 1 button
  buttonClicked(typeButton: ButtonType){
    this.typeButtonClickedSubject.next(typeButton);
  }

  addToDo(content: string, status: Filter)
  {
    const date= new Date(Date.now()).getTime();/// milliseconds.
    const newTodo = new Todo(date, content, status);
    this.todos.unshift(newTodo);//chèn lên đầu mảng.

    this.updateListTodoOnScreenAndStorage();
  }

  updateTodo(id: number, contentNew: string, statusNew: Filter){
    let index = this.todos.findIndex(item => item.id === id);
    let todoItem = this.todos[index];
    todoItem.content = contentNew;
    todoItem.status = statusNew;
    this.todos.splice(index,1,todoItem);//splice(start, deleteCount, item1, item2, itemN) - removing or replacing existing elements

    this.isActionEditTodoItemSubject.next(false);
    this.updateListTodoOnScreenAndStorage();
  }

  deleteTodo(id: number){
    let index = this.todos.findIndex(item => item.id === id);
    this.todos.splice(index,1);

    this.isActionEditTodoItemSubject.next(false);
    this.updateListTodoOnScreenAndStorage();
  }

  private updateListTodoOnScreenAndStorage(){
    this.filterTodos(this.currentFilter);

    Storage.set({
      key: this.TODO_STORAGE_KEY,
      value: JSON.stringify(this.todos)
    });
  }
}
