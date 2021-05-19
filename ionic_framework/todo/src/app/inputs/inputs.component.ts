import { Component, OnInit } from '@angular/core';
import { FilterStatus, Filter } from '../models/filtering.model';
import {TodoService} from '../services/todo.service';
import {ButtonType} from '../models/buttons.model';
import { ToastController, AlertController } from '@ionic/angular';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss'],
})
export class InputsComponent implements OnInit {
  inputContent:string;
  status: string=Filter.NotStart.toString();
  idItemTodoClickedOnScreen: number;

  filters: FilterStatus[]=[
    {type:Filter.NotStart, label: 'Not Start'},
    {type:Filter.Inprogress, label: 'Inprogress'},
    {type:Filter.Completed, label: 'Completed'}
  ];

  constructor(private todoService: TodoService,
      public toastController: ToastController,
      public alertController: AlertController)
  { }

  ngOnInit() {
    //khi 1 item todo trên màn hình được click
    this.todoService.todoItemClicked$.subscribe(todoItem => {
      this.handleItemTodoClickedOnScreen(todoItem);
    });
    //khi 1 button được click
    this.todoService.typeButtonClicked$.subscribe(typeButtonClicked => {
      this.handleButtonClicked(typeButtonClicked);
    });
  }

  private handleItemTodoClickedOnScreen(todoItem: Todo){
    if(todoItem.content == ''){
      return;
    }
    this.inputContent = todoItem.content;
    this.status = todoItem.status.toString() ;
    this.idItemTodoClickedOnScreen = todoItem.id;
  }

  private handleButtonClicked(typeButtonClicked: ButtonType){
    if(typeButtonClicked == -1)
    {
        return;
    }
    if((this.inputContent === '' || this.inputContent == null) && typeButtonClicked!==ButtonType.Cacel && typeButtonClicked!==ButtonType.Delete){
      this.presentToast();
      return;
    }

    switch(typeButtonClicked){
      case ButtonType.Add:{
        this.todoService.addToDo(this.inputContent,Number.parseInt(this.status));
        this.setItemInputDefault();
        };
        break;
      case ButtonType.Update:
        this.presentAlertConfirm(ButtonType.Update,'cập nhật');
        break;
      case ButtonType.Delete:
        this.presentAlertConfirm(ButtonType.Delete,'xóa');
        break;
      case ButtonType.Cacel: this.setItemInputDefault(); break;
    }

  }

  chooseDisplay(value: string){
    this.todoService.filterTodos(Number.parseInt(value));
  }

  private setItemInputDefault(){
    //set giá trị mặc định cho các item input
    this.inputContent = '';
    this.status = Filter.NotStart.toString();
  }

  private async presentAlertConfirm(typeButton: ButtonType, content: string) {
    const alert = await this.alertController.create({
      cssClass: 'my_alert',
      header: 'Xác nhận!',
      message: 'Bạn có chắc chắn muốn <strong>'+content+'</strong> item todo này không?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'btn_cancel_alert',
          handler: () => {
          }
        }, {
          text: 'Okay',
          cssClass: 'btn_cancel_ok',
          handler: () => {
            if(typeButton == ButtonType.Update){
              this.todoService.updateTodo(this.idItemTodoClickedOnScreen, this.inputContent, Number.parseInt(this.status));
            }
            else if(typeButton == ButtonType.Delete){
              this.todoService.deleteTodo(this.idItemTodoClickedOnScreen);
            }
            this.setItemInputDefault();
          }
        }
      ]
    });

    await alert.present();
  }

  private async presentToast() {
    const toast = await this.toastController.create({
      message: 'Bạn phải nhập vào phần Nội dung',
      duration: 1500,
      position: 'top',
      cssClass: 'toast',
      color: "light"
    });

    await toast.present();
  }

  ngOnChanges() {  }
}
