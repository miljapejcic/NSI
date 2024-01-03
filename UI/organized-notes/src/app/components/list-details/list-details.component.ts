import { Component, OnInit } from '@angular/core';
import { ListDetails } from '../../shared/interfaces/listDetails.interface';
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrl: './list-details.component.css'
})
export class ListDetailsComponent implements OnInit {

  currentListDetail: ListDetails | null | undefined = undefined;

  constructor(private apiService: ApiService){

  }

  ngOnInit(): void {
    this.apiService.currentListDetail$.subscribe((data)=>{
      if(data !== undefined){
        this.currentListDetail = data;
      }
    })
  }
}
