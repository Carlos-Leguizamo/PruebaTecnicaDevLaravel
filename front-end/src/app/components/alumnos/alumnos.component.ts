import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlumnoService } from '../../services/alumno.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alumnos.component.html',
})
export class AlumnosComponent {
  alumno = {
    nombre: '',
    fecha_nacimiento: '',
    nombre_padre: '',
    nombre_madre: '',
    grado: '',
    seccion: '',
    fecha_ingreso: ''
  };
  alumnos: any[] = [];
  idGrado: number = 0;
  apiKey: string = '';

  constructor(private alumnoService: AlumnoService) {}

  agregarAlumno() {
    if (!this.apiKey) {
      this.mostrarError('Ingrese un API Key válido');
      return;
    }

    this.alumnoService.crearAlumno(this.alumno, this.apiKey).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Alumno registrado',
          text: 'El alumno ha sido agregado correctamente',
          timer: 2000,
          showConfirmButton: false
        });
        this.alumno = {
          nombre: '',
          fecha_nacimiento: '',
          nombre_padre: '',
          nombre_madre: '',
          grado: '',
          seccion: '',
          fecha_ingreso: ''
        };
      },
      (error) => {
        if (error.status === 401) {
          this.mostrarError('API Key incorrecta o no autorizada');
        } else {
          this.mostrarError('Error al registrar alumno');
        }
      }
    );
  }

  consultarAlumnos() {
    if (!this.apiKey) {
      this.mostrarError('Ingrese un API Key válido');
      return;
    }

    this.alumnoService.consultarAlumno(this.idGrado, this.apiKey).subscribe(
      (data) => {
        if (data && data.alumnos) {
          this.alumnos = data.alumnos;  // Extraemos correctamente los alumnos

          if (this.alumnos.length === 0) {
            this.mostrarError(`No se encontraron alumnos en el grado ${this.idGrado}`);
          } else {
            Swal.fire({
              icon: 'info',
              title: 'Consulta exitosa',
              text: `Se encontraron ${this.alumnos.length} alumnos en el grado ${this.idGrado}`,
              timer: 2000,
              showConfirmButton: false
            });
          }
        } else {
          this.mostrarError(`No se encontraron alumnos en el grado ${this.idGrado}`);
        }
      },
      (error) => {
        if (error.status === 404) {
          const mensajeError = error.error?.message || `No se encontraron alumnos en el grado ${this.idGrado}`;
          this.mostrarError(mensajeError);
        } else if (error.status === 401) {
          this.mostrarError('API Key incorrecta o no autorizada');
        } else {
          this.mostrarError('Error al consultar alumnos');
        }
      }
    );
  }

  mostrarError(mensaje: string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: mensaje
    });
  }
}
