import { Component, OnInit } from '@angular/core';
import { PlatService } from '../plat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plats-list',
  templateUrl: './plats-list.component.html',
  styleUrls: ['./plats-list.component.css']
})
export class PlatsListComponent implements OnInit {
  plats: any[] = [];

  constructor(private platService: PlatService, private router: Router) {}

  ngOnInit() {
    this.loadPlats();
  }

  loadPlats() {
    this.platService.getPlats().subscribe(data => {
      this.plats = data;
    });
  }

  editPlat(plat: any) {
    this.router.navigate(['/edit-plat', plat.id]); // Redirige vers la page d'édition
  }

  deletePlat(id: string) {
    if (confirm("Voulez-vous vraiment supprimer ce plat ?")) {
      this.platService.deletePlat(id).subscribe(() => {
        this.loadPlats(); // Recharge la liste après suppression
      });
    }
  }
}
