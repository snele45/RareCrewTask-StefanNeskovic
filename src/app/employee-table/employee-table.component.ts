import { Component, OnInit } from '@angular/core';
import axios from 'axios';

interface Employee {
  name: string;
  totalHours: number;
}

function calculateTotalHours(start: string, end: string): number {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return (endDate.getTime() - startDate.getTime()) / (1000 * 3600);
}

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent implements OnInit {
  employees: Employee[] = [];

  constructor() { }

  ngOnInit() {
    this.fetchEmployees();
  }

  async fetchEmployees() {
    try {
      const response = await axios.get<any[]>('https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==');
      const hoursMap = new Map<string, number>();

      response.data.forEach(emp => {
        if (emp.EmployeeName) {
          const totalHours = calculateTotalHours(emp.StarTimeUtc, emp.EndTimeUtc);
          hoursMap.set(emp.EmployeeName, (hoursMap.get(emp.EmployeeName) || 0) + totalHours);
        }
      });

     
      this.employees = Array.from(hoursMap.entries()).map(([name, totalHours]) => ({
        name: name,
        totalHours: Math.ceil(totalHours)
      })).sort((a, b) => b.totalHours - a.totalHours);
    } catch (error) {
      console.error('Error fetching data: ', error);
      
    }
  }
}
