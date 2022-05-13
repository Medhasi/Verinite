import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors, NG_ASYNC_VALIDATORS, AsyncValidatorFn } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { RegistrationService } from '../service/registration.service';
import { debounceTime, distinctUntilChanged, first, map, switchMap } from 'rxjs/operators';
export function uniqueUsernamevalidator(registration: RegistrationService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    let debounceTime = 1000; //milliseconds
    return timer(debounceTime).pipe(
      switchMap(() => registration.getUserbyUsername(control.value)),
      map((users) => {
        return (users) ? { "UniqueUsername": true } : null;
      })
    );
  };

  //return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
  //   return registration.getUserbyUsername(control.value).pipe(debounceTime(2500),distinctUntilChanged(),
  //     map(users => {
  //       console.log(users);
  //      // console.log(users.length);
  //       return users ? { 'UniqueUsername': true } : null;
  //     })
  //   );
  // };
}

@Directive({
  selector: '[UniqueUsername]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: UniqueUsernameValidatorDirective, multi: true }]
})
export class UniqueUsernameValidatorDirective  implements AsyncValidator {

  constructor(private registration: RegistrationService) { }
  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return uniqueUsernamevalidator(this.registration)(control);

  }

}
