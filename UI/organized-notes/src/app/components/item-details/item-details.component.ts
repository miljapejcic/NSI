import { Component, Input, SimpleChanges } from '@angular/core';
import { Item } from '../../shared/interfaces/item.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css'
})
export class ItemDetailsComponent {
  @Input() item: Item | null = null;


  @Input() isNewItem: boolean = false;
  // @Output() saveItem = new EventEmitter<{ id?: number, name: string, isDone: boolean }>();
  // @Output() cancel = new EventEmitter<void>();

  itemForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.itemForm = this.fb.group({
      name: [this.item?.name, Validators.required],
      description: [this.item?.name],
      isDone: [this.item?.isDone]
    });  }

    ngOnChanges(changes: SimpleChanges): void {
      // This method will be called whenever the input property changes
      if (changes['item']) {
        const currentValue = changes['item'].currentValue;
        const previousValue = changes['item'].previousValue;
        this.itemForm = this.fb.group({
          name: [this.item?.name, Validators.required],
          description: [this.item?.name],
          isDone: [this.item?.isDone]
        });
        console.log('InputValue changed. Current Value:', currentValue, 'Previous Value:', previousValue);
      }
    }

  onSubmit() {
    if (this.itemForm.valid) {
      const updatedItem = { ...this.item, ...this.itemForm.value };
      // this.saveItem.emit(updatedItem);
      this.itemForm.reset();
    }
  }

  onCancel() {
    // this.cancel.emit();
  }
}
