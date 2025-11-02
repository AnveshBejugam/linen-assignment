import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  public employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employees = this.employeeService.getAllEmployees();
  }

  onEditClick(dataItem: Employee): void {
    console.log('Edit employee:', dataItem);
  }

  // Format languages array to comma-separated string for display
  formatLanguages(languages: string[]): string {
    return languages.join(', ');
  }
}
