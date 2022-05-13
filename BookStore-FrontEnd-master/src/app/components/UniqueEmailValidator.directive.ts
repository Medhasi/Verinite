import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors, NG_ASYNC_VALIDATORS, AsyncValidatorFn } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { RegistrationService } from '../service/registration.service';
import { map, switchMap } from 'rxjs/operators';

export function uniqueEmailvalidator(registration: RegistrationService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    let debounceTime = 2000; //milliseconds
    return timer(debounceTime).pipe(
      switchMap(() => registration.getUserbyEmail(control.value)),
      map((users) => {
        return (users) ? { "uniqueEmail": true } : null;
      })
    );
  };
}


@Directive({
  selector: '[uniqueEmail]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: UniqueEmailValidatorDirective, multi: true }]
})
export class UniqueEmailValidatorDirective implements AsyncValidator {

  constructor(private registration: RegistrationService) { }
  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return uniqueEmailvalidator(this.registration)(control);

  }
}
