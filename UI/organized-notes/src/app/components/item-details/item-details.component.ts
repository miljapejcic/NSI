import { Component, Input, SimpleChanges } from '@angular/core';
import { Item } from '../../shared/interfaces/item.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css'
})
export class ItemDetailsComponent {
  @Input() item: Item | null = null;
  @Input() isNewItem!: { isNewItem: boolean, listId: string } | null;

  itemForm!: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) { }

  ngOnInit() {
    this.itemForm = this.fb.group({
      name: [this.item?.name, Validators.required],
      description: [this.item?.name],
      isDone: [this.item?.isDone]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item']) {
      this.isNewItem = null;

      this.itemForm = this.fb.group({
        name: [this.item?.name, Validators.required],
        description: [this.item?.description],
      });
      return;
    }
    if(changes['isNewItem']){
      this.itemForm = this.fb.group({
        name: ['', Validators.required],
        description: [''],
      });
    }
  }

  onCancel() {
    this.isNewItem = null;
    if(this.item){
      this.apiService.getList(this.item?.listId);
    }
    this.item = null;
    this.itemForm.reset();
  }

  onSave() {
    if (this.isNewItem) {      
      if (this.itemForm.get('name')?.value) {
        this.apiService.createItem(this.isNewItem.listId, { name: this.itemForm.get('name')!.value, description: this.itemForm.get('description')!.value })
      }
    }
    else {
      if (this.item && this.itemForm.get('name')?.value) {
        this.apiService.updateItem(this.item?._id, { name: this.itemForm.get('name')!.value, description: this.itemForm.get('description')!.value, isDone: this.item.isDone, listId: this.item.listId })
      }
    }
    this.item = null;
    this.isNewItem = null;
    this.itemForm.reset();
  }

  deleteItem(){
    if(this.item){
      this.apiService.deleteItem(this.item?._id, this.item.listId);
      this.item = null;
    }
  }
}
