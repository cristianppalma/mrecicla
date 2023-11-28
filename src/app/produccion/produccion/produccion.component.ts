import { Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { Router } from '@angular/router';
@Component({
  selector: 'app-produccion',
  templateUrl: './produccion.component.html',
  styleUrls: ['./produccion.component.css']
})

export class ProduccionComponent implements OnInit {
  public chart: Chart;
  ngOnInit(): void {7

    const data = {
      labels:['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
      datasets:[{
        label: 'KG',
        data:[65,59,80,81,56,55,40,50,55,50,55,50],
        fill: false,
        borderColor: 'rgba(75,192,192,)',
        tension: 0.1
      }]
    };
    this.chart = new Chart("chart",{
      type: 'line' as ChartType,
      data
    })
  }

  constructor(private router:Router) {}

  VerGastosGenerales(){
    this.router.navigateByUrl('/dashboard/produccion/produccionList');
  }
}
