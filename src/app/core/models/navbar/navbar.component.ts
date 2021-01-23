import { DbService } from 'src/app/core/services/db.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @ViewChild("menuBtn") menuBtn:ElementRef<HTMLElement>;

  isUser:boolean = false;
  username:string = "";

  constructor(private _AuthService:AuthService, private _DbService:DbService) { }

  ngOnInit(): void {
    this._AuthService.userID.subscribe(user => {
      if (user) {
        this.isUser = true;
        this._DbService.getUsername(user).subscribe(userInfo => {
          this.username = userInfo.payload.data()["username"];
        });
      } else {
        this.isUser = false;
      }
    });
  }

  closeMenu() {
    this.menuBtn.nativeElement.click();
  }

  logout() {
    this._AuthService.logOut().then(() => {
      this.username = '';
    });
  }

}
