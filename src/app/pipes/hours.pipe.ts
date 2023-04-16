import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hours'
})
export class HoursPipe implements PipeTransform {

  transform(value: number): string {
    let val = new Date(value * 1000);
    return val.getHours() < 10 ? `0${val.getHours()}:00`: `${val.getHours()}:00`;
  }

}
