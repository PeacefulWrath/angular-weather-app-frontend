import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import axios from "axios";
import { Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [FormsModule, MatIconModule,CommonModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})

export class WeatherComponent {
  chart: any = [];
  API_KEY = "3245493517b371c063157e73b527198e"
  stateValue: any = {}
  userName: string = ""
  userEmail: string = ""
  selectedCity = '';
  cities = ['New York', 'London', 'Paris', 'Tokyo', 'Mumbai', 'Kolkata'];
  weatherDetails = {
    temperature: undefined,
    humidity: undefined
  }
  displayStyle = "none"; 
  token:null|string=null

  constructor(private location: Location,private router: Router,private http: HttpClient) {
    Chart.register(...registerables);
  }

  ngOnInit() {

    this.token=localStorage.getItem("token")

    if(this.token){
      const tokendata={jwt_token:this.token}
      this.http.post('http://localhost:5000/verify-token', tokendata).subscribe(
        (response: any) => {
          // console.log("ddd",response)
          if(response.success==="no"&&response.message!=="token verified"){
                   this.router.navigate(['/login'])
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }else{
      this.router.navigate(['/login'])
    }

    this.stateValue = this.location.getState()
    this.selectedCity = this.stateValue.city
    this.userEmail = this.stateValue.email
    this.userName = this.stateValue.name
    this.fetchWeather()
  }

  handleLogOut(){
    this.token=localStorage.getItem("token")
    if(this.token){
    localStorage.removeItem("token")
    this.router.navigate(['/login'])
    }
  }

  showModal() {
    this.displayStyle = "block"; 
  }

  closeModal() { 
    this.displayStyle = "none"; 
  } 

  showChart() {
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: ['Temperature', 'Humidity'],
        datasets: [{
          label: this.selectedCity,
          data: [this.weatherDetails.temperature, this.weatherDetails.humidity],
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)'
        }]
      }
    });
  }

  fetchSelectedOptionWeather() {
    if (this.chart) {
      this.chart.destroy();
    }
    this.fetchWeather()


  }

  async fetchWeather() {
    // const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.selectedCity}&appid=${this.API_KEY}`);
    // this.weatherDetails.temperature = response.data.main.temp
    // this.weatherDetails.humidity = response.data.main.humidity
    this.showChart()
  }

}


