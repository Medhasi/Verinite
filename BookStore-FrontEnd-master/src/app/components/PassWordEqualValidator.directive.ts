import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[PassWordEqualValidator]',
  providers:[{provide:NG_VALIDATORS,useExisting:PassWordEqualValidatorDirective,multi:true}]
})
export class PassWordEqualValidatorDirective implements Validator{
  @Input()
  PassWordEqualValidator!:string;
  validate(control: AbstractControl): {[key:string]:any} | null {
    const controlToCompare=control.parent?.get(this.PassWordEqualValidator);
    if(controlToCompare && controlToCompare.value !==control.value)
    {
      return {'notEqual':true};
    }
      return null;
  }

  constructor() { }

}
