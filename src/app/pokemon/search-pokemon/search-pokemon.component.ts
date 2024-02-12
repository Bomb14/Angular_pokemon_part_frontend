import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  
})
export class SearchPokemonComponent implements OnInit {
  // On utilise subject pour stocker les termes de recherche de l'utilisateur
  searchTerms = new Subject<string>();

  // Une fois la recherche associé à un terme, on utilise un observable pour récupérer les pokemons correspondant
  pokemons$: Observable<Pokemon[]>;

  constructor
  (
    private router: Router,
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this.pokemons$ = this.searchTerms.pipe(
      // attendre 300ms de pause entre chaque requête
      debounceTime(300),

      // ignorer la recherche en cours si c'est la même que la précédente
      distinctUntilChanged(),

      // on retourne la liste des résultats correspondant aux termes de recherche
      switchMap((term: string) => this.pokemonService.searchPokemonList(term)),
    );
  }
  
  // Méthode pour rechercher un pokemon
  searchPokemon(search: string) {
    this.searchTerms.next(search);
  }

  // Méthode pour afficher le détail d'un pokemon  
  goToDetail(pokemon: Pokemon) {
    const link = ['/pokemon', pokemon.id];
    this.router.navigate(link);
  }

}
