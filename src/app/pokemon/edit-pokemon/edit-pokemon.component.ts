import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-edit-pokemon',
  template: `
    <h2 class="center">Editer {{ pokemon?.name }}</h2>
    <p *ngIf="pokemon" class="center">
      <img [src]="pokemon.picture" [alt]="pokemon.name" />
    </p>
    <app-pokemon-form *ngIf="pokemon" [pokemon]="pokemon"></app-pokemon-form>
  `,
  styles: [
  ]
})
export class EditPokemonComponent implements OnInit {

  pokemon : Pokemon|undefined;

  constructor(
    // Inject the dependencies
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) { }

  ngOnInit() {
    // Get the id from the route
    const pokemonId: string|null = this.route.snapshot.paramMap.get('id');
    // Get the pokemon from the service
    if (pokemonId) {
      this.pokemonService.getPokemonById(+pokemonId)
          .subscribe((pokemon) => {
            this.pokemon = pokemon;
          });
    }else{
      this.pokemon = undefined;
    }

  }

}
