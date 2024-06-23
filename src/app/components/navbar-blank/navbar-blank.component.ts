import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar-blank',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar-blank.component.html',
  styleUrl: './navbar-blank.component.scss',
})
export class NavbarBlankComponent {
  constructor(private _AuthService: AuthService) {}
  signOut() {
    this._AuthService.signOut();
  }
}
