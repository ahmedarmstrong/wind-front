import {Directive, Input, numberAttribute} from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import {exactLengthValidator} from "./exactLengthValidator";

@Directive({
  selector: '[appExactLength]',
  standalone: true,
  // Use this selector in the template
  providers: [{provide: NG_VALIDATORS, useExisting: ExactLengthValidatorDirective, multi: true}]
})
export class ExactLengthValidatorDirective implements Validator {
  @Input({transform: numberAttribute, alias: "appExactLength"}) length: number;

  validate(control: AbstractControl): {[key: string]: any} | null {
    return this.length ? exactLengthValidator(this.length)(control) : null;
  }
}
