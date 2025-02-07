import { Component } from '@angular/core';
import { AlumnosComponent } from './components/alumnos/alumnos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: '<app-alumnos></app-alumnos>',
  imports: [AlumnosComponent]
})
export class AppComponent { }
