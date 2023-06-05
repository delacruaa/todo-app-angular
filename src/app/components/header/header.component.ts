import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isDark = true;

  ngOnInit() {
    this.changeTheme();
  }

  changeTheme() {
    this.isDark = !this.isDark;

    document.body.setAttribute('data-theme', this.isDark ? 'dark' : 'light');
  }
}
