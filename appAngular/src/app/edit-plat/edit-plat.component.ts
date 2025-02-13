import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatService } from '../plat.service';

@Component({
  selector: 'app-edit-plat',
  templateUrl: './edit-plat.component.html',
  styleUrls: ['./edit-plat.component.css']
})
export class EditPlatComponent implements OnInit {
  plat: any = { nom: '', description: '', prix: 0, image: '' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private platService: PlatService
  ) {}

  ngOnInit() {
    const platId = this.route.snapshot.paramMap.get('id');
    if (platId) {
      this.platService.getPlatById(platId).subscribe(data => {
        this.plat = data;
      });
    }
  }

  updatePlat() {
    this.platService.updatePlat(this.plat.id, this.plat).subscribe(() => {
      alert("Plat mis à jour avec succès !");
      this.router.navigate(['/plats']); // Redirection après mise à jour
    });
  }

  cancel() {
    this.router.navigate(['/plats']);
  }
}
