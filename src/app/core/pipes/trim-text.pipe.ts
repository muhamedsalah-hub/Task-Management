import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimText',
  standalone: true,
})
export class TrimTextPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    const firstName = value.split(' ')[0] ;
    const lastName = value.split(' ')[1];
    return lastName.padStart(2, firstName[0]);
  }
}
