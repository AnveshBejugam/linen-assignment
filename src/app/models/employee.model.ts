export interface Employee {
  id: number;
  userName: string;
  email: string;
  joiningDate?: Date;
  mobile: string;
  gender?: 'Male' | 'Female' | 'Other';
  languagesKnown?: string[];
}
