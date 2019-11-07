import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value: any): any {
    if(value.length <= 40){
      return value;
    }
    return value.substr(0, 40) + '...';
  }

}
