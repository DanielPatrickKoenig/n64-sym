import BaseScene from "./classes/BaseScene";
import Environment3d from "./classes/Environment3d";
import ModelLoader, { LoadStates } from "./classes/ModelLoader";

import BaseController, { ControllerTypes } from "./classes/controllers/BaseController";
import CustomMeshController from "./classes/controllers/CustomMeshController";
import GroundController from './classes/controllers/GroundController';
import LightController, { LightTypes } from "./classes/controllers/LightController";

import {setRotation, RotationAxis, getRaycastIntersections, object3DSelector, createPrimitive, getCollisions, getDistance, basicImageMaterial, basicColorMaterial, createEmptyContainer, getCanvasPosition, resizeCanvas} from './utils/THREEHelpers';

import {nextTick, degreesToRadians, radiansToDegrees, ShapeTypes, defaultDimensionValues, processPointerEvent, generateID, getInheritanceChain, getParameterByName, cubicBezier, inside} from './utils/Utilities';

export {
    BaseController,
    CustomMeshController,
    GroundController,
    LightController,
    BaseScene,
    Environment3d,
    ModelLoader,
    setRotation,
    RotationAxis,
    getRaycastIntersections,
    object3DSelector,
    createPrimitive,
    getCollisions,
    getDistance,
    basicImageMaterial,
    basicColorMaterial,
    createEmptyContainer,
    getCanvasPosition,
    nextTick,
    degreesToRadians,
    radiansToDegrees,
    ShapeTypes,
    defaultDimensionValues,
    processPointerEvent,
    generateID,
    getInheritanceChain,
    getParameterByName,
    cubicBezier,
    inside,
    resizeCanvas,
    LoadStates,
    ControllerTypes,
    LightTypes
};

// export BaseScene