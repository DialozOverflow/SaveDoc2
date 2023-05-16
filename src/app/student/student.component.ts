import { Component, OnDestroy, OnInit } from '@angular/core';
import { ItemsService } from '../services/items.service';
import { tap } from 'rxjs/operators';
import { item } from '../interfaces/data.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.sass']
})
export class StudentComponent implements OnInit, OnDestroy {
  constructor(private it: ItemsService) { }

  selectitem!:item;
  itemss: item[] = [];

  unsub: Subscription[] = [];

  ngOnInit(): void {
    this.refresh();
  }
  ngOnDestroy(): void {
    for (let x = 0; x < this.unsub.length; x++) {
      this.unsub[x].unsubscribe();
    }
  }
  refresh(): void {
    this.unsub.push(this.it.getItems().pipe(
      tap((res: item[]) => {
        this.itemss = res;
      })
    ).subscribe());
  }
  content(x: item): void {
    if (x.aprovado || x.id === this.itemss[0].id) {
      const txt = document.querySelector('.container .view-edit-item .edit .textarea') as HTMLDivElement;
      txt.textContent = x.info;
      this.selectitem = x;
    }else{
      alert('Aun no ha sido aprovado el anterior item');
    }
    this.refresh();
  }
  saveitem():void{
    const s = document.querySelector('.container .view-edit-item .edit .textarea') as HTMLDivElement;
    if (this.selectitem) {
      this.selectitem.info = s.innerHTML;
      this.unsub.push(
        this.it.editItem(this.selectitem)
        .pipe()
        .subscribe()
      );
      this.refresh();
    }
  }
}