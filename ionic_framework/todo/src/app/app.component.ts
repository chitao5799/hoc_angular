import { Component } from '@angular/core';
import {ButtonType} from './models/buttons.model';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  date_title:string ;
  actionFormBtn:number;
  constructor() {}

  ngOnInit() {
    var d = new Date();
    var year=d.getFullYear();
    var month=(d.getMonth()+1)<9 ? '0'+(d.getMonth()+1) : (d.getMonth()+1);
    var date=d.getDate();
    this.date_title=year+'/'+month+'/'+date;
  }

  onBtnClick(action: number){
    this.actionFormBtn=action;
  }
}
