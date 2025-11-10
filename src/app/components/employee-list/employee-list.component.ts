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
  public showDialog = false;
  public selectedEmployee: Employee | null = null;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employees = this.employeeService.getAllEmployees();
  }

  onAddEmployee(): void {
    this.selectedEmployee = null;
    this.showDialog = true;
  }

  onEditClick(dataItem: Employee): void {
    this.selectedEmployee = dataItem;
    this.showDialog = true;
  }

  onCloseDialog(): void {
    this.showDialog = false;
    this.selectedEmployee = null;
  }

  onEmployeeSaved(): void {
    this.loadEmployees();
  }

  // Format languages array to comma-separated string for display
  formatLanguages(languages?: string[]): string {
    return languages && languages.length > 0 ? languages.join(', ') : '-';
  }
}
