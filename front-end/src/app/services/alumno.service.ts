import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  crearAlumno(alumno: any, apiKey: string): Observable<any> {
    const headers = new HttpHeaders().set('X-API-KEY', apiKey);
    return this.http.post(`${this.apiUrl}/crear-alumno`, alumno, { headers });
  }

  consultarAlumno(idGrado: number, apiKey: string): Observable<any> {
    const headers = new HttpHeaders().set('X-API-KEY', apiKey);
    return this.http.get(`${this.apiUrl}/consultar-alumno/${idGrado}`, { headers });
  }
}
