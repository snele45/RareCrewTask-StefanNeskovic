import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee-service';
import { Employee } from '../../models/empolyee.model';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.employeeData.subscribe(data => {
      this.employees = data;
    });
    this.employeeService.fetchEmployees();
  }
}
