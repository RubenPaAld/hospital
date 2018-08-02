import {Component, OnInit} from '@angular/core';
import {SettingsService} from '../../services/settings/settings.service';

declare var $:any;

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  oldLink: any;

  constructor(private settings: SettingsService) { }

  ngOnInit() {
    this.initCheck();
  }

  changeTheme(theme:string, link: any) {

    this.settings.saveTheme(theme,`assets/css/colors/${theme}.css`);

    $(link).addClass('working');
    $(this.oldLink).removeClass('working');
    this.oldLink = link;
  }

  initCheck() {
    let selectores = $('.selector');

    for (let s of selectores) {
      if ($(s).attr('data-theme') === this.settings.theme.name) {
        $(s).addClass('working');
        this.oldLink = $(s);
        break;
      }
    }
  }
}
