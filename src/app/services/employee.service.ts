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
      userName: 'John Doe',
      email: 'john.doe@example.com',
      joiningDate: new Date('2020-01-15'),
      mobile: '+1234567890',
      gender: 'Male',
      languagesKnown: ['English', 'Spanish']
    },
    {
      id: 2,
      userName: 'Jane Smith',
      email: 'jane.smith@example.com',
      joiningDate: new Date('2019-05-20'),
      mobile: '+1987654321',
      gender: 'Female',
      languagesKnown: ['English', 'French', 'German']
    },
    {
      id: 3,
      userName: 'Michael Johnson',
      email: 'michael.j@example.com',
      joiningDate: new Date('2021-03-10'),
      mobile: '+1122334455',
      gender: 'Male',
      languagesKnown: ['English']
    },
    {
      id: 4,
      userName: 'Emily Davis',
      email: 'emily.davis@example.com',
      joiningDate: new Date('2020-08-25'),
      mobile: '+1555666777',
      gender: 'Female',
      languagesKnown: ['English', 'Italian', 'Portuguese']
    },
    {
      id: 5,
      userName: 'David Wilson',
      email: 'david.wilson@example.com',
      joiningDate: new Date('2018-11-30'),
      mobile: '+1999888777',
      gender: 'Male',
      languagesKnown: ['English', 'Mandarin']
    },
    {
      id: 6,
      userName: 'Sarah Brown',
      email: 'sarah.brown@example.com',
      joiningDate: new Date('2022-02-14'),
      mobile: '+1444333222',
      gender: 'Female',
      languagesKnown: ['English', 'Japanese', 'Korean']
    },
    {
      id: 7,
      userName: 'Chris Martinez',
      email: 'chris.m@example.com',
      joiningDate: new Date('2021-07-18'),
      mobile: '+1777888999',
      gender: 'Other',
      languagesKnown: ['English', 'Spanish', 'French']
    },
    {
      id: 8,
      userName: 'Lisa Anderson',
      email: 'lisa.anderson@example.com',
      joiningDate: new Date('2019-09-05'),
      mobile: '+1666555444',
      gender: 'Female',
      languagesKnown: ['English', 'Russian']
    }
  ];

  private employeesSubject = new BehaviorSubject<Employee[]>(this.mockEmployees);
  public employees$: Observable<Employee[]> = this.employeesSubject.asObservable();

  constructor() { }

  getAllEmployees(): Employee[] {
    return this.mockEmployees;
  }
}
