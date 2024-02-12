// Path: first_project/ng-pokemon-app/src/app/detail-pokemon/detail-pokemon.component.html

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Pokemon } from "../pokemon";
import { POKEMONS } from "../mock-pokemon-list";
import { PokemonService } from "../pokemon.service";

@Component({
  selector: "app-detail-pokemon",
  templateUrl: "./detail-pokemon.component.html",
})
export class DetailPokemonComponent implements OnInit {
  pokemonList: Pokemon[]; // Tableau de Pokemon

  pokemon: Pokemon | undefined; // Pokemon à afficher dans le template

  constructor
  (
    private route: ActivatedRoute,
    private router: Router,
    //Injection du Service PokemonService
    private pokemonService: PokemonService,
    ) {}

  ngOnInit() {
    // On va supprimer la ligne qui va suivre car on va utiliser le service
    // Mais on va la mettre en commentaire

    // this.pokemonList = POKEMONS;

    const pokemonId: String | null = this.route.snapshot.paramMap.get("id");

    // console.log(pokemonId); si le pokemon n'est pas égal à null
    if (pokemonId) {
      // On va utiliser le service pour récupérer le pokemon
      // this.pokemon = this.pokemonService.getPokemonById(+pokemonId); pour remplacer la ligne qui suit
      // this.pokemon = this.pokemonList.find((p) => p.id === +pokemonId);
      
      this.pokemonService.getPokemonById(+pokemonId).subscribe((pokemon) => {
        this.pokemon = pokemon;
      });
    }
  }

  deletePokemon(pokemon: Pokemon | undefined) {
    // if (this.pokemon) {
    //   this.pokemonService.deletePokemonById(this.pokemon.id).subscribe(() => {
    //     this.goToPokemonList();
    //   });
    // }

    // On va utiliser le service pour récupérer le pokemon
    if (pokemon) {
      this.pokemonService.deletePokemonById(pokemon.id).subscribe(() => {
        this.goToPokemonList();
      });
    }
  }

  goToPokemonList() {
    this.router.navigate(["/pokemons"]);
  }

  goToEditPokemon(pokemon: Pokemon | undefined) {
    // if (this.pokemon) {
    //   let link = ["/pokemon/edit", this.pokemon.id];
    //   this.router.navigate(link);
    // }

    // On va utiliser le service pour récupérer le pokemon
    this.router.navigate(["/pokemons/edit", pokemon?.id]);
  }
}
