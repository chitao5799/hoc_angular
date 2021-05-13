import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent implements OnInit {
  @Input() myText: string='text in hello component';
  @Output() buttonClicked: EventEmitter<string>=new EventEmitter<string>();
  constructor(private dataService: DataService) { }
  myButtonClick(){
    this.myText='-something from hello component-';
    this.buttonClicked.emit(this.myText);
    this.dataService.setText(this.myText);
  }
  ngOnInit(): void {
    this.dataService.setText(this.myText);
  }


}
