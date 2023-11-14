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
      labels:['January', 'February', 'March', 'April', 'May', 'June','July'],
      datasets:[{
        label: 'My First Dataset',
        data:[65,59,80,81,56,55,40],
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
