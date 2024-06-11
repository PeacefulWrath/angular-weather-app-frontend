import { selectCurrentList } from './../states/list/list.selector';
import { AppState } from './../states/app.state';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import axios from "axios";
import { AsyncPipe, Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { selectCity, selectEmail, selectName } from '../states/user/user.selector';
import { updateuserdetails } from '../states/user/user.actions';
import { selectCurrentCity } from '../states/currentCity/currentCity.selector';
import { currentcity } from '../states/currentCity/currentCity.actions';
import { TempdetComponent } from '../tempdet/tempdet.component';
import { selectTempDet } from '../states/tempDet/tempDet.selector';
import { showtempdetyes } from '../states/tempDet/tempDet.actions';
import { showhmddetyes } from '../states/hmdDet/hmdDet.actions';
import { HmddetComponent } from '../hmddet/hmddet.component';
import { selectHmdDet } from '../states/hmdDet/hmdDet.selector';
import { selectRainDet } from '../states/rainDet/rainDet.selector';
import { RaindetComponent } from '../rainDet/raindet.component';
import { showraindetyes } from '../states/rainDet/rainDet.actions';
import { currentlist } from '../states/list/list.actions';


@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [FormsModule, MatIconModule, CommonModule, AsyncPipe, TempdetComponent, HmddetComponent, RaindetComponent],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})

export class WeatherComponent {

  tempChart: any = undefined;
  humidityChart: any = undefined
  rainChart: any = undefined

  API_KEY = "3245493517b371c063157e73b527198e"

  stateValue: any = {}

  userName: Observable<string>;
  userEmail: Observable<string>;
  userCity: Observable<string>;
  userSelectedCity: Observable<string>;

  tempDetObserve: Observable<string>;
  hmdDetObserve: Observable<string>;
  rainDetObserve: Observable<string>;

  showTempDet: any
  showHmdDet: any
  showRainDet: any

  selectedCity: any
  isFetchWeather: boolean = false

  cities = ['New York', 'London', 'Paris', 'Tokyo', 'Mumbai', 'Kolkata'];

