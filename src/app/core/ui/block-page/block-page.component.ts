import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-block-page',
  templateUrl: './block-page.component.html',
  styleUrls: ['./block-page.component.scss']
})
export class BlockPageComponent {

  @Input() show: boolean = false;

}
