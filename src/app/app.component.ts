import { ItemsService,Item } from './items.service';
import { Component, OnInit} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  items:Item[];
  name='';
  validname:boolean = true;
  packedItems:Item[] = [];
  track:boolean = true;
  unpackedItems:Item[] = [];

  constructor(private itemService:ItemsService){}

  ngOnInit(){
    this.items = this.itemService.getItems();
    this.filteringPacking(this.items);
  }

  
  addItem(f:FormGroup){
    

      let lastItemId = null;
      if(this.track){
        lastItemId = this.items[this.items.length - 1].id;
        this.track = false;
      }
      else{
        lastItemId = this.items[0].id;
      }
      
      let item:Item = {id:lastItemId+1,name:f.value.name,status:false};
      this.items = this.itemService.addItem(item);
      this.name = '';
      this.filteringPacking(this.items);
    f.reset();
    
  }

  changeStatus(id:Number){
    console.log(id);
    this.items = this.itemService.changeStatus(id);
    this.filteringPacking(this.items);   
  }

  markAllUnpack(){
    this.items = this.itemService.markAllUnpack();
    this.filteringPacking(this.items);
  }

  removeItem(id:number){
   this.items = this.itemService.removeItem(id);
    this.filteringPacking(this.items);
  }

  unpackSearch(name:string){
    this.unpackedItems = this.items.filter((item)=> item.name.toLowerCase().includes(name) && !item.status );
  }

  packSearch(name:string){
    this.packedItems = this.items.filter((item)=> item.name.toLowerCase().includes(name) && item.status );
  }

  filteringPacking(itemsForFilter : Item[]){
 
    this.packedItems = this.items.filter((item)=> item.status == true );
    this.unpackedItems = this.items.filter((item)=> item.status == false );
 
  }


 
}
