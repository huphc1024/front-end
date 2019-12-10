import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/home', title: 'Home', icon: 'home', class: '' },
  { path: '/project', title: 'Project', icon: 'group', class: '' },
  { path: '/issue', title: 'Issue', icon: 'content_paste', class: '' },
  //{ path: '/icons', title: 'Icons', icon: 'bubble_chart', class: '' },
  //{ path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
  //{ path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
  //{ path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  isAdmin = false;
  constructor() { }

  ngOnInit() {
    let countRole = 0
    let user: any;
    if (sessionStorage.length > 0) {
      user = JSON.parse(sessionStorage.getItem('userInfo'));
    }
    if (localStorage.length > 0) {
      user = JSON.parse(localStorage.getItem('userInfo'));
    }
    user.data.roles.forEach(element => {
      if (element.role == 'ADMIN')
        countRole++;
    });
    if (countRole > 0) {
      this.isAdmin = true;
    }
    if(this.isAdmin){
      ROUTES.push({ path: '/user', title: 'Thông tin người dùng', icon: 'person', class: '' });
    }
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
