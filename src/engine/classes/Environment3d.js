import * as THREE from 'three';
import { Object3D } from 'three';
import {ShapeTypes} from '../utils/Utilities.js';
import {getRaycastIntersections, object3DSelector, createPrimitive, resizeCanvas} from '../utils/THREEHelpers.js';
import ModelLoader, { LoadStates } from '../classes/ModelLoader';
export default class Environment3d{
    constructor(element, { width, height, resizable }){
        const _width = width ? width : 1000;
        const _height = height ? height :  700;
        this.element = element;
        // console.log(pov);
        this.scene = new THREE.Scene();
        this.cameraContainer = new Object3D();
        this.camera = this.createCamera(_width, _height);
        this.cameraContainer.add(this.camera);
        this.scene.add(this.cameraContainer);
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setClearColor( 0x000000, 0 );
        this.renderer.setSize( _width, _height );
        this.controllers = [];
        element.appendChild(this.renderer.domElement);
        this.modelLoader = null;
        this.onLoadingComplete = null;
        this.resizable = resizable;
        // console.log(this.cameraContainer);
        if(this.resizable){
            window.addEventListener("resize", () => { resizeCanvas(this); });
        }
        
    }
    createCamera(width, height) {
        return  new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );
    }
    registerController (controller) {
        this.controllers.push({ controller, type: controller.getControllerType(), id: controller.controllerID });
    }
    unregisterController (controller) {
        const id = controller.controllerID;
        const targetController = this.controllers.map((item, index) => ({index, item})).filter(item => item.item.id === id)[0];
        if(targetController){
            this.controllers.splice(targetController.index, 1);
        }
    }
    render(){
        this.renderer.render(this.scene, this.camera);
    }
    rayCastHits({x, y}, objects){
        return getRaycastIntersections({x, y}, objects, this.camera, this.renderer);
    }
    selector(scope, filters) {
        return object3DSelector(scope, filters);
    }
    async loadModel(file){
        if(!this.modelLoader){
            this.modelLoader = new ModelLoader();
        }
        const model = await this.modelLoader.load(file);
        const loadsInProgress = this.modelLoader.queue.filter(item => item.status === LoadStates.LOADING);
        // console.log(loadsInProgress);
        if(loadsInProgress.length === 0 && this.onLoadingComplete){
            this.onLoadingComplete();
        }
        return model;
    }
    createPlane({size, orientation, position, material, rotation, customMesh}){
        return createPrimitive({ type: ShapeTypes.PLANE, size, position, orientation, material, rotation, scene: this.scene, customMesh });
    }
    createBox({size, orientation, position, material, rotation, customMesh}){
        return createPrimitive({ type: ShapeTypes.BOX, size, position, orientation, material, rotation, scene: this.scene, customMesh });
    }
    createSphere({size, orientation, position, material, rotation, customMesh}){
        return createPrimitive({ type: ShapeTypes.SPHERE, size, position, orientation, material, rotation, scene: this.scene, customMesh });
    }
    createCylinder({size, orientation, position, material, rotation, customMesh}){
        return createPrimitive({ type: ShapeTypes.CYLINDER, size, position, orientation, material, rotation, scene: this.scene, customMesh });
    }
}