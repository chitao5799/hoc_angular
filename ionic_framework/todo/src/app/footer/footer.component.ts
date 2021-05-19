import { Component, OnInit } from '@angular/core';
import { ButtonModel, ButtonType } from '../models/buttons.model';
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

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    // khi 1 item todo trên màn hình được click sẽ là trạng thái edit: update hoặc delete
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

  btnclick(type: number){
    /**
     * ý tưởng: khi click 1 button thì
     * gửi loại button được click cho component cha (app-compnent) thông qua @Output() [@Output() của footer component ]
     * component cha sẽ gửi loại button được click cho compnent inputs thông qua @Input() [@Input() của inputs compnent]
     * component inputs gọi service thực hiện xử lý tương ứng.
     * ==> đã làm ở commit trước đó.
     * ------------
     * ko dùng cách trên dùng service và Observable và BehaviorSubject để truyền data giữa các component
     */
    this.todoService.buttonClicked(type);

    //khi button cancel clicked
    if(type == ButtonType.Cacel)
    {
      this.buttons[0].disableStatus = false; //ensable button add
      this.buttons[1].disableStatus = true;// disable button update
      this.buttons[2].disableStatus = true; // disable button delete
    }

  }
}
