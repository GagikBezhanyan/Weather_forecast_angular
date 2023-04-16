import { Component, Input } from '@angular/core';
import { DailyData, HourlyData } from 'src/app/models/models';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  @Input() cityName: string = '';
  @Input() show: boolean = true;
  @Input() tableData: DailyData[] | HourlyData[] = [];
}
