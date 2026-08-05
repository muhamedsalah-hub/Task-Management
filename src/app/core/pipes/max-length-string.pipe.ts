import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxLengthString',
  standalone: true,
})
export class MaxLengthStringPipe implements PipeTransform {
  transform(title: string, ...args: unknown[]): string {
    if (title.length >= 100) {
      return `${title.slice(0, 101)}............`;
    } else {
      return title;
    }
  }
}
