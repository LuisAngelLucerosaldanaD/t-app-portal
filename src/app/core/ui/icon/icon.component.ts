import {AfterContentChecked, Component, Input, OnInit} from '@angular/core';

import {checkmarkCircle} from "ionicons/icons";

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements AfterContentChecked, OnInit {

  @Input() size: string = '';
  @Input() icon: string = '';

  public idIcon: string = '';

  ngOnInit(): void {
    this.idIcon = crypto.randomUUID();
  }

  ngAfterContentChecked(): void {
    const iconTag = "<ion-icon size='%size' name='%icon'></ion-icon>";

    const iconItem = document.getElementById(this.idIcon);
    if (iconItem) iconItem.innerHTML = checkmarkCircle
  }

}
