import { ElementSchemaRegistry } from '@angular/compiler';
import { Component } from '@angular/core';

/**
 * các component phải ở trong 1 module nào đấy, xem file app.module.ts
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // c2: templateUrl: `<h1> hello {{title}}</h1>`,
  // hoặc chỉ hiện title -  [...] chứa tên thuộc tính của html để bind - SquareBrackets
  //templateUrl: `<h1 [textContent]="title"></h1>`
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my app'; //title là instance variable

  redColor='red';
  myBackgroundColor="gray";
  styleObject={color:this.redColor,backgroundColor:this.myBackgroundColor};
  textMouseOut(){
    this.redColor="red";
  }
  textMouseOver(){
    this.redColor="blue";
  }

  haveTextDecoration=true;

  myBorder=true;
  toggleBorder(event:MouseEvent) {
    this.myBorder=!this.myBorder;
  }

  btnClickedByChile(event:any){
    //event là giá trị truyền vào emit bên component con
    this.title=event;
  }
}
/**
 * data binding
 * + properties binding, bind để hiện thị giá trị của biến trong class lên ui,
 * khi giá trị của biến thay đổi thì ui tự thay đổi - từ component vào template
 * + event binding  khi user tương tác với template vd như click, hover,..... - từ template vào component
 */
