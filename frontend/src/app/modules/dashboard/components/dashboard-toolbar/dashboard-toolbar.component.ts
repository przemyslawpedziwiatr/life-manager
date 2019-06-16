import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-toolbar',
  templateUrl: './dashboard-toolbar.component.html',
  styleUrls: ['./dashboard-toolbar.component.scss']
})
export class DashboardToolbarComponent implements OnInit {
  @Output('toggleBar') toggleBar = new EventEmitter();
  isSidebarVisible = false;

  environment = environment;

  constructor(private authService: AuthService,
      private router: Router) {

  }

  ngOnInit() {
  }

  toggle() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.toggleBar.emit(this.isSidebarVisible);
  }

  logout() {
    this.authService.logout(() => {
      this.router.navigate(['/login']);
    });
  }

}
