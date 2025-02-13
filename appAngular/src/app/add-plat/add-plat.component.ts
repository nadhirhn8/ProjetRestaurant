import { Component } from '@angular/core';
import { PlatService } from '../plat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-plat',
  templateUrl: './add-plat.component.html',
  styleUrls: ['./add-plat.component.css']
})
export class AddPlatComponent {
  plat: any = { nom: '', description: '', prix: '', image: '' };
  nom: any;
  description: any;
  prix: any;
  imageBase64: any;

  constructor(private platService: PlatService, private router: Router) {}

  addPlat() {
    if (!this.plat.nom || !this.plat.description || !this.plat.prix || !this.plat.image) {
      console.error("Tous les champs sont requis !");
      return;
    }
  
    this.platService.addPlat(this.plat).subscribe(
      response => {
        console.log('Réponse du serveur :', response);
        this.router.navigate(['/plats']);
      },
      error => {
        console.error('Erreur lors de l\'ajout du plat :', error);
      }
    );
  }
  

  
}