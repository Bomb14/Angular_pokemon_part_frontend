import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: 'app.component.html',
})
export class AppComponent  {}


// pokemonList: Pokemon[] = POKEMONS;
  // pokemonSelected: Pokemon|undefined;

  // ngOnInit(): void {
  //   console.table(this.pokemonList);
    
  // }


  // selectPokemon(pokemonId: String) {
  //   const id = +pokemonId;
  //   const pokemon : Pokemon|undefined = this.pokemonList.find(pokemon => pokemon.id === +pokemonId);
  //   if (pokemon) {
  //     console.log(`You selected ${pokemonId} !`);
  //     this.pokemonSelected = pokemon;
  //   }else {
  //     console.log(`Pokemon with id not found!`);
  //     this.pokemonSelected = pokemon;
  //   }
    
  
  //}