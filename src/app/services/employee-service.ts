import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../models/empolyee.model'; 

function calculateTotalHours(start: string, end: string): number {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return (endDate.getTime() - startDate.getTime()) / (1000 * 3600);
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeeDataSource = new BehaviorSubject<Employee[]>([]);
  employeeData = this.employeeDataSource.asObservable();

  constructor() { }

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

      const employees = Array.from(hoursMap.entries()).map(([name, totalHours]) => ({
        name: name,
        totalHours: Math.ceil(totalHours)
      })).sort((a, b) => b.totalHours - a.totalHours);

      this.employeeDataSource.next(employees);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }
}
