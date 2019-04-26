import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'showTimestamp'
})
export class TimestampPipe implements PipeTransform {
    temp: Date;

    transform(value: Date): string {
      const temp = new Date (value);
      return temp.toDateString();
    }
}
