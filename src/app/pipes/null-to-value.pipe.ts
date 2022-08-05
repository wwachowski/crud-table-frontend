import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullToValue'
})
export class NullToValuePipe implements PipeTransform {

  transform(value: any, newValue: any): any {
    if (!value) return newValue;
    else return value;
  }

}
