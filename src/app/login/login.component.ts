import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

 message: string = "Vous êtes déconnecté. (pikachu/pikachu)";
  name: string;
  password: string;
  auth: AuthService;

  constructor(
    public authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
    this.auth = this.authService;
  }

  // Informe l'utilisateur sur son authentfication.
  setMessage() {
    this.message = this.auth.isLoggedIn ?
      'Vous êtes connecté.' : 'Identifiant ou mot de passe incorrect.';
  }

  // Connecte l'utilisateur auprès du Guard
  login() {
    this.message = 'Tentative de connexion en cours ...';
    this.auth.login(this.name, this.password)
      .subscribe((isLoggedIn: boolean) => {
        this.setMessage();
        if (this.auth.isLoggedIn) {
          // Récupère l'URL de redirection depuis le service d'authentification
          // Si aucune redirection n'a été définis, redirige l'utilisateur vers la liste des pokemons.
          let redirect = this.auth.rediretedUrl ? this.auth.rediretedUrl : '/pokemons';
          // Redirige l'utilisateur
          this.router.navigate([redirect]);
        } else {
          let redirection = this.auth.rediretedUrl ? this.auth.rediretedUrl : '/login';
          // Redirige l'utilisateur
          this.router.navigate([redirection]);
          this.password = '';
        }
    });

    
  }

  // Déconnecte l'utilisateur
  logout() {
    this.auth.logout();
    this.message = 'Vous êtes déconnecté.';
  }

}
