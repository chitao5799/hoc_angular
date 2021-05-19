import { Component } from '@angular/core';
import {TodoService} from './services/todo.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  date_title:string ;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    var d = new Date();
    var year=d.getFullYear();
    var month=(d.getMonth()+1)<9 ? '0'+(d.getMonth()+1) : (d.getMonth()+1);
    var date=d.getDate();
    this.date_title=year+'/'+month+'/'+date;

    //get list todo saved.
    this.todoService.loadTodoListSaved();
  }

}
