import { Component, OnInit } from '@angular/core';
import { RouteConfig, RouterLink, RouterOutlet, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { ViewTicketComponent } from '../view-user';
import { LoginComponent } from '../login';
import { UserService } from './users.service';


@Component({
  moduleId: module.id,
  selector: 'users-list',
  templateUrl: 'users.component.html',
  providers: [UserService],
  directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
  { path: '/login', component: LoginComponent, name: "Login" },
  { path: '/viewUser', component: ViewTicketComponent, name: "ViewTicket" }
])

export class UsersComponent implements OnInit {
  users: any;

  constructor(private router: Router, private _userService: UserService) {
    this.getAllUsers();
  }

  ngOnInit() {}

  /**
   * [getAllUsers get list of all user data]
   */
  getAllUsers() {
    this._userService.getUsers()
      .subscribe(
        (users) => this.users = users,
        error => this.users = < any > error,
        () => { console.log(this.users); }
      );
  }

  /**
   * [viewUser navigate to selected user to view details]
   * @param {[type]} user [selected user object]
   */
  viewUser(user) {
    this.router.navigate(['/viewUser', { ticket: user.id }]);
  }
}