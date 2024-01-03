import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Item } from '../../shared/interfaces/item.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  selectedItem: Item | null = null;
  constructor(public authService: AuthService){

  }

  logout(){
    this.authService.logout();
  }

  onItemSelected(event: Item | null){
    this.selectedItem = event;    
  }
}
