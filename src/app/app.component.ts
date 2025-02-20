import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomRegex } from './shared/consts/validatorspattern';
import { nospacevalidator } from './shared/validators/nospacevalidator';
import { empidvalidator } from './shared/validators/empidvalidator';
import { COUNTRIES_META_DATA } from './shared/consts/countriesData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'RFTEST';
  signUpform!:FormGroup;
  genderArr:Array<string>=['female','male','other'];
  countryarr=COUNTRIES_META_DATA;
  ngOnInit(): void {
      this.createsignupform();
      this.isaddsamehandler();
      this.peraddpatch()
  }

peraddpatch(){
   this.f['isAddSame'].valueChanges
                      .subscribe((res:boolean)=>{
                        if(res){
                          let currentobj=this.f['currentaddress'].value
                          this.f['Permanentaddress'].patchValue(currentobj)
                          this.f['Permanentaddress'].disable()
                        }else{
                          this.f['Permanentaddress'].reset()
                          this.f['Permanentaddress'].enable()
                        }
                      })
}

isaddsamehandler(){
   this.f['currentaddress'].valueChanges
                           .subscribe(res=>{
                             this.f['currentaddress'].valid ? this.f['isAddSame'].enable() : this.f['isAddSame'].disable()
                           })
}

  createsignupform(){
    this.signUpform=new FormGroup({
      username: new FormControl(null,[Validators.required,Validators.pattern(CustomRegex.onlyText),Validators.minLength(5),Validators.maxLength(10),nospacevalidator.nospace]),
      email: new FormControl(null,[Validators.required,Validators.pattern(CustomRegex.email)]),
      empid: new FormControl(null,[Validators.required,empidvalidator.isempidvalid]),
      gender: new FormControl('female'),
      skills: new FormArray([new FormControl(null, Validators.required)]),
      currentaddress: new FormGroup({
            city: new FormControl(null,[Validators.required]),
            state: new FormControl(null,[Validators.required]),
            country: new FormControl(null,[Validators.required]),
            pincode: new FormControl(null,[Validators.required]),
      }),
      Permanentaddress: new FormGroup({
        city: new FormControl(null,[Validators.required]),
        state: new FormControl(null,[Validators.required]),
        country: new FormControl(null,[Validators.required]),
        pincode: new FormControl(null,[Validators.required]),
      }),
      isAddSame: new FormControl({value:null,disabled:true}),
      password: new FormControl(null,[Validators.required,Validators.pattern(CustomRegex.password)]),
      confirmpassword: new FormControl(null,[Validators.required,Validators.pattern(CustomRegex.password)])
    })
  }
  
  onsignup(){
     if(this.signUpform.valid && this.f['password'].value === this.f['confirmpassword'].value){
      console.log(this.signUpform.value);
     }
  }

  get f(){
     return this.signUpform.controls;
  }

  get skillsArr(){
     return this.f['skills'] as FormArray
  }

  onskilladd(){
     if(this.skillsArr.length < 5){
       let ctrl= new FormControl(null,[Validators.required])
       this.skillsArr.push(ctrl)
     }
  }

  onskillremove(i : number){
    this.skillsArr.removeAt(i)
  }
}

