import BaseController, {ControllerTypes} from './BaseController';
export default class CustomMeshController extends BaseController{
    constructor(data, glbFile, startPosition){
        super(data, startPosition);
        this.glbFile = glbFile;
        this.queue = [];
        this.onLoaded = null;
        this.model = null;
        this.loadModel();
    }
    async loadModel (){
        const model = await this.environment.loadModel(this.glbFile);
        this.scene.add(model);
        this.modelLoaded(model);
        if(this.onLoaded){
            this.onLoaded(model);
        }
    }
    modelLoaded(model){
        this.model = model;
        // console.log(model);
    }
    getControllerType(){
        return ControllerTypes.CUSTOM_MESH;
    }
}