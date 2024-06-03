import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, AbstractControl, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  selectedCity = 'New York';

  cities = ['New York', 'London', 'Paris', 'Tokyo', 'Mumbai', 'Kolkata'];

  submitted = false

  token:null|string=null


  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {

    this.token=localStorage.getItem("token")

    if(this.token){
      const tokendata={jwt_token:this.token}
      this.http.post('http://localhost:5000/verify-token', tokendata).subscribe(
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

    this.loginForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        // password:['',[Validators.required, Validators.minLength(6)]],
        city: ['', Validators.required],
      })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  onSubmit() {

    this.submitted = true;

    if (this.loginForm.invalid) {
      alert("login failed")
      return;
    }

    console.log("city,",this.f['city'].value)
    const userData = {
      name: this.f['name'].value,
      email: this.f['email'].value,
      city: this.f['city'].value
    }

    this.http.post('http://localhost:5000/login', userData).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);
        alert("login successfull !!!")
        this.router.navigate(['/weather'], {
          state: {
            name: this.f['name'].value,
            email: this.f['email'].value,
            city: this.f['city'].value

          }
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
