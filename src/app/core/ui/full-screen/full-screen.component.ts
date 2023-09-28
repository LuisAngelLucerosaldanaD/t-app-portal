import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styleUrls: ['./full-screen.component.scss']
})
export class FullScreenComponent {

  @Input() src: string = '';
  @Input() name: string = '';

  protected showScreen: boolean = false;

}
