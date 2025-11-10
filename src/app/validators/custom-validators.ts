import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  
  // Validate Indian name - supports Indian characters and naming patterns
  static userName(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      // Indian names can include:
      // - Latin alphabets (a-z, A-Z)
      // - Space, dot, hyphen, apostrophe for compound names
      // - Multiple parts (first name, middle name, last name)
      const namePattern = /^[a-zA-Z]+(([' .-][a-zA-Z])?[a-zA-Z]*)*$/;
      const valid = namePattern.test(control.value.trim());
      return valid ? null : { invalidName: true };
    };
  }

  // Validate that name doesn't contain numbers
  static noNumbers(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const hasNumber = /\d/.test(control.value);
      return hasNumber ? { hasNumbers: true } : null;
    };
  }

  // Validate max length
  static maxLength(max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const length = control.value.length;
      return length > max ? { maxLength: { max, actual: length } } : null;
    };
  }

  // Enhanced email validation
  static emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      // More strict email pattern
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const valid = emailPattern.test(control.value);
      return valid ? null : { invalidEmail: true };
    };
  }

  // Validate Indian phone number format
  static phoneNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      // Indian phone number formats:
      // - 10 digits starting with 6, 7, 8, or 9
      // - Optional +91 country code
      // - Supports formats: 9876543210, +919876543210, +91 98765 43210, +91-9876543210
      const phoneValue = control.value.replace(/[\s\-()]/g, ''); // Remove spaces, hyphens, parentheses
      
      // Pattern: Optional +91, followed by 10 digits starting with 6-9
      const indianPhonePattern = /^(\+?91)?[6-9]\d{9}$/;
      const valid = indianPhonePattern.test(phoneValue);
      
      if (!valid) {
        return { invalidPhone: true };
      }
      
      // Ensure final number will be exactly 10 digits
      const digitsOnly = phoneValue.replace(/\D/g, '');
      const finalLength = digitsOnly.startsWith('91') && digitsOnly.length === 12 ? 10 : digitsOnly.length;
      
      if (finalLength !== 10) {
        return { invalidPhone: true };
      }
      
      return null;
    };
  }

  // Validate minimum phone length (for Indian numbers)
  static phoneMinLength(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const digitsOnly = control.value.replace(/\D/g, '');
      // For Indian numbers, minimum is 10 digits (without country code)
      const actualLength = digitsOnly.startsWith('91') ? digitsOnly.length - 2 : digitsOnly.length;
      return actualLength < min ? { phoneMinLength: { min, actual: actualLength } } : null;
    };
  }

  // Validate maximum phone length (for Indian numbers)
  static phoneMaxLength(max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const digitsOnly = control.value.replace(/\D/g, '');
      // For Indian numbers, maximum is 10 digits (without country code)
      const actualLength = digitsOnly.startsWith('91') ? digitsOnly.length - 2 : digitsOnly.length;
      return actualLength > max ? { phoneMaxLength: { max, actual: actualLength } } : null;
    };
  }

  // Validate date is not in the future
  static notFutureDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const selectedDate = new Date(control.value);
      const today = new Date();
      today.setHours(23, 59, 59, 999); // End of today
      return selectedDate > today ? { futureDate: true } : null;
    };
  }

  // Validate date is within reasonable range (e.g., not more than 100 years ago)
  static reasonableDateRange(yearsAgo: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const selectedDate = new Date(control.value);
      const minDate = new Date();
      minDate.setFullYear(minDate.getFullYear() - yearsAgo);
      return selectedDate < minDate ? { dateOutOfRange: { yearsAgo } } : null;
    };
  }

  // Validate at least one item selected (for arrays)
  static minArrayLength(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || !Array.isArray(control.value)) {
        return null; // Allow empty/null for optional fields
      }
      const length = control.value.length;
      return length < min ? { minArrayLength: { min, actual: length } } : null;
    };
  }

  // Validate no leading/trailing spaces
  static noWhitespace(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const isWhitespace = control.value.trim().length === 0;
      const hasLeadingOrTrailing = control.value !== control.value.trim();
      return isWhitespace || hasLeadingOrTrailing ? { whitespace: true } : null;
    };
  }

  // Validate email domain (optional - for corporate emails)
  static emailDomain(allowedDomains: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const email = control.value.toLowerCase();
      const domain = email.split('@')[1];
      if (!domain) {
        return null;
      }
      const isAllowed = allowedDomains.some(d => domain.endsWith(d.toLowerCase()));
      return isAllowed ? null : { invalidDomain: { allowedDomains } };
    };
  }

  // Check for duplicate email (requires existing emails array)
  static uniqueEmail(existingEmails: string[], currentEmail?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const email = control.value.toLowerCase();
      const isDuplicate = existingEmails.some(e => 
        e.toLowerCase() === email && e.toLowerCase() !== (currentEmail?.toLowerCase() || '')
      );
      return isDuplicate ? { duplicateEmail: true } : null;
    };
  }
}
