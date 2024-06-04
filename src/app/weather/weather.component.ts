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
  imports: [FormsModule, MatIconModule, CommonModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})

export class WeatherComponent {
  tempChart: any = [];
  humidityChart: any = []
  rainChart: any = []
  API_KEY = "3245493517b371c063157e73b527198e"
  stateValue: any = {}
  userName: string = ""
  userEmail: string = ""
  selectedCity = '';
  cities = ['New York', 'London', 'Paris', 'Tokyo', 'Mumbai', 'Kolkata'];

  temperatureDetails: any[] = [
    {
      time: undefined,
      temp: undefined
    },
    {
      time: undefined,
      temp: undefined
    },
    {
      time: undefined,
      temp: undefined
    },
    {
      time: undefined,
      temp: undefined
    },
    {
      time: undefined,
      temp: undefined
    },
    {
      time: undefined,
      temp: undefined
    },
    {
      time: undefined,
      temp: undefined
    },
    {
      time: undefined,
      temp: undefined
    }
  ]

  humidityDetails: any[] = [
    {
      time: undefined,
      hmd: undefined
    },
    {
      time: undefined,
      hmd: undefined
    },
    {
      time: undefined,
      hmd: undefined
    },
    {
      time: undefined,
      hmd: undefined
    },
    {
      time: undefined,
      hmd: undefined
    },
    {
      time: undefined,
      hmd: undefined
    },
    {
      time: undefined,
      hmd: undefined
    },
    {
      time: undefined,
      hmd: undefined
    }
  ]

  rainDetails: any[] = [
    {
      time: undefined,
      rain: undefined
    },
    {
      time: undefined,
      rain: undefined
    },
    {
      time: undefined,
      rain: undefined
    },
    {
      time: undefined,
      rain: undefined
    },
    {
      time: undefined,
      rain: undefined
    },
    {
      time: undefined,
      rain: undefined
    },
    {
      time: undefined,
      rain: undefined
    },
    {
      time: undefined,
      rain: undefined
    }
  ]

  displayStyle = "none";
  token: null | string = null

  constructor(private location: Location, private router: Router, private http: HttpClient) {
    Chart.register(...registerables);
  }

  ngOnInit() {

    this.token = localStorage.getItem("token")

    if (this.token) {
      const tokendata = { jwt_token: this.token }
      this.http.post('http://localhost:5000/auth/user/verify-token', tokendata).subscribe(
        (response: any) => {
          // console.log("ddd",response)
          if (response.success === "no" && response.message !== "token verified") {
            this.router.navigate(['/login'])
          }
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.router.navigate(['/login'])
    }

    this.stateValue = this.location.getState()
    this.selectedCity = this.stateValue.city
    this.userEmail = this.stateValue.email
    this.userName = this.stateValue.name
    this.fetchWeather()
  }

  handleLogOut() {
    this.token = localStorage.getItem("token")
    if (this.token) {
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

  showTemperatureChart() {
    // console.log("ccc1",this.temperatureDetails)
    this.tempChart = new Chart('temp-canvas', {
      type: 'bar',
      data: {
        labels: [this.temperatureDetails[0].time, this.temperatureDetails[1].time, this.temperatureDetails[2].time, this.temperatureDetails[3].time

          , this.temperatureDetails[4].time, this.temperatureDetails[5].time, this.temperatureDetails[6].time, this.temperatureDetails[7].time
        ],
        datasets: [{
          label: this.selectedCity + "(temperature in fahrenheit)",
          data: [this.temperatureDetails[0].temp, this.temperatureDetails[1].temp, this.temperatureDetails[2].temp, this.temperatureDetails[3].temp,
          this.temperatureDetails[4].temp, this.temperatureDetails[5].temp, this.temperatureDetails[6].temp, this.temperatureDetails[7].temp
          ],
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)'
        }]
      }
    });
  }

  showHumidityChart() {

    this.humidityChart = new Chart('humidity-canvas', {
      type: 'pie',
      data: {
        labels: [
          this.humidityDetails[0].time,
          this.humidityDetails[1].time,
          this.humidityDetails[2].time,
          this.humidityDetails[3].time,
          this.humidityDetails[4].time,
          this.humidityDetails[5].time,
          this.humidityDetails[6].time,
          this.humidityDetails[7].time
        ],
        datasets: [
          {
            label: "humidity in percentage",
            data: [
              this.humidityDetails[0].hmd,
              this.humidityDetails[1].hmd,
              this.humidityDetails[2].hmd,
              this.humidityDetails[3].hmd,
              this.humidityDetails[4].hmd,
              this.humidityDetails[5].hmd,
              this.humidityDetails[6].hmd,
              this.humidityDetails[7].hmd
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

  }

  showRainChart() {
    console.log("tyy",this.rainDetails)
    this.rainChart = new Chart('rain-canvas', {
      type: 'line',
      data: {
        labels: [
          this.rainDetails[0].time,
          this.rainDetails[1].time,
          this.rainDetails[2].time,
          this.rainDetails[3].time,
          this.rainDetails[4].time,
          this.rainDetails[5].time,
          this.rainDetails[6].time,
          this.rainDetails[7].time
        ],
        datasets: [
          {
            label: 'Rains in percentage',
            data: [
              this.rainDetails[0].rain,
              this.rainDetails[1].rain,
              this.rainDetails[2].rain,
              this.rainDetails[3].rain,
              this.rainDetails[4].rain,
              this.rainDetails[5].rain,
              this.rainDetails[6].rain,
              this.rainDetails[7].rain
            ],
            backgroundColor: 'blue',
            borderColor: 'blue',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  fetchSelectedOptionWeather() {
    if (this.tempChart) {
      this.tempChart.destroy();
    }
    if (this.humidityChart) {
      this.humidityChart.destroy()
    }
    if (this.rainChart) {
      this.rainChart.destroy()
    }
    this.fetchWeather()


  }

  getExactTime(date: any) {
    // console.log("ppp",date)
    let hours: any = date.getHours();
    let minutes: any = date.getMinutes();

    // Check whether AM or PM
    let newformat = hours >= 12 ? 'PM' : 'AM';

    // Find current hour in AM-PM Format
    hours = hours % 12;

    // To display "0" as "12"
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    // console.log(hours + ':' + minutes + ' ' + newformat);
    return date.toString().split(" ")[0] + ' ' + date.toString().split(" ")[1] + ' ' + date.toString().split(" ")[2] + ' ' + date.toString().split(" ")[3] + ' ' + hours + ':' + minutes + ' ' + newformat;
  }

  async fetchWeather() {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${this.selectedCity}&appid=${this.API_KEY}&units=imperial`);


    // console.log("list", response.data)

    for (let i = 0; i < 8; i++) {
      var utcSeconds = parseInt(response.data.list[i].dt);
      var d = new Date(0);
      d.setUTCSeconds(utcSeconds);
      let tempTime = this.getExactTime(d)
      this.temperatureDetails[i].time = tempTime,
        this.temperatureDetails[i].temp = response.data.list[i].main.temp

      this.humidityDetails[i].time = tempTime,
        // console.log("hmd",tempTime+"==="+response.data.list[i].main.humidity )
        this.humidityDetails[i].hmd = response.data.list[i].main.humidity

      this.rainDetails[i].time = tempTime,
        this.rainDetails[i].rain = response.data.list[i].rain ? response.data.list[i].rain['3h'] : 0
    }

    this.showTemperatureChart()
    this.showHumidityChart()
    this.showRainChart()
  }

}


