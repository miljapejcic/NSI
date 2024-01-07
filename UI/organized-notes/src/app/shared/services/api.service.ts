import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { List } from '../interfaces/list.interface';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Item } from '../interfaces/item.interface';
import { ListDetails } from '../interfaces/listDetails.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

readonly apiUrl = 'http://localhost:5000/api/';

currentListDetail = new BehaviorSubject<ListDetails | null>(null);
currentListDetail$ = this.currentListDetail.asObservable();

lists = new BehaviorSubject<List[] | null>(null);
lists$ = this.lists.asObservable();

constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

createList(sendData: {name: string, color?:string}){
  const userId = this.authService.currentUserSignal()?.id;
  this.http.post<List>(this.apiUrl+`list/createList/${userId}`, sendData).subscribe((data)=>{
    this.getUsersLists();
    this.getList(data._id);
  })
}

getUsersLists(){
  const userId = localStorage.getItem('id');
  this.http.get<List[]>(this.apiUrl+`list/getUsersLists/${userId}`).subscribe((data)=>{
    this.lists.next(data);
  })
}

getList(listId: string){
  this.http.get<ListDetails>(this.apiUrl+`list/getList/${listId}`).subscribe((data)=>{
    this.currentListDetail.next(data);
    this.router.navigate([`list/${data.list._id}`])
  })
}

deleteList(listId: string){
  this.http.delete(this.apiUrl+`list/deleteList/${listId}`).subscribe((data)=>{
    this.router.navigate(['/']);
    this.currentListDetail.next(null);
  })
}

createItem(listId: string, sendData: {name:string, description?:string}){
  this.http.post<Item>(this.apiUrl+`item/createItem/${listId}`, sendData).subscribe((data)=>{
    this.getList(listId);
  })
}

deleteItem(itemId: string, listId: string){
  this.http.delete(this.apiUrl+`item/deleteItem/${itemId}`).subscribe((data)=>{
    this.getList(listId);
  })
}

updateItem(itemId: string, sendData: {name: string, description?:string, isDone: boolean, listId: string}){
  this.http.put(this.apiUrl+`item/updateItem/${itemId}`, sendData).subscribe((data)=>{
    this.getList(sendData.listId);
  })
}

}
