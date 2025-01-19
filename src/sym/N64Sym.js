import { BaseScene, LightController, LightTypes, resizeCanvas, basicColorMaterial } from '../engine';
import N64SymController from './N64SymController';
export default class N64Sym extends BaseScene{
    constructor(el, data){
        super(el);
        const lc = new LightController({ environment: this.environment });
        lc.addLight({ type: LightTypes.DIRECTIONAL, intensity: 2.5, target: { x: 0, y: -10, z: 5 }, color: 0xffcc66 });
        lc.addLight({ type: LightTypes.DIRECTIONAL, intensity: .8, target: { x: 0, y: 4, z: -6 }, color: 0xffcc66 });

        this.sectionController = new N64SymController({ environment: this.environment, updateHandler: this.manageAspectRatio, data });
    }

    manageAspectRatio () {
        if (this.environment.element) {
            const { width, height } = this.environment.element.getBoundingClientRect();
            resizeCanvas(this.environment, width, height);
        }
    }
}