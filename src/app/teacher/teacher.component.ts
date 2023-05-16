import { Component, OnDestroy, OnInit } from '@angular/core';
import { ItemsService } from '../services/items.service';
import { Subscription} from 'rxjs';
import { tap } from 'rxjs/operators';
import { item } from '../interfaces/data.interface';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.sass']
})
export class TeacherComponent implements OnInit, OnDestroy{
  constructor (private it:ItemsService){}

  itemss!:item[];

  unsub:Subscription[] = [];

  ngOnDestroy(): void {
    for (let x = 0; x < this.unsub.length; x++) {
      this.unsub[x].unsubscribe();
    }
  }
  ngOnInit(): void {
    this.refresh();
  }
  refresh():void{
    this.unsub.push(
      this.it.getItems()
      .pipe(
        tap((res:item[])=>{
          this.itemss = res;
        })
      )
      .subscribe()
    );
  }
}
