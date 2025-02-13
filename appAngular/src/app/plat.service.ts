import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class PlatService {
  private apiUrl = 'http://localhost:5000/plats';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getHeaders(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${this.authService.getToken()}` });
  }
  

  getPlats(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getPlatById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addPlat(plat: any): Observable<any> {
    return this.http.post(this.apiUrl, plat, { headers: this.getHeaders() });
  }
  
  updatePlat(id: string, plat: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, plat, { headers: this.getHeaders() });
  }
  
  deletePlat(id: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: headers });
  }
  
  
  
  
  
}