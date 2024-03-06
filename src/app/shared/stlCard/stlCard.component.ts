import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, AfterViewInit, inject, signal } from '@angular/core';

import * as STL from '@constants/STL';
import { isSTLActive } from '@interfaces/STL'; 
import { STLService } from '@services/STL.service';

@Component({
  selector: 'app-stl-card',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './stlCard.component.html',
  styleUrl: './stlCard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class StlCardComponent implements AfterViewInit{ 

  @ViewChild('container', {static: true}) containerRef!: ElementRef;

  public stlService = inject(STLService)
  STLState = signal<isSTLActive>(STL.active)

  constructor(){
    this.STLState.set( this.stlService.isSTLActive() )
  }

  ngAfterViewInit() {
    // Crear el elemento 'warning'
    const warning = document.createElement('div');
    warning.textContent = '¡Advertencia!';

    // Añadir el elemento 'warning' al contenedor
    this.containerRef.nativeElement.appendChild(this.STLState().text);
  }
}
