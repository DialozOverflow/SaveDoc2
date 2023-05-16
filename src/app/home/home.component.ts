import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  constructor (private rt: Router){}
  loginc():void{
    const correo = document.querySelector('.lemail') as HTMLInputElement;
    const contraseña = document.querySelector('.lpass') as HTMLInputElement;
    const select = document.querySelector('select') as HTMLSelectElement;
    if (correo.value !== '' && contraseña.value !== '' && select.value !== 'nada') {
      if (select.value === 'stu') {
        this.rt.navigate(['/student']);
      }else if (select.value === 'tea') {
        this.rt.navigate(['/teacher']);
      }
    }else{
      alert('llene todos los campos y seleccione el tipo de usuario');
    }
  }
}
