import { Component,ChangeDetectorRef, OnInit,Input, SimpleChanges,Output, EventEmitter } from '@angular/core';
import { FilterStatus, Filter } from '../models/filtering.model';
import {TodoService} from '../services/todo.service';
import {ButtonType} from '../models/buttons.model';
import { AngularDelegate } from '@ionic/angular';
@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss'],
})
export class InputsComponent implements OnInit {
  inputContent:string;
  status: string=Filter.NotStart.toString();
  isRunFirst:boolean=true;

  filters: FilterStatus[]=[
    {type:Filter.NotStart, label: 'Not Start'},
    {type:Filter.Inprogress, label: 'Inprogress'},
    {type:Filter.Completed, label: 'Completed'}
  ];

  @Input() actionHandle:number;
  @Output() changeAction: EventEmitter<number> = new EventEmitter<number>();

  constructor(private todoService: TodoService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {}

  chooseDisplay(value: string){
    this.todoService.filterTodos(Number.parseInt(value));
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.isRunFirst){
      this.isRunFirst=false;
      return;
    }
    if( this.inputContent === '' && changes.actionHandle.currentValue !== ButtonType.Cacel){
      this.changeAction.emit(-1);
      return;
    }
    if(changes.actionHandle.currentValue === ButtonType.Add){
      this.todoService.addToDo(this.inputContent,Number.parseInt(this.status) );
    }

    this.changeActionToDefault();
  }

  changeActionToDefault(){
    this.changeAction.emit(-1);
    /*mục đích để thay đổi actionHandle = -1
      vì hàm ngOnChanges chỉ chạy khi @Input() thay đổi giá trị.
      nếu ko thay đổi actionHandle thì khi ấn button add
      thì actionHandle=ButtonType.Add và ấn lần nữa thì actionHandle vẫn = ButtonType.Add và ko chạy hàm ngOnChanges
      */
    this.inputContent = '';
    this.status=Filter.NotStart.toString();
    this.cdr.detectChanges();
  }
}
