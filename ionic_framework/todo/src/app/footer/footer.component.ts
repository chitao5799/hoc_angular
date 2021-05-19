import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { ButtonModel, ButtonType } from '../models/buttons.model';
import {Todo} from '../models/todo.model';
import { Observable } from 'rxjs';
import {TodoService} from '../services/todo.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  buttons: ButtonModel[] = [
    {disableStatus: false, label: "Add", color: "success", type: ButtonType.Add},
    {disableStatus: true, label: "Update", color: "primary",type: ButtonType.Update},
    {disableStatus: true, label: "Delete", color: "danger", type: ButtonType.Delete},
    {disableStatus: false, label: "Cancel", color: "medium", type: ButtonType.Cacel}
  ]
  @Output() addTodo: EventEmitter<number> = new EventEmitter<number>();

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.isActionEditTodoItem$.subscribe(isEdit => {
      if(!isEdit){
        this.buttons[0].disableStatus = false; //ensable button add
        this.buttons[1].disableStatus = true;// disable button update
        this.buttons[2].disableStatus = true; // disable button delete
      }
      else{
        this.buttons[0].disableStatus = true; //disable button add
        this.buttons[1].disableStatus = false;// enable button update
        this.buttons[2].disableStatus = false; // enable button delete
      }

    });
  }

  btnclick(type: number){//this.buttons[1].disableStatus=false; temp
    /**
     * ý tưởng: khi click 1 button thì gửi loại button được click cho component cha (app-compnent)
     * component cha sẽ gửi loại button được click cho compnent inputs
     * component inputs gọi service thực hiện xử lý tương ứng.
     */
      this.addTodo.emit(type);
  }
}
