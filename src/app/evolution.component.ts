import { Input, Component, OnInit} from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'evolution-comp',
  templateUrl: './evolution.component.html',
  styleUrls: ['./evolution.component.scss']
})
export class EvolutionComponent implements OnInit{
  @Input() url: string;
  isLoading:boolean = true; 
  data;
  constructor(private http: HttpClient){}

  ngOnInit(){   
        this.http.get(this.url).subscribe(
            (data) => {
                this.http.get(data['evolution_chain']['url']).subscribe(
                    (data) => {
                        let link = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
                        let evolutionSprites = [], evo = data['chain'];
                        while (evo) {
                            let id = evo.species.url.slice(42);
                            evolutionSprites.push(link + id.substring(0, id.length - 1) + ".png")
                            evo = evo.evolves_to[0];
                        }
                        this.data = evolutionSprites;
                        this.isLoading = false;
                    }
                );
            }
        );
  }

}
