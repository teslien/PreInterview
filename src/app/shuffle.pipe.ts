import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shuffle'
})
export class ShufflePipe implements PipeTransform {
  
  transform(array: any[], shuffle: boolean = true): any[] {
    if (!Array.isArray(array)) {
      return array;
    }

    if (shuffle) {
      // Perform the Fisher-Yates shuffle algorithm
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    return array;
  }
}
