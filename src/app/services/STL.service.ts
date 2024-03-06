import { Injectable } from '@angular/core';
import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import WebGL from 'three/examples/jsm/capabilities/WebGL.js';
//const controls = new OrbitControls( camera, renderer.domElement );
//const loader = new GLTFLoader();
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';

import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class STLService {

  public scene = new THREE.Scene();
  public camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  public renderer = new THREE.WebGLRenderer();
  public controls = new OrbitControls( this.camera, this.renderer.domElement );
  public loader = new GLTFLoader();
  public geometry = new THREE.BoxGeometry( 1, 1, 1 );
  public material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  public cube = new THREE.Mesh( this.geometry, this.material );

  animate():void {
    requestAnimationFrame( this.animate );
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    this.renderer.render( this.scene, this.camera );
  }

  constructor() {
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );
    this.scene.add( this.cube );
    this.camera.position.z = 5;

    //compability check
    if ( WebGL.isWebGLAvailable() ) {

      // start animation
      this.animate();

    } else {

      const warning = WebGL.getWebGLErrorMessage();
      console.log(warning)

    }

  }

  


}