  temperatureDetails: any = [
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

  constructor(private location: Location, private router: Router, private http: HttpClient, private store: Store<AppState>) {
    // console.log("rohit")
    this.userCity = of()
    this.userEmail = of()
    this.userName = of()
    this.userSelectedCity = of()
    this.tempDetObserve = of()
    this.hmdDetObserve = of()
    this.rainDetObserve = of()
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
          } else {

            Chart.register(...registerables);
            this.userName = this.store.select(selectName)
            this.userEmail = this.store.select(selectEmail)
            this.userCity = this.store.select(selectCity)
            this.userSelectedCity = this.store.select(selectCurrentCity)

            this.tempDetObserve = this.store.select(selectTempDet)
            this.hmdDetObserve = this.store.select(selectHmdDet)
            this.rainDetObserve = this.store.select(selectRainDet)

            this.tempDetObserve.subscribe((res) => {
              if (res) {
                // console.log("000",res)
                this.showTempDet = res
              }
            })

            this.hmdDetObserve.subscribe((res) => {
              if (res) {
                this.showHmdDet = res
              }
            })

            this.rainDetObserve.subscribe((res) => {
              if (res) {
                this.showRainDet = res
              }
            })

            this.userCity.subscribe((res: any) => {
              if (res) {
                this.selectedCity = res;
                // console.log("999",this.selectedCity)
              }
            })



            this.update(response.userAuthData.name, response.userAuthData.city, response.userAuthData.email)
          }
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.router.navigate(['/login'])
    }



  }

  update(paraName: any, paraCity: any, paraEmail: any) {
    this.store.dispatch(updateuserdetails({ name: paraName, city: paraCity, email: paraEmail }))
    this.store.dispatch(currentcity({ value: paraCity }))
    // this.store.dispatch(showtempdetyes())
    // this.selectedCity=paraCity
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
    if (this.tempChart) {

      this.tempChart.destroy();

      setTimeout(() => {
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
        })
      }, 2000)


    } else {

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


  }

  showHumidityChart() {

    if (this.humidityChart) {
      this.humidityChart.destroy()
      setTimeout(() => {
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
      }, 2000)

    } else {

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


  }

  showRainChart() {
    if (this.rainChart) {
      this.rainChart.destroy()
      setTimeout(() => {
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
      }, 2000)

    } else {
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

  }

  fetchSelectedOptionWeather() {
    this.store.dispatch(currentcity({ value: this.selectedCity }))
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
    // console.log("oo",this.selectedCity)
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${this.selectedCity}&appid=${this.API_KEY}&units=imperial`);

    // console.log("list", typeof this.temperatureDetails)

    let tempList: any = []

    response.data.list.forEach((el: any, ind: number) => {
      if (ind < 8) {
        tempList.push(el)
      }
    })
    if (response) {
      this.store.dispatch(currentlist({ value: tempList }))
      this.setCharts(tempList)
    }

  }

  setCharts(list: any) {
    for (let i = 0; i < 8; i++) {
      var utcSeconds = parseInt(list[i].dt);
      var d = new Date(0);
      d.setUTCSeconds(utcSeconds);
      let tempTime = this.getExactTime(d)
      this.temperatureDetails[i].time = tempTime,
        this.temperatureDetails[i].temp = list[i].main.temp

      this.humidityDetails[i].time = tempTime,
        // console.log("hmd",tempTime+"==="+response.data.list[i].main.humidity )
        this.humidityDetails[i].hmd = list[i].main.humidity

      this.rainDetails[i].time = tempTime,
        this.rainDetails[i].rain = list[i].rain ? list[i].rain['3h'] : 0
    }

    // console.log("5666",this.tempChart)
    this.showTemperatureChart()
    this.showHumidityChart()
    this.showRainChart()
  }

  goToTempDet(event: any) {
    this.isFetchWeather = event
    // this.fetchWeather()


    this.store.select(selectCurrentList).subscribe(async (res) => {
      if (res) {


        this.setCharts(res)

      }

    })
  }

  goToTempTempDet() {

    this.store.dispatch(showtempdetyes({
      value: [
        {
          time: this.temperatureDetails[0].time,
          temp: this.temperatureDetails[0].temp
        },
        {
          time: this.temperatureDetails[1].time,
          temp: this.temperatureDetails[1].temp
        },
        {
          time: this.temperatureDetails[2].time,
          temp: this.temperatureDetails[2].temp
        },
        {
          time: this.temperatureDetails[3].time,
          temp: this.temperatureDetails[3].temp
        },
        {
          time: this.temperatureDetails[4].time,
          temp: this.temperatureDetails[4].temp
        },
        {
          time: this.temperatureDetails[5].time,
          temp: this.temperatureDetails[5].temp
        },
        {
          time: this.temperatureDetails[6].time,
          temp: this.temperatureDetails[6].temp
        },
        {
          time: this.temperatureDetails[7].time,
          temp: this.temperatureDetails[7].temp
        },
      ]
    }))
    this.store.select(selectTempDet).subscribe((res) => {
      if (res) {
        this.showTempDet = res
      }
    })
  }

  goToHmdDet(event: any) {
    this.isFetchWeather = event

    this.store.select(selectCurrentList).subscribe((res) => {
      if (res) {
        this.setCharts(res)
      }
    })
  }

  goToTempHmdDet() {

    this.store.dispatch(showhmddetyes({
      value: [
        {
          time: this.humidityDetails[0].time,
          hmd: this.humidityDetails[0].hmd
        },
        {
          time: this.humidityDetails[1].time,
          hmd: this.humidityDetails[1].hmd
        },
        {
          time: this.humidityDetails[2].time,
          hmd: this.humidityDetails[2].hmd
        },
        {
          time: this.humidityDetails[3].time,
          hmd: this.humidityDetails[3].hmd
        },
        {
          time: this.humidityDetails[4].time,
          hmd: this.humidityDetails[4].hmd
        },
        {
          time: this.humidityDetails[5].time,
          hmd: this.humidityDetails[5].hmd
        },
        {
          time: this.humidityDetails[6].time,
          hmd: this.humidityDetails[6].hmd
        },
        {
          time: this.humidityDetails[7].time,
          hmd: this.humidityDetails[7].hmd
        }
      ]
    }))
    this.store.select(selectTempDet).subscribe((res) => {
      if (res) {
        this.showTempDet = res
      }
    })
  }

  goToRainDet(event: any) {
    this.isFetchWeather = event

    this.store.select(selectCurrentList).subscribe((res) => {
      if (res) {
        this.setCharts(res)
      }
    })
  }

  goToTempRainDet() {

    this.store.dispatch(showraindetyes({
      value: [
        {
          time: this.rainDetails[0].time,
          rain: this.rainDetails[0].rain
        },
        {
          time: this.rainDetails[1].time,
          rain: this.rainDetails[1].rain
        },
        {
          time: this.rainDetails[2].time,
          rain: this.rainDetails[2].rain
        },
        {
          time: this.rainDetails[3].time,
          rain: this.rainDetails[3].rain
        },
        {
          time: this.rainDetails[4].time,
          rain: this.rainDetails[4].rain
        },
        {
          time: this.rainDetails[5].time,
          rain: this.rainDetails[5].rain
        },
        {
          time: this.rainDetails[6].time,
          rain: this.rainDetails[6].rain
        },
        {
          time: this.rainDetails[7].time,
          rain: this.rainDetails[7].rain
        }
      ]
    }))
    this.store.select(selectTempDet).subscribe((res) => {
      if (res) {
        this.showTempDet = res
      }
    })
  }
}