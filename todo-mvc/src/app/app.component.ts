import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoService } from './services/todo.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  hasTodos: Observable<boolean>;

  constructor(private todoService: TodoService) {
    this.hasTodos = this.todoService.length$.pipe(map(length => length > 0));//cho lệnh này vào đây chỉ để ko báo error thôi
   }

  ngOnInit(){
    this.todoService.fetchFromLocalStorage();
    //pipe để biến đổi dữ liệu, từ input sẽ ra output khác, length trong map chính là length$
    this.hasTodos = this.todoService.length$.pipe(map(length => length > 0));
  }

}
