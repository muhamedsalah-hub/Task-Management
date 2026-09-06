import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimText',
  standalone: true,
})
export class TrimTextPipe implements PipeTransform {
  transform(value: string | undefined, ...args: unknown[]): any {
    if (!value) return;
    const firstName = value.split(' ')[0];
    const lastName = value.split(' ')[1];
    return `${firstName.length > 0 ? firstName[0] : ''}${lastName?.length > 0 ? lastName[0] : ''}`.toUpperCase();
  }
}
