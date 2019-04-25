import { PipeTransform, Pipe } from '@angular/core';
import { formatDate } from '@angular/common/src/i18n/format_date';

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
