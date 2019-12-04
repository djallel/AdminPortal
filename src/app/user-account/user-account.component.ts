import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from '../user.service';



@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  userList: Object[];

  constructor(private userService: UserService, private router: Router) {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsersFormAPIwithCache().subscribe( //getUsersFormAPIwithCache ou getUsersFromAPI ou
      res => {
        this.userList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      },
      error => console.log(error)
    );
  }

  getUsers2() {
    this.userService.getUsers2().subscribe( //getUsersFormAPIwithCache ou getUsers getUsersFormAPIwithCache
      res => {
        this.userList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      },
      error => console.log(error)
    );
  }

  getUsersFromAPI() {
    this.userService.getUsersFromAPI().subscribe( //getUsersFormAPIwithCache ou getUsers
      res => {
        this.userList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      },
      error => console.log(error)
    );
  }


  getUsersFormAPIwithCache() {
    this.userService.getUsersFormAPIwithCache().subscribe( //getUsersFormAPIwithCache ou getUsers
      res => {
        this.userList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      },
      error => console.log(error)
    );
  }


  onSelectPrimary(username: string) {
    this.router.navigate(['/primaryTransaction', username]);
  }

  onSelectSavings(username: string) {
    this.router.navigate(['/savingsTransaction', username]);
  }

  enableUser(username: string) {
    this.userService.enableUser(username).subscribe();
    location.reload();
  }

  disableUser(username: string) {
    this.userService.disableUser(username).subscribe();
    location.reload();
  }


  ngOnInit() {
    this.userService.getUserById('2');
  }

}
