import { Component, OnDestroy, OnInit } from '@angular/core';
import { ItemsService } from '../services/items.service';
import { tap } from 'rxjs/operators';
import { item } from '../interfaces/data.interface';
import { Subscription, pipe } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.sass']
})
export class StudentComponent implements OnInit, OnDestroy {
  constructor(private it: ItemsService, private rt: Router) { }

  selectitem!: item;
  itemss: item[] = [];
  tituloante: boolean = false;
  desbreve: boolean = false;
  unsub: Subscription[] = [];
  tdantep: item[] = [];
  cache: item[] = [];
  modeloañadir:item = {
    id: 0,
    nombreItem: '',
    info: '',
    corregido: false,
    enviado: false,
    borrador: false,
    aprovado: false
  };

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
        this.itemss = res.filter((x) => [20, 21].includes(x.id) !== true);
        this.cache = res.filter((x) => [20, 21].includes(x.id) !== true);
        this.tituloante = res[0].aprovado;
        this.desbreve = res[1].aprovado;
        this.tdantep = res.filter((x) => [20, 21].includes(x.id));
        this.refreshstate();
      })
    ).subscribe());
  }
  content(x: item): void {
    this.unsub.push(
      this.it.getItems()
        .pipe(
          tap((res: item[]) => {
            for (let y = 0; y < res.length; y++) {
              if (x.id == res[y].id && [20, 21].includes(x.id) == false) {
                if (res[y].aprovado || res[y - 1].aprovado) {
                  const txt = document.querySelector('.container .view-edit-item .edit .textarea') as HTMLDivElement;
                  if (this.selectitem != undefined) {
                    if (this.selectitem.enviado) {
                      txt.textContent = res[y].info;
                      this.selectitem = res[y];
                    } else {
                      txt.textContent = this.cache[y-2].info;
                      this.selectitem = this.cache[y-2];
                    }
                  }else{
                    txt.textContent = res[y].info;
                    this.selectitem = res[y];
                  }
                  let opt = document.querySelector('.container .opt-state') as HTMLDivElement;
                  let penv = document.querySelector('.container .opt-state .env') as HTMLDivElement;
                  let env = document.querySelector('.container .opt-state .env p') as HTMLElement;
                  let papro = document.querySelector('.container .opt-state .apro') as HTMLDivElement;
                  let apro = document.querySelector('.container .opt-state .apro p') as HTMLElement;
                  opt.style.display = 'flex';
                  penv.style.display = 'flex';
                  papro.style.display = 'flex';
                  if (this.selectitem.aprovado) {
                    apro.textContent = 'aprobado';
                    papro.style.background = 'green';
                  } else {
                    apro.textContent = 'aprobar';
                    papro.style.background = 'red';
                  }
                  if (this.selectitem.enviado) {
                    env.textContent = 'enviado';
                    penv.style.background = 'green';
                  } else {
                    env.textContent = 'enviar';
                    penv.style.background = 'red';
                  }
                  let corr = document.querySelector('.container .opt-state .corr') as HTMLImageElement;
                  let borr = document.querySelector('.container .opt-state .borr') as HTMLImageElement;
                  corr.style.display = 'flex';
                  borr.style.display = 'flex';
                  if (this.selectitem.corregido) {
                    corr.style.background = 'green';
                  } else {
                    corr.style.background = 'red';
                  }
                  if (this.selectitem.borrador) {
                    borr.style.background = 'green';
                  } else {
                    corr.style.background = 'red';
                  }
                } else {
                  alert('Aun no ha sido aprovado el anterior item');
                }
              } else if (x.id == res[y].id && [20, 21].includes(x.id)) {
                let penv = document.querySelector('.container .opt-state .env') as HTMLDivElement;
                let papro = document.querySelector('.container .opt-state .apro') as HTMLDivElement;
                let corr = document.querySelector('.container .opt-state .corr') as HTMLImageElement;
                let borr = document.querySelector('.container .opt-state .borr') as HTMLImageElement;
                let opt = document.querySelector('.container .opt-state') as HTMLDivElement;
                opt.style.display = 'flex';
                corr.style.display = 'none';
                borr.style.display = 'none';
                penv.style.display = 'none';
                papro.style.display = 'none';
                const txt = document.querySelector('.container .view-edit-item .edit .textarea') as HTMLDivElement;
                txt.textContent = res[y].info;
                this.selectitem = res[y];
              }
            }
          })
        )
        .subscribe()
    );
    this.refresh();
  }
  saveitem(): void {
    const s = document.querySelector('.container .view-edit-item .edit .textarea') as HTMLDivElement;
    this.selectitem.corregido = false;
    this.selectitem.enviado = true;
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
  ir(): void {
    let q = document.querySelector('.td .quest') as HTMLDivElement;
    let iba = document.querySelector('.td .info-basic-ante') as HTMLDivElement;
    q.setAttribute('style', 'transform: scale(70%) translateX(200%); opacity:0;');
    iba.setAttribute('style', 'transform: scale(100%); transform: translateX(0%); opacity: 1;');
  }
  volver(): void {
    let q = document.querySelector('.td .quest') as HTMLDivElement;
    let iba = document.querySelector('.td .info-basic-ante') as HTMLDivElement;
    q.setAttribute('style', 'transform: scale(100%) translateX(0%); opacity:1;');
    iba.setAttribute('style', 'transform: scale(70%); transform: translateX(200%); opacity: 0;');
  }
  cante(): void {
    let inp = document.querySelector('.td .info-basic-ante .cont input') as HTMLInputElement;
    let txa = document.querySelector('.td .info-basic-ante .cont textarea') as HTMLTextAreaElement;
    if (inp.value && txa.value) {
      let nombre: item = {
        id: 20,
        nombreItem: "Nombre del Proyecto",
        info: inp.value,
        corregido: false,
        enviado: false,
        aprovado: true,
        borrador: true
      };
      let descrip: item = {
        id: 21,
        nombreItem: "Descripcion breve",
        info: txa.value,
        corregido: false,
        enviado: false,
        aprovado: true,
        borrador: true
      }
      let aaa = setTimeout(()=>{
        this.unsub.push(
          this.it.editItem(nombre).pipe().subscribe()
        );
      },1000);
      clearTimeout(aaa);
      this.unsub.push(
        this.it.editItem(descrip).pipe(
          tap((res: item) => { window.location.reload() })
        ).subscribe()
      );
    } else {
      alert('LLene todos los campos');
    }
  }
  escritura(): void {
    if (this.selectitem != undefined && this.selectitem.corregido == false) {
      this.selectitem.corregido = true;
      this.selectitem.enviado = false;
      this.unsub.push(
        this.it.editItem(this.selectitem)
          .pipe(tap((res: item) => {
            console.log(res);
          }))
          .subscribe()
      );
      this.refreshstate();
      for (let x = 0; x < this.cache.length; x++) {
        if (this.cache[x].id == this.selectitem.id) {
          let xxxx = document.querySelector('.container .view-edit-item .edit .textarea') as HTMLDivElement;
          this.cache[x].info += xxxx.textContent;
          break;
        }
      }
    }
  }
  refreshstate(): void {
    this.it.getItems()
      .pipe(
        tap((res: item[]) => {
          if (this.selectitem != undefined) {
            let corr = document.querySelector('.container .opt-state .corr') as HTMLDivElement;
            let borr = document.querySelector('.container .opt-state .borr') as HTMLDivElement;
            let penv = document.querySelector('.container .opt-state .env') as HTMLDivElement;
            let env = document.querySelector('.container .opt-state .env p') as HTMLElement;
            let papro = document.querySelector('.container .opt-state .apro') as HTMLDivElement;
            let apro = document.querySelector('.container .opt-state .apro p') as HTMLElement;
            if ([20,21].includes(this.selectitem.id) == false) {
              penv.style.display = 'flex';
              papro.style.display = 'flex';
              corr.style.display = 'flex';
              borr.style.display = 'flex';
            } else {
              penv.style.display = 'none';
              papro.style.display = 'none';
              corr.style.display = 'none';
              borr.style.display = 'none';
            }
            for (let x = 0; x < res.length; x++) {
              if (res[x].id == this.selectitem.id) {
                this.selectitem = res[x]
                if (res[x].corregido == true) {
                  corr.style.background = 'green';
                } else if (res[x].corregido != true) {
                  corr.style.background = 'red';
                }
                if (res[x].borrador == true) {
                  borr.style.background = 'green';
                } else if (res[x].borrador != true) {
                  borr.style.background = 'red';
                }
                if (res[x].enviado == true) {
                  penv.style.background = 'green';
                  env.textContent = 'enviado';
                } else if (res[x].enviado != true) {
                  penv.style.background = 'red';
                  env.textContent = 'enviar';
                }
                if (res[x].aprovado == true) {
                  papro.style.background = 'green';
                  apro.textContent = 'aprobado';
                } else if (res[x].aprovado != true) {
                  papro.style.background = 'red';
                  apro.textContent = 'aprobar';
                }
              }
            }
          }
        })
      ).subscribe();
  }
  aprobar():void{
    this.selectitem.aprovado = true;
    this.unsub.push(
      this.it.editItem(this.selectitem)
      .pipe(
        tap((res:item)=>res)
      )
      .subscribe()
    );
    this.refreshstate();
  }
  anadiritem():void{
    let nitm = document.querySelector('.container .add-item input') as HTMLInputElement;
    this.modeloañadir.nombreItem = nitm.value;
    this.unsub.push(
      this.it.getItems()
      .pipe(
        tap((res:item[])=>{
          let itemss = []
          for (let x = 0; x < res.length; x++) {
            itemss.push(res[x].id);
          }
          let cont = 0;
          while (itemss.includes(cont)) {
            cont+=1;
          }
          this.modeloañadir.id = cont
          for (let x = 0; x < res.length; x++) {
            if (res[x].id == this.selectitem.id) {
              this.unsub.push(
                this.it.insertItem(this.modeloañadir)
                .pipe()
                .subscribe()
              );
              break;
            }
          }
        })
      )
      .subscribe()
    );
    this.addclose();
  }
  addshow():void{
    let show = document.querySelector('.container .add-item') as HTMLDivElement;
    show.style.display = 'flex';
  }
  addclose():void{
    let show = document.querySelector('.container .add-item') as HTMLDivElement;
    show.style.display = 'none';
  }
}