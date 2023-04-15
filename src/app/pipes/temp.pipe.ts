import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temp'
})
export class TempPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): number {
    return Math.floor(value - 272.15);
  }

}
