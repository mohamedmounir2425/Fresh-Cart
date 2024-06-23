import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cuttext',
  standalone: true,
})
export class CuttextPipe implements PipeTransform {
  transform(text: string): unknown {
    return text.split(' ').slice(0, 2).join(' ');
  }
}
