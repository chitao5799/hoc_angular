import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-hi',
  templateUrl: './hi.component.html',
  styleUrls: ['./hi.component.css']
})
export class HiComponent implements OnInit {
   hi_text:string='';
  constructor(private dataService:DataService) { }

  ngOnInit(): void {
   // this.hi_text=this.dataService.text;
   /**
    * hàm subcribe chạy khi textFromHello$ (_textFromHelloSubject)thay đổi giá trị
    */
    this.dataService.textFromHello$.subscribe( text=>
      this.hi_text=text
    );
  }

}
