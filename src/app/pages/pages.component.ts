import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent {

  constructor(
    private router: Router
  ) {}

  logout(){
    // Para borrar todos los elementos del Local Storage
    localStorage.removeItem('token');
    // localStorage.clear();
    console.log('Se elimino el token');
    this.router.navigate(['/login'])
  }

}
