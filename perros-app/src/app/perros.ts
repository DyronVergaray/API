import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { PerroService, RespuestaPerros, RespuestaRazas } from './perro.service';

@Component({
  selector: 'app-perros',
  imports: [CommonModule, FormsModule],
  templateUrl: './perros.html'
})
export class Perros implements OnInit {

  perros: string[] = [];
  razas: string[] = [];
  opcionesCantidad = [3, 6, 12];

  cantidad = 6;
  razaSeleccionada = '';   // '' = todas las razas

  cargando = true;
  error = '';

  constructor(private servicio: PerroService) {}

  ngOnInit(): void {
    this.cargarRazas();
    this.cargarPerros();
  }

  cargarRazas(): void {
    this.servicio.obtenerRazas().subscribe({
      next: (respuesta: RespuestaRazas) => {
        this.razas = Object.keys(respuesta.message);
      },
      error: (err) => console.error('Error al cargar las razas', err)
    });
  }

  cargarPerros(): void {
    this.cargando = true;
    this.error = '';

    this.servicio.obtenerPerros(this.cantidad, this.razaSeleccionada).subscribe({
      next: (respuesta: RespuestaPerros) => {
        this.perros = respuesta.message;
        this.cargando = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error al consumir la API', err);
        this.error = this.mensajeDeError(err);
        this.cargando = false;
      }
    });
  }

  // Mensaje de error específico según el tipo de fallo
  private mensajeDeError(err: HttpErrorResponse): string {
    if (err.status === 0) {
      return 'La API no responde. Revisa tu conexión a Internet o inténtalo más tarde.';
    }
    if (err.status === 404) {
      return `No se encontró la raza "${this.razaSeleccionada}".`;
    }
    if (err.status >= 500) {
      return 'El servidor de Dog CEO tiene problemas (error ' + err.status + '). Inténtalo más tarde.';
    }
    return `No se pudieron cargar las imágenes (error ${err.status}).`;
  }
}