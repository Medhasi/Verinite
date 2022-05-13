import { AbstractControl } from "@angular/forms";

export function mobileNumberValidator(control:AbstractControl){
  if(control && (control.value!==null||control.value!==undefined)){
    const regx=new RegExp("^[1-9][0-9]{9}$");
    if(!regx.test(control.value)){
      return{
        isError:true
      };
    }
  }
  return null;
}
