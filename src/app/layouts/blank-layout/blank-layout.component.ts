import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarBlankComponent } from '../../components/navbar-blank/navbar-blank.component';

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [RouterModule, NavbarBlankComponent],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.scss',
})
export class BlankLayoutComponent {}
