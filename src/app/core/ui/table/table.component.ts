import {Component, Input} from '@angular/core';
import {Work} from "@app/core/models/dashboard";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input() data: Work[] = [];

}
