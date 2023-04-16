import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WeatherComponent } from './components/weather/weather.component';
import { TableComponent } from './components/table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TempPipe } from './pipes/temp.pipe';
import { HoursPipe } from './pipes/hours.pipe';
import { DaysPipe } from './pipes/days.pipe';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    TableComponent,
    TempPipe,
    HoursPipe,
    DaysPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
