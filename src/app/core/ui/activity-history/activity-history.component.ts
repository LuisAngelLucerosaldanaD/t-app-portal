import {Component, Input, OnInit} from '@angular/core';
import {Traceability} from "@app/core/models/tracking";

@Component({
  selector: 'app-activity-history',
  templateUrl: './activity-history.component.html',
  styleUrls: ['./activity-history.component.scss']
})
export class ActivityHistoryComponent {

  @Input() tracking: Traceability[] = [];

  public readonly currentDate: Date = new Date();

}
