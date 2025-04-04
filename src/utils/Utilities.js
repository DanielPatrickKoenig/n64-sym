import jstrig from "jstrig";
const ShapeTypes = {
    PLANE: 'plane',
    BOX: 'box',
    SPHERE: 'sphere',
    CYLINDER: 'cylinder'
}
function nextTick() {
    return new Promise(resolve => {
        setTimeout(resolve, 0);
    });
}
function degreesToRadians(value){
    return value * (Math.PI/180);
}
function radiansToDegrees(value){
    return value * (180/Math.PI);
}
function defaultDimensionValues () {
    return {
        size: { x: 1, y: 1, z: 1, r: 1 },
        position: { x: 0, y: 0, z: 0 },
        orientation: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
    }
}
function processPointerEvent(e){
    return e.touches && e.touches.length
        ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
        : { x: e.clientX, y: e.clientY };
}
function getInheritanceChain(targetObject){
    const list = [];
    let obj = targetObject;
    while(!obj.constructor || obj.constructor.name !== 'Object'){
        obj = obj.__proto__;
        list.push(obj.constructor.name);
    }
    // console.log(list);
    return list;
}
function generateID(){
    return `${Math.random().toString().split('.').join('')}-${Math.random().toString().split('.').join('')}-${Math.random().toString().split('.').join('')}`;
}
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function ratioPoint (ratio, a, b) {
    return { x: a.x + ((b.x - a.x) * ratio), y: a.y + ((b.y - a.y) * ratio) };
}
function cubicBezier (ratio, startPoint, controlPoint1, controlPoint2, endPoint) {
    const startToControlPoint1 = ratioPoint(ratio, startPoint, controlPoint1);
    const controlPoint1ToEnd = ratioPoint(ratio, controlPoint2, endPoint);
    const controlPoint1toControlPoint2 = ratioPoint(ratio, controlPoint1, controlPoint2);

    const startToC1ToC1ToC2 = ratioPoint(ratio, startToControlPoint1, controlPoint1toControlPoint2);
    const c1ToC2ToC2ToEnd = ratioPoint(ratio, controlPoint1toControlPoint2, controlPoint1ToEnd);

    return ratioPoint(ratio, startToC1ToC1ToC2, c1ToC2ToC2ToEnd);
}
function inside(point, vs) {
    // ray-casting algorithm based on
    // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html
    
    var x = point[0], y = point[1];
    
    var _inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];
        
        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) _inside = !_inside;
    }
    
    return _inside;
}

function getPathDistanceValues(path, close){
    const pathWithDist = (close ? [...path, path[0]] : path)
        .map((item, index, arr) => ({ 
            ...item, 
            distance: index > 0 ? jstrig.distance(item, arr[index - 1]) : 0,
        }));
    const cumulations = pathWithDist
        .map((item, index) => pathWithDist.filter((_item, _index) => _index <= index).reduce((t, _item) => _item.distance + t, 0));
    const totalDistance = cumulations[cumulations.length - 1];
    return { pathWithDist, cumulations, totalDistance };
}

function plotToPath (path, ratio, close) {
    const { pathWithDist, cumulations, totalDistance } = getPathDistanceValues(path, close);
    const pathWithRatios = pathWithDist.map((item, index) => ({ ...item, ratio: cumulations[index] / cumulations[cumulations.length - 1], index }))
    const nextIndex = pathWithRatios.find((item, index, arr) => ratio <= item.ratio && ratio >= arr[index - 1].ratio).index;
    const startEnd = {
        start: pathWithRatios[nextIndex - 1],
        end: pathWithRatios[nextIndex]
    };
    const ratioDistance = ratio * totalDistance;
    const startDistance = startEnd.start.ratio * totalDistance;
    const angle = jstrig.angle(startEnd.start, startEnd.end);
    const plottedPosition = {
        x: jstrig.orbit(startEnd.start.x, ratioDistance - startDistance, angle, 'cos'),
        y: jstrig.orbit(startEnd.start.y, ratioDistance - startDistance, angle, 'sin')
    }
    return plottedPosition;
};

function plotToPaths(paths, ratio){
    const lenthList = paths.map(item => {
        const distanceValues = getPathDistanceValues(item).cumulations;
        return distanceValues[distanceValues.length - 1];
    });
    const cumulations = lenthList
        .map((item, index) => lenthList.filter((_item, _index) => _index <= index).reduce((t, _item) => _item + t, 0));
    const totalDistance = cumulations[cumulations.length - 1];
    const ratioDistance = totalDistance * ratio;
    const targetPathEntries = cumulations.map((item, index) => ({ item, index })).filter(item => ratioDistance <= item.item);
    const startDistance = targetPathEntries.length === paths.length ? 0 : cumulations[targetPathEntries[0].index - 1];
    const endDistance = targetPathEntries[0].item;
    const pathRatio = (ratioDistance - startDistance) / (endDistance - startDistance);
    return plotToPath(paths[targetPathEntries[0].index], pathRatio);
    // console.log(startDistance);
    // console.log(ratioDistance);
    // console.log(endDistance);
    // console.log(targetPathEntries[0].index);
}
export {nextTick, degreesToRadians, radiansToDegrees, ShapeTypes, defaultDimensionValues, processPointerEvent, generateID, getInheritanceChain, getParameterByName, cubicBezier, inside, plotToPath, plotToPaths};