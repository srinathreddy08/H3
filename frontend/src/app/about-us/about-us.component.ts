import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})


export class AboutUsComponent {

}
