import { Component, Input, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.scss']
})
export class PokemonFormComponent implements OnInit {
  // On va demander à l'application de passer un pokemon par défaut au composant
  @Input() pokemon: Pokemon;

  // On va créer un tableau de types de pokémons dans l'applications
  types: string[];

  // On va créer une variable pour savoir si le formulaire est utilisé pour ajouter ou modifier un pokémon
  isAddForm: boolean;

  constructor(
    // On va injecter le service PokemonService dans le composant
    // On va utiliser le service pour récupérer la liste de tous les types de pokémons
    private pokemonService: PokemonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Récupérer la liste de tous les pokémons et les afficher dans le formulaire avec la methode pokemonTypes()

    // Récupérer la liste de tous les types de pokémons et les afficher dans le formulaire avec la methode pokemonTypes()

    this.types = this.pokemonService.getPokemonTypes();

    // On va vérifier si le formulaire utilise une route avec le mot clé add
    this.isAddForm = this.router.url.includes('add');

  }

  // Avec la methode hasType() on va vériifer si le pokémon a le type passé en paramètre
  hasType(type:string): boolean {
    // On va vérifier si le pokémon a le type passé en paramètre
    return this.pokemon.types.includes(type);

  }

  // Avec la methode selectType() on va prendre en compte le type du pokémon sélectionné par l'utilisateur
  selectType($event: Event, type: string) {
    // On va vérifier si le pokémon a le type passé en paramètre
    const isChecked: boolean = ($event.target as HTMLInputElement).checked;

    // Si le type est coché et qu'il n'est pas dans le tableau des types du pokémon, on l'ajoute au tableau
    if (isChecked) {
      this.pokemon.types.push(type);
    }
    // Si le type est décoché et qu'il est dans le tableau des types du pokémon, on le retire du tableau
    else {
      // On va récupérer l'index du type dans le tableau des types du pokémon
      const index = this.pokemon.types.indexOf(type);
      if (index > -1) {
        this.pokemon.types.splice(index, 1);
      }
    }

  }

  isTypesValid(type: string): boolean {
    // On va empêcher l'utilisateur de désélectionner un type si le pokémon a déjà 1 types
    if (this.pokemon.types.length === 1 && this.hasType(type)) {
      return false;
    }
    // On va eùpêcher l'utilisateur de sélectionner un type si le pokémon a déjà 3 types	
    if (this.pokemon.types.length >2 && !this.hasType(type)) {
      return false;
    }
    return true;
  }

  // Avec la methode onSubmit() on va récupérer les données du formulaire et les envoyer au composant parent
  onSubmit() {
    // console.log("Submit form !");
    // this.router.navigate(['/pokemon', this.pokemon.id]);
    if(this.isAddForm) {

      //Ici l'id represente ce que le backend va renvoyer lors de l'ajout d'un pokemon
      this.pokemonService.addPokemon(this.pokemon)
        .subscribe((pokemon:Pokemon) => this.router.navigate(['/pokemon', pokemon.id])
      
      );

    }else {

      this.pokemonService.updatePokemon(this.pokemon)
        .subscribe(() => this.router.navigate(['/pokemon', this.pokemon.id])
      
      );
    }
    
  }

}
