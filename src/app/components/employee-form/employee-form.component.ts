import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { CustomValidators } from '../../validators/custom-validators';
import { GENDER_OPTIONS, LANGUAGE_OPTIONS, VALIDATION_CONSTANTS } from '../../constants/constants';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  @Input() employee: Employee | null = null;
  @Output() closeDialog = new EventEmitter<void>();
  @Output() employeeSaved = new EventEmitter<void>();

  employeeForm: FormGroup;
  isEditMode = false;

  genderOptions = GENDER_OPTIONS;
  languageOptions = LANGUAGE_OPTIONS;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {
    // Form will be created in ngOnInit after @Input is set
    this.employeeForm = this.fb.group({});
  }

  ngOnInit(): void {
    // Create form after @Input employee is set
    this.employeeForm = this.createForm();
    
    if (this.employee) {
      this.isEditMode = true;
      this.populateForm(this.employee);
    }
  }

  createForm(): FormGroup {
    const existingEmails = this.employeeService.getAllEmployees().map(e => e.email);
    const currentEmail = this.employee?.email;

    return this.fb.group({
      userName: ['', [
        Validators.required,
        Validators.minLength(VALIDATION_CONSTANTS.USER_NAME.MIN_LENGTH),
        Validators.maxLength(VALIDATION_CONSTANTS.USER_NAME.MAX_LENGTH),
        CustomValidators.userName(),
        CustomValidators.noNumbers(),
        CustomValidators.noWhitespace()
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
        CustomValidators.emailValidator(),
        CustomValidators.noWhitespace(),
        CustomValidators.uniqueEmail(existingEmails, currentEmail)
      ]],
      joiningDate: ['', [
        CustomValidators.notFutureDate(),
        CustomValidators.reasonableDateRange(50)
      ]],
      mobile: ['', [
        Validators.required,
        CustomValidators.phoneNumber(),
        CustomValidators.phoneMinLength(VALIDATION_CONSTANTS.MOBILE.MIN_LENGTH),
        CustomValidators.phoneMaxLength(VALIDATION_CONSTANTS.MOBILE.MAX_LENGTH)
      ]],
      gender: [''],
      languagesKnown: [[]]
    });
  }

  populateForm(employee: Employee): void {
    this.employeeForm.patchValue({
      userName: employee.userName,
      email: employee.email,
      joiningDate: employee.joiningDate ? new Date(employee.joiningDate) : '',
      mobile: employee.mobile,
      gender: employee.gender || '',
      languagesKnown: employee.languagesKnown || []
    });
    // Mark form as pristine after populating to track changes from this point
    this.employeeForm.markAsPristine();
    this.employeeForm.markAsUntouched();
    
    console.log('Form populated:', {
      isEditMode: this.isEditMode,
      formValid: this.employeeForm.valid,
      formDirty: this.employeeForm.dirty,
      formValue: this.employeeForm.value,
      formErrors: this.getFormErrors()
    });
  }

  // Helper to get all form errors for debugging
  private getFormErrors(): any {
    const errors: any = {};
    Object.keys(this.employeeForm.controls).forEach(key => {
      const control = this.employeeForm.get(key);
      if (control && control.errors) {
        errors[key] = control.errors;
      }
    });
    return errors;
  }

  onSubmit(): void {
    // Mark all fields as touched to show validation errors
    this.markFormGroupTouched(this.employeeForm);

    if (this.employeeForm.valid) {
      // In edit mode, only proceed if form has been modified
      if (this.isEditMode && !this.employeeForm.dirty) {
        // No changes made, just close the dialog
        this.onClose();
        return;
      }

      const formValue = this.employeeForm.value;
      
      // Normalize mobile number - strip +91 and store only 10 digits
      const normalizedMobile = this.normalizeMobileNumber(formValue.mobile);
      
      if (this.isEditMode && this.employee) {
        const updatedEmployee: Employee = {
          ...this.employee,
          ...formValue,
          mobile: normalizedMobile
        };
        this.employeeService.updateEmployee(updatedEmployee);
      } else {
        const newEmployee: Employee = {
          id: 0, // Will be assigned by service
          ...formValue,
          mobile: normalizedMobile
        };
        this.employeeService.addEmployee(newEmployee);
      }
      
      this.employeeSaved.emit();
      this.onClose();
    }
  }

  // Normalize mobile number to 10-digit format (remove +91, spaces, hyphens)
  private normalizeMobileNumber(mobile: string): string {
    if (!mobile) {
      return mobile;
    }
    
    // Remove all non-digit characters
    let digitsOnly = mobile.replace(/\D/g, '');
    
    // If starts with 91 and has 12 digits total, remove the 91 prefix
    if (digitsOnly.startsWith('91') && digitsOnly.length === 12) {
      digitsOnly = digitsOnly.substring(2);
    }
    
    // Return 10-digit number
    return digitsOnly;
  }

  // Mark all form fields as touched to trigger validation display
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  onClose(): void {
    this.closeDialog.emit();
  }

  get f() {
    return this.employeeForm.controls;
  }

  // Helper to check if update button should be enabled
  get canUpdate(): boolean {
    // In Add mode: enable when form is valid
    // In Edit mode: enable when form is valid AND dirty (has changes)
    if (!this.isEditMode) {
      return this.employeeForm.valid;
    }
    return this.employeeForm.valid && this.employeeForm.dirty;
  }
}
