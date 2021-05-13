import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Filter, FilterButton } from 'src/app/models/filtering.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  filterButtons: FilterButton[]=[
    {type:Filter.All, label:'All', isActive:true},
    {type:Filter.Active, label:'Active', isActive: false},
    {type:Filter.Complete, label:'Completed', isActive:false}
  ];

  length = 0;
  hasComplete$?: Observable<boolean>;//những Observable mà mình tự tạo mà mình subscribe thì nó sẽ chạy mãi chạy mãi, phải unsubscribe nếu ko sẽ có thể tràn bộ nhớ.
  destroy$: Subject<null> =new Subject<null>();

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.hasComplete$ = this.todoService.todos$.pipe(
      //hàm some, nếu 1 trong các callback trả về true thì some trả về true, tất cả false trả về false, mảng trổng trả về false
      map(todos => todos.some(t => t.isCompleted)),
      //khi destroy$ là complete thì ngắt ko lấy giá trị từ todoService.todos$ nữa và hasComplete$ sẽ tự unsubscribe
      takeUntil(this.destroy$)
    );

    this.todoService.length$.pipe(takeUntil(this.destroy$))
                    .subscribe(length => this.length = length);
  }

  filter(type: Filter){
    this.setActiveFilterForButton(type);
    this.todoService.filterTodos(type);
  }

  private setActiveFilterForButton(type: Filter){
    this.filterButtons.forEach(btn => {
      btn.isActive = btn.type === type;
    })
  }

  clearComplete(){
    this.todoService.clearCompleted();
  }

  ngOnDestroy(){
    //hàm chạy khi component này bị xóa khỏi Dom
    this.destroy$.next();
    this.destroy$.complete();
  }

}
