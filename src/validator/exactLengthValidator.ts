import { AbstractControl, ValidatorFn } from '@angular/forms';

export function exactLengthValidator(length: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    const isNumeric = /^\d+$/.test(value); // Regular expression to check if string is only digits
    if (value && isNumeric && value.length !== length) {
      return { 'exactLength': { requiredLength: length, actualLength: value.length } };
    }
    if (value && !isNumeric) {
      return { 'numeric': true }; // Additional error if value is not numeric
    }
    return null; // Return null if there is no error
  };
}
