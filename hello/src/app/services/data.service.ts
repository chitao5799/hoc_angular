import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _text:string='';
  //subject vừa là observer vừa là observable, lấy giá trị cuối dùng
  private _textFromHelloSubject:BehaviorSubject<string>=new BehaviorSubject<string>('');
  //có dấu $ chỉ là cách đặt tên naming convention thôi, chỉ biến là 1 stream hay observable
  textFromHello$: Observable<string>=this._textFromHelloSubject.asObservable();//Observable và BehaviorSubject cùng kiểu string
  constructor() { }
  get text():string{
    return this._text;
  }
  setText(textParam:string){
    //this._text=textParam;
    /**
     * khi _textFromHelloSubject next - đẩy giá trị mới, thì textFromHello$ sẽ nhận được giá trị đó nếu nó subscribe
     */
    this._textFromHelloSubject.next(textParam);
  }

}
