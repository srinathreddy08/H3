import { Component, OnInit } from '@angular/core';
import { HelplineService } from '../helplines.service';
import { CommonModule } from '@angular/common'; 
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-helplines',
  standalone: true,
  templateUrl: './helplines.component.html',
  styleUrls: ['./helplines.component.css'],
  imports: [CommonModule, NavbarComponent], 
})
export class HelplinesComponent implements OnInit {
  helplines: any[] = []; 

  constructor(private helplineService: HelplineService) {}

  ngOnInit() {
    this.helplineService.getHelplines().subscribe(
      data => {
        console.log('Helplines data:', data); 
        this.helplines = data; 
      },
      error => {
        console.error('Error fetching helplines:', error); 
      }
    );
  }
}
