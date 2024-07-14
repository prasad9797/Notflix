import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reduceString',
  standalone: true,
})
export class ReduceStringPipe implements PipeTransform {
  transform(value: string, reqLength: number): string {
    if (!value) return '';
    return value.length < reqLength
      ? value
      : value.substring(0, reqLength) + '...';
  }
}
