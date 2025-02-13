import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlatService } from '../plat.service';

@Component({
  selector: 'app-plat-detail',
  templateUrl: './plats-detail.component.html',
  styleUrls: ['./plats-detail.component.css']
})
export class PlatDetailComponent implements OnInit {
  plat: any;

  constructor(private route: ActivatedRoute, private platService: PlatService) {}

  ngOnInit() {
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.platService.getPlatById(id).subscribe(data => {
        this.plat = data;
      });
    }
  }

  
}
