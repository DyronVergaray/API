import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RespuestaPerros {
  message: string[];
  status: string;
}

// /api/breeds/list/all devuelve { "affenpinscher": [], "hound": ["afghan", ...], ... }
export interface RespuestaRazas {
  message: Record<string, string[]>;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class PerroService {

  private base = 'https://dog.ceo/api';

  constructor(private http: HttpClient) {}

  // Sin raza: imágenes aleatorias de cualquier raza.
  // Con raza: imágenes aleatorias de esa raza.
  obtenerPerros(cantidad: number = 6, raza: string = ''): Observable<RespuestaPerros> {
    const url = raza
      ? `${this.base}/breed/${raza}/images/random/${cantidad}`
      : `${this.base}/breeds/image/random/${cantidad}`;
    return this.http.get<RespuestaPerros>(url);
  }

  obtenerRazas(): Observable<RespuestaRazas> {
    return this.http.get<RespuestaRazas>(`${this.base}/breeds/list/all`);
  }
}