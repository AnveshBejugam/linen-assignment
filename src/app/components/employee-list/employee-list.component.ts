import { Component, OnInit, OnDestroy } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { VALIDATION_CONSTANTS } from '../../constants/constants';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  public employees: Employee[] = [];
  public filteredEmployees: Employee[] = [];
  public showDialog = false;
  public selectedEmployee: Employee | null = null;
  public searchTerm: string = '';
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.loadEmployees();
    this.setupSearch();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setupSearch(): void {
    this.searchSubject.pipe(
      debounceTime(VALIDATION_CONSTANTS.SEARCH.DEBOUNCE_TIME), // Wait for configured debounce time
      distinctUntilChanged(), // Only emit if value is different from previous
      takeUntil(this.destroy$)
    ).subscribe(searchTerm => {
      this.filterEmployees(searchTerm);
    });
  }

  loadEmployees(): void {
    this.employees = this.employeeService.getAllEmployees();
    this.filteredEmployees = [...this.employees];
  }

  onSearchChange(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.searchSubject.next(searchTerm);
  }

  filterEmployees(searchTerm: string): void {
    if (!searchTerm.trim()) {
      this.filteredEmployees = [...this.employees];
      return;
    }

    const term = searchTerm.toLowerCase();
    this.filteredEmployees = this.employees.filter(employee => 
      employee.userName.toLowerCase().includes(term) ||
      employee.email.toLowerCase().includes(term) ||
      employee.mobile.includes(term) ||
      (employee.gender && employee.gender.toLowerCase().includes(term)) ||
      (employee.languagesKnown && employee.languagesKnown.some(lang => lang.toLowerCase().includes(term)))
    );
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
