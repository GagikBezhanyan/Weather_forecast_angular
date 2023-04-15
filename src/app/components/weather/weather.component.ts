import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})

export class WeatherComponent implements OnInit {
  private apiKey: string = '010721642521f31b0fbc8c3831d45951';
  public city: string = '';
  public timeOut!: any;
  public form: any;
  public data: any;
  public daily_data: any = [];
  public hourly_data: any = [];
  public showDaily: boolean = true;
  public showHourly: boolean = true;

  constructor(private request: RequestService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: '',
      type: ''
    })
  }
  
  search() {
    this.showDaily = false;
    this.showHourly = false;

    clearInterval(this.timeOut);
    this.timeOut = setTimeout(() => {
      this.city = this.form.value.name;
      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${this.city}&limit=1&appid=${this.apiKey}`;
      this.request.getData(url).subscribe((res: any) => {
        this.data = res[0];
        console.log(this.data);
      })
    }, 1000) 
  }

  changeCountry() {
    if(this.form.value.type === 'daily') {
      this.showDaily = true;
      const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${this.data.lat}&lon=${this.data.lon}&appid=${this.apiKey}`;
      this.request.getData(url).subscribe((res: any) => {
        console.log(res);
        
        const week_name = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        res.daily.forEach((item: any, i: number) => {
          if (i < 7) {
            this.daily_data[i] = {
              date: week_name[new Date(item.dt * 1000).getDay()],
              temp: item.temp.day
            }
          }
        })
        console.log(this.daily_data);

      })
    } else {
      this.showHourly = true;
      const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${this.data.lat}&lon=${this.data.lon}&exclude=current,minutely,daily,alerts&appid=${this.apiKey}`;
      this.request.getData(url).subscribe((res: any) => {
        console.log(res);

        let j = 0;
        res.hourly.forEach((item: any, i: number) => {
          if (i % 3 == 0 && j < 8) {
            this.hourly_data[j] = {
              date: new Date(item.dt * 1000),
              temp: item.temp
            }
            j++;
          }
        })
        console.log(this.hourly_data);
      })
    }
  }

}
