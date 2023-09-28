import {Component, OnInit} from '@angular/core';
import {GetTokenMetadata} from "@app/core/utils/functions/token";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public role: string = 'admin';
  protected token: string = '';

  constructor(
    private _router: Router
  ) {
    this.token = sessionStorage.getItem('access_token') || '';
  }

  ngOnInit(): void {
    this.validatePermissions();
  }

  public getStyleUrl(route: string, isSub: boolean): string {
    if (!isSub) {
      if (location.pathname === route) return 't-body-b text-st-90';
      return 't-body text-st-60';
    }

    const basicUrl = location.pathname.split('/');
    if (basicUrl.includes(route)) return 't-body-b text-st-60';
    return 't-body text-st-60';
  }

  public handlerLogout(): void {
    sessionStorage.clear();
    this._router.navigateByUrl('/auth/login')
  }


  private validatePermissions() {
    const claims = GetTokenMetadata(this.token);
    if (claims && claims.rol && claims.rol !== 'admin') {
      this.role = 'user';
    }
  }

}
