import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DailyData, Data, HourlyData } from 'src/app/models/models';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})

export class WeatherComponent implements OnInit {
  public selectedPreset: string = 'daily';
  public isShow: boolean = true;
  public dailyData: DailyData[] = [];
  public hourlyData: HourlyData[] = [];

  private apiKey: string = '010721642521f31b0fbc8c3831d45951';
  public iconURL: string = `http://openweathermap.org/img/w/`;
  public city: string = '';
  public timeOut: any;
  public form: FormGroup = new FormGroup({});
  public data!: Data;
  public name: string = '';
  public lat!: number;
  public lon!: number;
  
  constructor(private request: RequestService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: 'Yerevan',
      option: 'daily'
    })

    this.name = this.form.value.name;
    this.getData(this.form.value.name)
  }

  getData(city: string) {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${this.apiKey}`;
      this.request.getData(url).subscribe((res: any) => {
        this.data = res[0];
        this.name = this.data.name;
        this.lat = this.data.lat;
        this.lon = this.data.lon;
        console.log(this.data);

        this.getDailyData(this.lat, this.lon);
      })
  }

  getDailyData(lat: number, lon: number) {
    this.dailyData = [];
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;
      this.request.getData(url).subscribe((res: any) => {
        console.log(res);

        res.daily.forEach((item: any, i: number) => {
          if (i < 7) {
            this.dailyData.push({
              date: item.dt,
              temp: item.temp.day,
              weather: item.weather[0].main,
              icon: `${this.iconURL}/${item.weather[0].icon}.png`
            })
          }
        })
        console.log(this.dailyData);
      })
  }

  getHourlyData(lat: number, lon: number) {
    this.hourlyData = [];
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&appid=${this.apiKey}`;
      this.request.getData(url).subscribe((res: any) => {
        console.log(res);

        let j = 0;
        res.hourly.forEach((item: any, i: number) => {
          if (i % 3 == 0 && j < 8) {
            this.hourlyData.push({
              date: item.dt,
              temp: item.temp,
              weather: item.weather[0].main,
              icon: `${this.iconURL}/${item.weather[0].icon}.png`
            })
            j++;
          }
        })
        console.log(this.hourlyData);
      })
  }

  search() {
    clearInterval(this.timeOut);
    this.timeOut = setTimeout(() => {
      this.getData(this.form.value.name)
    }, 1000)
  }

  changeOption() {
    if (this.form.value.option === 'daily') {
      this.selectedPreset = 'daily';
      this.isShow = true;
      this.getDailyData(this.lat, this.lon);
    } else {
      this.selectedPreset = 'hourly';
      this.isShow = false;
      this.getHourlyData(this.lat, this.lon);
    }
  }

}
