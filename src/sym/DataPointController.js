import { BaseController, basicColorMaterial } from "../engine";
export default class DataPointController extends BaseController{
    constructor(data){
        super(data);
        this.section = null;
        this.patern = [{ x: 0, y: 0, z: 0 }, { x: 0, y: 1, z: 0 }];
        this.paternRatio = 0;
        this.data = data.data;
        this.plane = this.environment.createPlane({ size: { x: .1, y: .1 }, position: { x: 0, y: 0, z: 0 }, material: basicColorMaterial('cccccc') });
    }
    setSection(section){
        this.section = section;
    }
    setPatern(patern, ratio){
        this.patern = patern;
        this.paternRatio = ratio;
    }
    plotToPatern(){
        return {
            x: (this.patern[1].x - this.patern[0].x) * this.paternRatio,
            y: (this.patern[1].y - this.patern[0].y) * this.paternRatio,
            z: (this.patern[1].z - this.patern[0].z) * this.paternRatio
        };
    }
    update(){
        if (this.section){
            const plottedPoint = this.plotToPatern();
            this.plane.mesh.position.x = this.section.mesh.position.x + plottedPoint.x;
            this.plane.mesh.position.y = this.section.mesh.position.y + plottedPoint.y;
            this.plane.mesh.position.z = this.section.mesh.position.z + plottedPoint.z;
        }
    }
}