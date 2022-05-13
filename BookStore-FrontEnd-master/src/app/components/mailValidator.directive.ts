import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, AsyncValidatorFn, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { map, Observable, switchMap, timer } from 'rxjs';
import { RegistrationService } from '../service/registration.service';
export function emailvalidator(registration: RegistrationService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    let debounceTime = 2000; //milliseconds
    return timer(debounceTime).pipe(
      switchMap(() => registration.getUserbyEmail(control.value)),
      map((users) => {
        return (users) ?null :  { "MailValidator": true };
      })
    );
  };
}
@Directive({
  selector: '[MailValidator]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: MailValidatorDirective, multi: true }]
})
export class MailValidatorDirective implements AsyncValidator {

  constructor(private registration: RegistrationService) { }
  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return emailvalidator(this.registration)(control);

  }

}
