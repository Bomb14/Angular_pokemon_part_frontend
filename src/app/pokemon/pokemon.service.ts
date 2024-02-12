import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable()
export class PokemonService {

  constructor( private http : HttpClient) { }

  //On utilise un observable pour gérer les requêtes asynchrones provenant d'un serveur distant
  getPokemonList(): Observable<Pokemon[]> {
    
    //return POKEMONS;

    //return this.http.get<Pokemon[]>('http://localhost:3000/pokemons');

    return this.http.get<Pokemon[]>('api/pokemons')
    .pipe( // un pipe est une fonction qui permet d'enchainer les opérations
      // A partir d'ici, on essai de les erreurs dû à la requête passer dans le pipe
      tap((response) => this.log(response)),
      catchError((error)=> this.handleError(error, []))
    );
          
  }
  // Mthode pour mettre à jour un pokemon
  updatePokemon(pokemon: Pokemon): Observable<Pokemon|null> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.put<Pokemon>('api/pokemons/', pokemon, httpOptions)
    .pipe( 
      // A partir d'ici, on essai de les erreurs dû à la requête passer dans le pipe
      tap((response) => this.log(response)),
      catchError((error)=> this.handleError(error, null))
    );
  }

  //Methode pour rechercher un pokemon
  searchPokemonList(search: string): Observable<Pokemon[]> {
    if(search.trim().length < 2) {
      return of([]);
    }

    return this.http.get<Pokemon[]>(`api/pokemons/?name=${search}`)
    .pipe( 
      tap((response) => this.log(response)),
      catchError((error)=> this.handleError(error, []))
    );
  }

  // Méthode pour ajouter un pokemon
  addPokemon(pokemon: Pokemon): Observable<Pokemon> {
      
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
  
      return this.http.post<Pokemon>('api/pokemons/', pokemon, httpOptions)
      .pipe( 
        
        tap((response) => this.log(response)),
        catchError((error)=> this.handleError(error, null))
      );
  }

  // Méthode pour supprimer un pokemon
  deletePokemonById(pokemonId: number): Observable<Pokemon|null> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.delete<Pokemon>(`api/pokemons/${pokemonId}`, httpOptions)
    .pipe( 
      tap((response) => this.log(response)),
      catchError((error)=> this.handleError(error, null))
    );
  }

  // Méthode pour afficher un pokemon
  getPokemonById(id: number): Observable<Pokemon|undefined> {
    // let pokemons = this.getPokemonList();
    // for(let index = 0; index < pokemons.length; index++){
    //   if(id === pokemons[index].id){
    //     return pokemons[index];
    //   }
    // }
    return this.http.get<Pokemon>(`api/pokemons/${id}`)
    .pipe( // un pipe est une fonction qui permet d'enchainer les opérations
      // A partir d'ici, on essai de les erreurs dû à la requête passer dans le pipe
      tap((response) => this.log(response)),
      catchError((error)=> this.handleError(error, []))
    );
  }

  //Methode pour simplifier l'écriture des logs
  private log (response: any)  {
    console.table(response);
  }

  //Méthode pour l'écriture des logs d'erreur
  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //     console.log(error);

  //     return of(result as T);
  //   }
  // }

  private handleError(error: Error, errorValue: any) {
    console.error(error);

    return of(errorValue);
  }
  
       
  getPokemonTypes(): string[] {
    return [
      'Plante',
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Electrik',
      'Poison',
      'Fée',
      'Vol',
      'Combat',
      'Psy'
    ];
  }
}
