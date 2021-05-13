import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Filter } from '../models/filtering.model';
import { Todo } from '../models/todo.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private static readonly TodoStoragekey = 'todos';

  private todos: Todo[] =[]; //list todo lấy từ localstorage
  private filterdTodos: Todo[] =[]; // list todo để hiển thị lên trình duyệt
  private lengthSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private displayTodosSubject: BehaviorSubject<Todo[]> =new BehaviorSubject<Todo[]>([]);
  private currentFilter:Filter = Filter.All;

  todos$: Observable<Todo[]> = this.displayTodosSubject.asObservable(); //expose
  length$: Observable<number> = this.lengthSubject.asObservable();

  constructor(private storageService:LocalStorageService) { }

  fetchFromLocalStorage(){
    this.todos = this.storageService.getValue<Todo[]>(TodoService.TodoStoragekey) || [];
    this.filterdTodos = [...this.todos];   //cloneShallow
    //this.filterdTodos = [...this.todos.map(todo => ({...todo}))]; //cloneDeep  // co the dung cloneDeep cua lodash
    this.updateTodosData();
  }



  updateToLocalStorage(){
    this.storageService.setObject(TodoService.TodoStoragekey, this.todos);
    this.filterTodos(this.currentFilter,false);
    this.updateTodosData();
  }

  filterTodos(filter: Filter, isFiltering: boolean = true){
    this.currentFilter = filter;

    switch(filter){
      case Filter.Active: this.filterdTodos =  this.todos.filter(todo => !todo.isCompleted); break;
      case Filter.Complete: this.filterdTodos = this.todos.filter(todo => todo.isCompleted); break;
      case Filter.All: this.filterdTodos = [...this.todos]; break;
    }

    if(isFiltering)
    {
      this.updateTodosData();
    }
  }

  addToDo(content: string)
  {
    const date= new Date(Date.now()).getTime();/// milliseconds.
    const newTodo = new Todo(date, content);
    this.todos.unshift(newTodo);//chèn lên đầu mảng.
    this.updateToLocalStorage();
  }

  changeTodoStatus(id: number, isCompletedNew: boolean)
  {
    const index= this.todos.findIndex(t => t.id === id);
    const todo = this.todos[index];
    todo.isCompleted = isCompletedNew;
    this.todos.splice(index,1,todo);  //splice(start, deleteCount, item1, item2, itemN) - removing or replacing existing elements
    this.updateToLocalStorage();
  }

  editToto(id: number, contentNew: string){
    const index= this.todos.findIndex(t => t.id === id);
    const todo = this.todos[index];
    todo.content = contentNew;
    this.todos.splice(index,1,todo);
    this.updateToLocalStorage();
  }

  deleteToto(id: number){
    const index= this.todos.findIndex(t => t.id === id);
    this.todos.splice(index,1);
    this.updateToLocalStorage();
  }

  toggleAll(){
    //nếu tất cả các todo đang là complete thì chuyển all thành uncomplete
    //nếu tất cả là uncomplete thì chuyển all thành complete
    // nếu có từ 1 todo là complete thì chuyển all thành complete
    this.todos = this.todos.map(todoItem =>{
      return {
        ...todoItem,
        isCompleted: !this.todos.every( t => t.isCompleted)
      };
    });
    /**
     * this.todos.every( t => t.isCompleted) - xét giá trị boolean trả về trong callback truyền vào every()
     * ---xét lần lượt các item của array trong callback mà tất cả callback đều trả về true thì every trả về true
     * nếu tất cả isCompleted là true trả về true
     * nếu tất cả là false trả về false
     * nếu trong tất cả todos có true và false thì trả về false
     *  */
    this.updateToLocalStorage();
  }

  clearCompleted()
  {
    this.todos = this.todos.filter(todo => !todo.isCompleted); //lấy các todo có isCompleted=false
    this.updateToLocalStorage();
  }

  //muốn 1 lệnh hoặc nhóm lệnh chuyển thành 1 method mới thì bôi đen nhóm lệnh nhấn 'ctrl .' chọn extract to method....
  private updateTodosData()
  {
    this.displayTodosSubject.next(this.filterdTodos);
    this.lengthSubject.next(this.todos.length);
  }
}
