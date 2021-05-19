import { Component ,ChangeDetectorRef, OnInit,Input, SimpleChanges,Output, EventEmitter } from '@angular/core';
import { FilterStatus, Filter } from '../models/filtering.model';
import {TodoService} from '../services/todo.service';
import {ButtonType} from '../models/buttons.model';
import { AngularDelegate } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Todo } from '../models/todo.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss'],
})
export class InputsComponent implements OnInit {
  inputContent:string;
  status: string=Filter.NotStart.toString();
  itemTodoClicked: Observable<Todo>;

  filters: FilterStatus[]=[
    {type:Filter.NotStart, label: 'Not Start'},
    {type:Filter.Inprogress, label: 'Inprogress'},
    {type:Filter.Completed, label: 'Completed'}
  ];

  @Input() actionHandle?:number;
  @Input() itemTodoWillEdit?:Todo;
  @Output() changeAction: EventEmitter<number> = new EventEmitter<number>();

  constructor(private todoService: TodoService,
    private cdr: ChangeDetectorRef,
    public toastController: ToastController)
  { }

  ngOnInit() {
    this.todoService.todoItemClicked$.subscribe(todoItem=>{
      if(todoItem.content == ''){
        return;
      }
      this.inputContent = todoItem.content;
      this.status = todoItem.status.toString() ;
    });
  }


  chooseDisplay(value: string){
    this.todoService.filterTodos(Number.parseInt(value));
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Bạn phải nhập vào phần Nội dung',
      duration: 1500,
      position: 'top'
    });

    await toast.present();
  }

  ngOnChanges(changes: SimpleChanges) {
    // if( this.itemTodoWillEdit.content  !=='')
    // {
    //   this.inputContent = this.itemTodoWillEdit.content;
    //   this.status =this.itemTodoWillEdit.status.toString() ;
    // }
    // else
    // {
      if(this.actionHandle==-1){
      this.cdr.detectChanges();
      return;
      }
      if( this.inputContent === '' && changes.actionHandle.currentValue !== ButtonType.Cacel){
        this.changeAction.emit(-1);
        this.presentToast();
        this.cdr.detectChanges();
        return;
      }
      if(changes.actionHandle.currentValue === ButtonType.Add){
        this.todoService.addToDo(this.inputContent,Number.parseInt(this.status) );
      }
      this.changeActionToDefault();
    // }

  }

  changeActionToDefault(){
    this.inputContent = '';
    this.status=Filter.NotStart.toString();
    this.changeAction.emit(-1);
    /*mục đích để thay đổi actionHandle = -1
      vì hàm ngOnChanges chỉ chạy khi @Input() thay đổi giá trị.
      nếu ko thay đổi actionHandle thì khi ấn button add
      thì actionHandle=ButtonType.Add và ấn lần nữa thì actionHandle vẫn = ButtonType.Add và ko chạy hàm ngOnChanges
      */
     this.cdr.detectChanges();
  }

}
