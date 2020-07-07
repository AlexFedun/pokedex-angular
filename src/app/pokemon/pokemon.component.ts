import { Input, Component, OnInit} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { InfoComponent } from  '../info/info.component'

@Component({
  selector: 'pokemon-comp',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit{
  @Input() pokemon: Object;
  pokemonData: Object;
  isLoading:boolean = true; 
 
  constructor(private http: HttpClient, public dialog: MatDialog){}

  ngOnInit(){   
      this.http.get(this.pokemon['url']).subscribe(
        (data) => {
          this.pokemonData = data
          this.isLoading = false
        }
      );
  }

  openDialog() {
    this.dialog.open(InfoComponent, {
      data: this.pokemonData,
      width: '600px',
    });
  }

}
