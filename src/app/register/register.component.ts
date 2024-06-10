import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, AbstractControl, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import "./register.component.css"
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    city: new FormControl(''),
  });

  selectedCity = 'New York';

  cities = ['New York', 'London', 'Paris', 'Tokyo', 'Mumbai', 'Kolkata'];

  submitted = false

  token: null | string = null


  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {

    this.token=localStorage.getItem("token")
    // console.log("ggg",this.token)

    if(this.token){
      const tokendata={jwt_token:this.token}
      this.http.post('http://localhost:5000/auth/user/verify-token', tokendata).subscribe(
        (response: any) => {
          // console.log("ddd",response)
          if(response.success==="yes"&&response.message==="token verified"){
                   this.router.navigate(['/weather'], {
                    state: {
                      name: response.userAuthData.name,
                      email: response.userAuthData.email,
                      city: response.userAuthData.city
          
                    }
                  })
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }

    this.registerForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        city: ['', Validators.required],
      })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }

  onSubmit() {

    this.submitted = true;

    if (this.registerForm.invalid) {
      alert("registration failed")
      return;
    }

    // console.log("city,",this.f['city'].value)
    const userData = {
      name: this.f['name'].value,
      email: this.f['email'].value,
      password: this.f['password'].value,
      city: this.f['city'].value
    }

    this.http.post('http://localhost:5000/auth/user/register', userData).subscribe(
      (response: any) => {
        alert("registration successfull !!!")
        this.router.navigate(['/login']);
      },
      (err) => {
        // console.error(err);
        alert(err.error.message)
      }
    );
  }
}
