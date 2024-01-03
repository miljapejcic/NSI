import { Component, OnInit } from '@angular/core';
import { List } from '../../shared/interfaces/list.interface';
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent implements OnInit {
  lists:List[] | null = [];
  selectedListId!: string;

  constructor(private apiService: ApiService){
  }
  
  ngOnInit(): void {
    this.apiService.getUsersLists();
    this.apiService.lists$.subscribe(data=>{
      this.lists = data;
    })
    }

  selectList(listId: string){
    this.apiService.getList(listId);
    this.selectedListId = listId;
  }
}
