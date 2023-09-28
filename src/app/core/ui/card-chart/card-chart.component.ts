import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-card-chart',
  templateUrl: './card-chart.component.html',
  styleUrls: ['./card-chart.component.scss']
})
export class CardChartComponent {

  @Input() label: string = '';
  @Input() percentage: string = '';
  @Input() value: string = '';
  @Input() type: string = '';
  @Input() icon: string = '';

}
