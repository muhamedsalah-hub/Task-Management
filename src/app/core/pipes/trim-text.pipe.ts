import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimText',
  standalone: true,
})
export class TrimTextPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): any {
    if(!value) return ;
    const firstName = value.split(' ')[0] ;
    const lastName = value.split(' ')[1];
    return lastName[0].padStart(2, firstName[0]);
  }
}
