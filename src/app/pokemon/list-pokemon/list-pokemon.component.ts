import { Component, OnInit } from "@angular/core";
import { Pokemon } from "../pokemon";
import { Router } from "@angular/router";
import { PokemonService } from "../pokemon.service";

@Component({
  selector: "app-list-pokemon",
  templateUrl: "./list-pokemon.component.html",
})
export class ListPokemonComponent implements OnInit {
  pokemonList: Pokemon[];

  constructor
  (
    private route: Router,
    //Injection du Service PokemonService
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    this.pokemonService.getPokemonList().subscribe((pokemonList) => {
      this.pokemonList = pokemonList;
    
    });
  }  

  goToPokemon(pokemon: Pokemon) {
    let link = ["/pokemon", pokemon.id];
    this.route.navigate(link);
  }
}
