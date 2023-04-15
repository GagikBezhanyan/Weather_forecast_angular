import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hours'
})
export class HoursPipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): number{
    return value.getHours() < 10 ? Number(`0${value.getHours()}`): value.getHours();
  }

}
