import { BaseController, basicColorMaterial, degreesToRadians } from "../engine";
import DataPointController from "./DataPointController";
import { uniq } from 'lodash';
export default class N64SymController extends BaseController{
    constructor(data){
        super(data);
        this.sections = [];
        this.updateHandler = data.updateHandler;
        this.data = data.data;
        this.dataPoints = this.data.map(item => new DataPointController({ environment: this.environment, data: item }));
        this.paterns = [
            [{ x: 0, y: 0, z: 0 }, { x: 0, y: .25, z: 0 }]
        ];
        this.currentPatern = this.paterns[0];
        this.setSorter('Year_of_Release');
    }
    addSection () {
        const addedSection = this.environment.createBox({ size: { x: .1, y: .1, z: .1 }, position: { x: 0, y: 0, z: -2 }, material: basicColorMaterial('44cc00') });
        this.sections.push(addedSection);
        return addedSection;
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
    setSorter(sorter){
        const sectionList = uniq(this.data.map(item => item[sorter]));
        sectionList.forEach(item => {
            const section = this.addSection();
            const filteredPoints = this.dataPoints.filter(_item => _item.data[sorter] === item);
            filteredPoints.forEach((_item, index) => {
                _item.setSection(section);
                _item.setPatern(this.currentPatern, index / filteredPoints.length);
            });
        });
        

    }
}