import { Component } from '@angular/core';
import { tap } from 'rxjs/operators';
import { item } from 'src/app/interfaces/data.interface';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {
  constructor(private it: ItemsService) { }
  showop(): void {
    let nav = document.querySelector('header nav') as HTMLElement;
    nav.classList.toggle('onshow');
  }
  setReset: any;
  setInsert: any;
  backup: item[] = [
    {
      id: 20,
      nombreItem: "Nombre del Proyecto",
      info: "",
      corregido: false,
      enviado: false,
      aprovado: false,
      borrador: true
    },
    {
      id: 21,
      nombreItem: "Descripcion breve",
      info: "",
      corregido: false,
      enviado: false,
      aprovado: false,
      borrador: true
    },
    {
      id: 1,
      nombreItem: "Titulo",
      info: "",
      corregido: true,
      enviado: false,
      borrador: true,
      aprovado: false
    },
    {
      id: 2,
      nombreItem: "Planteamiento del problema",
      info: "",
      corregido: false,
      enviado: false,
      borrador: true,
      aprovado: false
    },
    {
      id: 3,
      nombreItem: "Antecedentes",
      info: "",
      corregido: false,
      enviado: false,
      borrador: true,
      aprovado: false
    },
    {
      id: 4,
      nombreItem: "Definicion del problema",
      info: "",
      corregido: false,
      enviado: false,
      borrador: true,
      aprovado: false
    },
    {
      id: 5,
      nombreItem: "Justificacion",
      info: "",
      corregido: false,
      enviado: false,
      borrador: true,
      aprovado: false
    },
    {
      id: 6,
      nombreItem: "Definiciones",
      info: "",
      corregido: false,
      enviado: false,
      borrador: true,
      aprovado: false
    },
    {
      id: 7,
      nombreItem: "Objetivos",
      info: "",
      corregido: false,
      enviado: false,
      borrador: true,
      aprovado: false
    },
    {
      id: 8,
      nombreItem: "Hipotesis",
      info: "",
      corregido: false,
      enviado: false,
      borrador: true,
      aprovado: false
    },
    {
      id: 9,
      nombreItem: "Limitaciones",
      info: "",
      corregido: false,
      enviado: false,
      borrador: true,
      aprovado: false
    },
    {
      id: 10,
      nombreItem: "Delimitaciones",
      info: "",
      corregido: false,
      enviado: false,
      borrador: true,
      aprovado: false
    },
    {
      id: 11,
      nombreItem: "Marco de referencia",
      info: "",
      corregido: false,
      enviado: false,
      borrador: true,
      aprovado: false
    },
    {
      id: 12,
      nombreItem: "Metodo",
      info: "",
      corregido: false,
      enviado: false,
      borrador: true,
      aprovado: false
    },
    {
      id: 13,
      nombreItem: "Bibliografia",
      info: "",
      corregido: false,
      enviado: false,
      borrador: true,
      aprovado: false
    },
    {
      id: 14,
      nombreItem: "Cronograma",
      info: "",
      corregido: false,
      enviado: false,
      borrador: true,
      aprovado: false
    }
  ]
  cont: number = 0;
  closeclear(): void {
    clearInterval(this.setReset);
  }
  closeinsert(): void {
    clearInterval(this.setInsert);
    window.location.reload();
  }
  reset(): void {
    let ss = document.querySelector('.aviso') as HTMLDivElement;
    ss.setAttribute('style','display: flex;');
    this.setReset = setInterval(() => {
      this.it.getItems()
        .pipe(
          tap((res: item[]) => {
            if (res.length > 0) {
              this.it.deleteItem(res[0])
                .pipe(tap((res1: item) => {
                }))
                .subscribe();
            } else if (res.length == 0) {
              this.cont = 0;
              this.setInsert = setInterval(() => {
                if (this.cont < this.backup.length) {
                  this.it.insertItem(this.backup[this.cont])
                    .pipe()
                    .subscribe();
                } else if (this.cont == this.backup.length) {
                  this.closeinsert();
                }
                this.cont += 1;
              }, 400);
              this.closeclear();
            }
          })
        )
        .subscribe();
    }, 400);
  }
}
