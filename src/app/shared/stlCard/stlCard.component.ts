import { Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

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
export class StlCardComponent { 

  @ViewChild('container', {static: true}) containerRef!: ElementRef;

  ngAfterViewInit() {
    // Crear el elemento 'warning'
    const warning = document.createElement('div');
    warning.textContent = '¡Advertencia!';

    // Añadir el elemento 'warning' al contenedor
    this.containerRef.nativeElement.appendChild(warning);
  }
}
