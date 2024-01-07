import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ListDetails } from '../../shared/interfaces/listDetails.interface';
import { ApiService } from '../../shared/services/api.service';
import { Item } from '../../shared/interfaces/item.interface';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrl: './list-details.component.css'
})
export class ListDetailsComponent implements OnInit {

  currentListDetail: ListDetails | null | undefined = undefined;

  @Output() selectedItemChange = new EventEmitter<Item>();
  @Output() createNewItemChange = new EventEmitter<{ isNewItem: boolean, listId: string }>();


  constructor(private apiService: ApiService) {

  }

  ngOnInit(): void {
    this.apiService.currentListDetail$.subscribe((data) => {
      if (data !== undefined) {
        this.currentListDetail = data;
      }
    })
  }

  selectItem(item: Item) {
    this.selectedItemChange.emit(item);
  }

  createItem() {
    if (this.currentListDetail?.list._id) {
      this.createNewItemChange.emit({ isNewItem: true, listId: this.currentListDetail?.list._id });
    }
  }
  updateItem(item: Item) {
    this.apiService.updateItem(item._id, {...item})
  }

  deleteList(){
    if (this.currentListDetail?.list._id) {
      this.apiService.deleteList(this.currentListDetail?.list._id);
      this.selectedItemChange.emit(undefined);
      this.createNewItemChange.emit(undefined);
    }
  }
}
