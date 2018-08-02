import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  theme: Theme = {
    name: 'assets/css/colors/default.css',
    url: 'default'
  };

  constructor(@Inject(DOCUMENT) private document) {
    this.loadTheme();
  }

  loadTheme() {
    if (localStorage.getItem('theme'))
      this.theme = JSON.parse(localStorage.getItem('theme'));
    this.applyTheme()
  }

  saveTheme(name: string, url: string) {
    this.theme.name = name;
    this.theme.url = url;
    localStorage.setItem('theme',JSON.stringify(this.theme));
    this.applyTheme();
  }

  applyTheme() {
    this.document.getElementById('tema').setAttribute('href',this.theme.url);
  }
}

interface Theme {
  name: string;
  url: string;
}
