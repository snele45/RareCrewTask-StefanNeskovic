import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { EmployeeService } from '../../services/employee-service';
import { Employee } from '../../models/empolyee.model';  

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
 
  
public chart :any;
  constructor(private employeeService: EmployeeService) { }

  ngOnInit() : void {
    this.employeeService.employeeData.subscribe(
      employees => {
        if(employees.length){
          this.createChart(employees);
        }
      }
    )
    
  }


  createChart(employees: Employee[]) {
  

  new Chart("MyChart", {
    type: 'pie', 

    data: {
      labels: employees.map(e => e.name),
	    datasets: [{
      label: 'Total hours worked in this month	',
      data: employees.map(e => e.totalHours),
      backgroundColor: employees.map(() => `rgb(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)})`)
  }],
      },
      options: {
        aspectRatio:2.5
      }

    });
  }
}
