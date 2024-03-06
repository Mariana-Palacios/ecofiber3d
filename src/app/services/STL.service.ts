import { Injectable } from '@angular/core';
import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import WebGL from 'three/examples/jsm/capabilities/WebGL.js';
//const controls = new OrbitControls( camera, renderer.domElement );
//const loader = new GLTFLoader();
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';

//Constants
import * as STL from '@constants/STL';

import { signal } from '@angular/core';
import { isSTLActive } from '@interfaces/STL';

@Injectable({
  providedIn: 'root'
})

export class STLService {

  public scene = new THREE.Scene();
  public camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  public renderer = new THREE.WebGLRenderer();
  public controls = new OrbitControls( this.camera, this.renderer.domElement );
  //public loader = new GLTFLoader();
  public loader = new STLLoader();
  public geometry = new THREE.BoxGeometry( 1, 1, 1 );
  public material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  public cube = new THREE.Mesh( this.geometry, this.material );
  public light = new THREE.DirectionalLight(0xffffff);
  public object:any

  init():void{

    //making the scene
    this.scene = new THREE.Scene();
    //this.scene.background = new THREE.Color(0x87CEEB);
    const axes = new THREE.AxesHelper(3)
    this.scene.add(axes)

    this.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        10000
    );
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.scene.add(this.object);

    let control = new OrbitControls(this.camera, this.renderer.domElement);

    let light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0,0,10);
    this.scene.add(light);

    let light2 = new THREE.DirectionalLight(0xffffff);
    light2.position.set(0,0,-10);
    this.scene.add(light2);

    //compability check
    if ( WebGL.isWebGLAvailable() ) {
      this.scene.add(this.cube)
      // start animation
      //this.renderer.setAnimationLoop(this.animate)
      this.animate();
      this.isSTLActive.set(STL.active)
    } else {

      const warning = WebGL.getWebGLErrorMessage();
      this.isSTLActive.set({
        active: false,
        text: warning
      })
    }
  }

  animate = (): void => {
    requestAnimationFrame(this.animate);
    this.cube.rotation.y += 0.0025;
    this.renderer.render(this.scene, this.camera);
}

  STLFilePath(path: string): void {
    this.loader.load(`assets/STL/${path}`, (model)=>{
      this.object = new THREE.Mesh(
          model,
          new THREE.MeshLambertMaterial({color: 0x00ff00})
      );
      this.object.scale.set(0.1, 0.1, 0.1);
      this.object.position.set(0,-5,0);
      this.object.rotation.x = -Math.PI/2;
      this.init()
    })
  }

  isSTLActive = signal<isSTLActive>(STL.active)

  constructor() {
    /*
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );
    //ajust light
    this.light.position.set(0,0,10);
    //ajust scene
    this.scene.add( this.light );
    this.scene.add( this.cube ); // ?
    this.scene.background = new THREE.Color(0x2a003b);
    this.camera.position.z = 5; 
    */
    //this.STLFilePath('Bulbasaur_Body.stl')
    this.init()
  }

  


}
