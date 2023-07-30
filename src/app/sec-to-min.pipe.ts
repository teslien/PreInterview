import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secToMin'
})
export class SecToMinPipe implements PipeTransform {

  transform(value: any) {
    const minutes: number = value / 60
    var seconds = value % 60;
  
    return Math.round(minutes) + ' min' + (seconds ? ' ' + seconds + ' sec' : ' 00 sec' );
  }
  

}
