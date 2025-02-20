import { AbstractControl, ValidationErrors } from "@angular/forms";



export class empidvalidator{
    static isempidvalid(controls:AbstractControl):ValidationErrors | null{
        let val= controls.value as string

        if(!val){
            return null
        }
       
        let regexp= /^[A-Z]\d{3}$/
        
        let isvalid= regexp.test(val);
        if(isvalid){
            return null
        }else{
             return {
                 invalidempId:"Emp Id must start with alphabets and end with 3 number"
             }
        }
       
     }
}