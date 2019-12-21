import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  items:Item[] = [
    {id:0,name:'Pants',status:false},
    {id:1,name:'Jacket',status:true},
    {id:2,name:'MacBook',status:false},
    {id:3,name:'Hat',status:false},
    {id:4,name:'Belt',status:true},
    {id:5,name:'T-Shirts',status:false}
  ];
  constructor() { }

  getItems():Item[]{
    return this.items;
  }

  addItem(item:Item){
    this.items.unshift(item);
    return this.items;
  }

  changeStatus(id:Number){
    this.items.every((element,index) => {
      if(element.id === id){
        element.status = !element.status;
        return false;
      }
      else{
        return true;
      }
    });

    return this.items;
  }

  markAllUnpack(){
    this.items.every((element,index) => {
      element.status = false;
      return true;
    });

    return this.items;
  }

  removeItem(id:number){

    this.items = this.items.filter((item) =>{
      return item.id != id
    });
    return this.items;
  }

}

export interface Item{
  id:number;
  name:string;
  status:boolean;
}
