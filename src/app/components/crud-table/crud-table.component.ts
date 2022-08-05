import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UnparsedUser } from 'src/app/data/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-crud-table',
  templateUrl: './crud-table.component.html',
  styleUrls: ['./crud-table.component.css']
})
export class CrudTableComponent implements OnInit {
  public users: User[] = [];
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.refreshData();
  }

  private refreshData(): void {
    this.userService.getAllUsers()
      .subscribe({
        error: err => {
          this.router.navigate(['/login']);
        },
        next: res => {
          this.unparsedToParsedUser(res);
        }
      })
  }

  public blockUsers(): void {
    const checkedUsers = this.getAllCheckedUsers('active');
    if (checkedUsers.length) this.userService.patchUsersStatus('blocked', checkedUsers)
      .subscribe({
        error: err => {
          this.logOut();
        },
        next: res => {
          const isCurrentUserBlocked = !!checkedUsers.find((user) => {
            return user.email === localStorage.getItem('email');
          });
          this.refreshData();
          if (isCurrentUserBlocked) this.userService.deleteTokensWithLocalStorage();
        }
      })
  }

  public unBlockUsers(): void {
    const checkedUsers = this.getAllCheckedUsers('blocked');
    if (checkedUsers.length) this.userService.patchUsersStatus('active', checkedUsers)
      .subscribe({
        error: err => {
          this.logOut();
        },
        next: res => {
          this.refreshData();
        }
      });
  }

  public deleteUsers() {
    const checkedUsers = this.getAllCheckedUsers();
    if (checkedUsers.length) this.userService.deleteUsers(checkedUsers)
      .subscribe({
        error: err => {
          this.logOut();
        },
        next: res => {
          const isCurrentUserDeleted = !!checkedUsers.find((user) => {
            return user.email === localStorage.getItem('email');
          });
          this.refreshData();
          if (isCurrentUserDeleted) this.userService.deleteTokensWithLocalStorage();
        }
      });
  }

  private getAllCheckedUsers(statusToMatch?: 'active' | 'blocked'): User[] {
    return this.users.filter((user) => {
      if (user.checked) {
        if (statusToMatch) {
          return user.status === statusToMatch;
        } return true;
      } return false;
    })
  }

  public checkAllCheckBox(event: any): void {
    this.users.forEach(user => {
      user.checked = event.target.checked;
    })
  }

  public areAllCheckBoxChecked() {
    return this.users.every(user => user.checked);
  }

  private unparsedToParsedUser(unparsedUsers: UnparsedUser[]): void {
    this.users = [];
    unparsedUsers.forEach(val => {
      this.users.push(
        {
          id: val.id,
          name: val.name,
          email: val.email,
          lastLogin: val.last_login,
          registrationTime: val.registration_time,
          status: val.status,
          checked: false
        }
      )
    })
  }

  public logOut() {
    this.userService.deleteTokensWithLocalStorage();
    this.router.navigate(['/login']);
  }
}
