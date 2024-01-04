import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { List } from '../../shared/interfaces/list.interface';
import { ApiService } from '../../shared/services/api.service';
import { Item } from '../../shared/interfaces/item.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListDetails } from '../../shared/interfaces/listDetails.interface';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent implements OnInit {
  lists: List[] | null = [];
  selectedListId!: string;
  newListForm!: FormGroup;
  createNewList = false;
  currentList: ListDetails | null = null;

  @Output() selectedItemChange = new EventEmitter<Item | null>();


  constructor(private apiService: ApiService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.apiService.getUsersLists();
    this.apiService.lists$.subscribe(data => {
      this.lists = data;
    })
    this.apiService.currentListDetail$.subscribe(data => {
      this.currentList = data;
      if(data){
        this.selectedListId = data?.list._id;
      }
    })
    this.newListForm = this.fb.group({
      name: ['', [Validators.required]],
      color: ['']
    });
  }

  selectList(listId: string) {
    this.apiService.getList(listId);
    this.selectedListId = listId;
    this.selectedItemChange.emit(null);
  }

  createList() {
    if (this.createNewList) {
      if (this.newListForm.valid) {
        let listName = this.newListForm.get('name')?.value;
        let color = this.newListForm.get('color')?.value;
        console.log(listName);
        console.log(color);
        this.apiService.createList({name: listName, color:color});
        this.newListForm.reset();
        this.createNewList = false;
      }
    }
  }

  cancel(){
    this.newListForm.reset();
    this.createNewList = false;
  }


}
