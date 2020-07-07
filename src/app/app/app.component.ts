import { Component, OnInit, ViewChild} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {PageEvent} from '@angular/material/paginator';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pokedex';
  allData:any;
  list:any = [];
  pageEvent: PageEvent;
  listLength:number = 0;
  isLoading:boolean = true;
  search:string = "";
  @ViewChild('paginator') paginator: MatPaginator;
  typesFilter = [ "bug", "dragon", "fairy", "fire", "ghost", "ground", "normal",
                  "psychic", "steel", "dark", "electric", "fighting", "flying",
                  "grass", "ice", "poison", "rock", "water"]
  selectedFilter:string = "all";
  constructor(private http: HttpClient){}
      
  ngOnInit(){
      this.http.get(`https://pokeapi.co/api/v2/pokemon/?limit=1000&offset=0`).subscribe(
        (data) => {
          this.allData = data["results"]
          this.list = this.allData.slice(0,10)
          this.listLength = this.allData.length;
          this.isLoading = false
        }
      );
  }
  public getPokemonList(event?:PageEvent, isSearch:boolean = false) {
    let limit = event ? event.pageSize : 10
    let offset = event ? event.pageIndex*limit : 0
    if (isSearch) {
      this.paginator.firstPage()
      offset = 0
    }
    // set all data
    this.list = this.allData;
    //filter
    if (this.selectedFilter !== "all") {
      this.isLoading = true
      this.http.get(`https://pokeapi.co/api/v2/type/${this.selectedFilter}`).subscribe(
        (data) => {
          this.list = data["pokemon"]
          this.searchAndSlice(offset, limit)
          this.isLoading = false
        }
      );
    }
    else
      this.searchAndSlice(offset, limit)
    return event;
  }

  searchAndSlice(offset, limit){
    //search
    if (this.search !== "")
    this.list = this.list.filter((item) => {
      return this.selectedFilter === "all"?item.name.includes(this.search):item.pokemon.name.includes(this.search)
    })
    this.listLength = this.list.length;
    this.list = this.list.slice(offset, offset + limit)
  }

}
