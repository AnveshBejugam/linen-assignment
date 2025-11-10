import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private mockEmployees: Employee[] = [
    {
      id: 1,
      userName: 'Rajesh Kumar',
      email: 'rajesh.kumar@example.com',
      joiningDate: new Date('2020-01-15'),
      mobile: '9876543210',
      gender: 'Male',
      languagesKnown: ['English', 'Hindi']
    },
    {
      id: 2,
      userName: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      joiningDate: new Date('2019-05-20'),
      mobile: '9845678901',
      gender: 'Female',
      languagesKnown: ['English', 'Hindi', 'Tamil']
    },
    {
      id: 3,
      userName: 'Amit Patel',
      email: 'amit.patel@example.com',
      joiningDate: new Date('2021-03-10'),
      mobile: '8765432109',
      gender: 'Male',
      languagesKnown: ['English', 'Gujarati']
    },
    {
      id: 4,
      userName: 'Sneha Reddy',
      email: 'sneha.reddy@example.com',
      joiningDate: new Date('2020-08-25'),
      mobile: '7654321098',
      gender: 'Female',
      languagesKnown: ['English', 'Telugu', 'Kannada']
    },
    {
      id: 5,
      userName: 'Vikram Singh',
      email: 'vikram.singh@example.com',
      joiningDate: new Date('2018-11-30'),
      mobile: '9123456780',
      gender: 'Male',
      languagesKnown: ['English', 'Hindi', 'Punjabi']
    },
    {
      id: 6,
      userName: 'Ananya Iyer',
      email: 'ananya.iyer@example.com',
      joiningDate: new Date('2022-02-14'),
      mobile: '9012345678',
      gender: 'Female',
      languagesKnown: ['English', 'Tamil', 'Malayalam']
    },
    {
      id: 7,
      userName: 'Arjun Mehta',
      email: 'arjun.mehta@example.com',
      joiningDate: new Date('2021-07-18'),
      mobile: '8901234567',
      gender: 'Male',
      languagesKnown: ['English', 'Hindi', 'Marathi']
    },
    {
      id: 8,
      userName: 'Kavya Nair',
      email: 'kavya.nair@example.com',
      joiningDate: new Date('2019-09-05'),
      mobile: '7890123456',
      gender: 'Female',
      languagesKnown: ['English', 'Malayalam', 'Tamil']
    }
  ];

  private employeesSubject = new BehaviorSubject<Employee[]>(this.mockEmployees);
  public employees$: Observable<Employee[]> = this.employeesSubject.asObservable();

  constructor() { }

  // Get all employees
  getAllEmployees(): Employee[] {
    return this.mockEmployees;
  }


  // Add new employee
  addEmployee(employee: Employee): void {
    const newId = Math.max(...this.mockEmployees.map(e => e.id), 0) + 1;
    const newEmployee = { ...employee, id: newId };
    this.mockEmployees.push(newEmployee);
    this.employeesSubject.next(this.mockEmployees);
  }

  // Update employee
  updateEmployee(employee: Employee): void {
    const index = this.mockEmployees.findIndex(e => e.id === employee.id);
    if (index !== -1) {
      this.mockEmployees[index] = employee;
      this.employeesSubject.next(this.mockEmployees);
    }
  }

  // Search/Filter employees
  filterEmployees(searchTerm: string): Employee[] {
    if (!searchTerm || searchTerm.trim() === '') {
      return this.mockEmployees;
    }

    const term = searchTerm.toLowerCase();
    return this.mockEmployees.filter(emp =>
      emp.userName.toLowerCase().includes(term) ||
      emp.email.toLowerCase().includes(term) ||
      emp.mobile.includes(term) ||
      emp.gender.toLowerCase().includes(term) ||
      emp.languagesKnown.some(lang => lang.toLowerCase().includes(term))
    );
  }
}
