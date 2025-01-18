import { BaseController, basicColorMaterial, degreesToRadians } from "../engine";
export default class N64SymController extends BaseController{
    constructor(data){
        super(data);
        this.sections = [];
        this.addSection();
        this.addSection();
        this.addSection();
        this.addSection();
        this.addSection();
        this.updateHandler = data.updateHandler;
    }
    addSection () {
        const addedSection = this.environment.createBox({ size: { x: .25, y: .25, z: .25 }, position: { x: 0, y: 0, z: -2 }, material: basicColorMaterial('44cc00') });
        this.sections.push(addedSection);
    }
    update () {
        if (this.updateHandler) {
            this.updateHandler();
        }
        this.sections.forEach(item => {
            item.mesh.rotateX(degreesToRadians(.1));
        });
        this.layoutSections();
    }
    layoutSections(){
        const { width, height } = this.environment.element.getBoundingClientRect();
        const cols = Math.ceil((width / height) * 2);
        const rows = Math.floor(this.sections.length / cols);
        const footprint = .5;
        const xStart = footprint * (cols / 3);
        const yStart = footprint * (rows / 3);
        let col = 0;
        let row = 0;
        this.sections.forEach(item => {
            item.mesh.position.x = (col * footprint) - xStart;
            item.mesh.position.y = (row * footprint) - yStart;
            col++;
            if (col >= cols) {
                col = 0;
                row++;
            }

        });
    }
}