import { Component } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent {
  borrarStorage(){
    // Para borrar todos los elementos del Local Storage
  localStorage.clear();
  }

}
