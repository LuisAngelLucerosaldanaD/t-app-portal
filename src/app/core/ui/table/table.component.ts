import {Component, Input} from '@angular/core';
import {UserStatus} from "@app/core/models/table";
import {Work} from "@app/core/models/dashboard";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input() data: Work[] = [];

}
