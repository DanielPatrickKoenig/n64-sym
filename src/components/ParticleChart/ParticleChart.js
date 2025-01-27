import { useEffect, useState } from "react";
import DataPoint from "../DataPoint/DataPoint";
import { uniq, flatten } from 'lodash';
import { generateID } from '../../utils/Utilities';
import SorterMenu from "../SorterMenu/SorterMenu";
import { plotToPaths } from "../../utils/Utilities";
import './ParticleChart.css';
const ParticleChart = (props) => {
    const sortablePaterns = props.data.sortables;
    const singlePatterns = props.data.singles;
    const valueMetrics = props.data.valueMetrics;
    const customSortablePaterns = props.data.custom.sortables;
    const customSinglePaterns = props.data.custom.singles;
    const [sorter, setSorter] = useState('Publisher');
    const [patern, setPatern] = useState('bar');
    const [positions, setPositions] = useState([]);
    const [motionSignature, setMotionSignature] = useState('empty');
    const sorterHandler = (item) => {
        setSorter(item.name);
        setPatern(item.patern);
    }
    const filteredData = () => {
        return props.data?.dataset ? props.data?.dataset : props.data;
    }
    const arrangePoints = () => {
        console.log(customSinglePaterns);
        setMotionSignature(generateID());
        const valuesOfSorter = uniq(filteredData().map(item => item[sorter]));
        if (sortablePaterns.includes(patern)) {
            const indexedValues = valuesOfSorter.map((item, index) => ({ item, index, count: 0 }));
            const posList = filteredData().map(item => {
                const valueIndex = indexedValues.find((value, i) => item[sorter] === value.item).index;
                const listItem =  { ...item, paternIndex: valueIndex, paternPosition: indexedValues[valueIndex].count };
                indexedValues[valueIndex].count += 1;
                return listItem;
            });
            const growValIndexAxis = 100 / valuesOfSorter.length;
            const groupsLengths = valuesOfSorter.map(value => filteredData().filter(item => item[sorter] === value).length);
            groupsLengths.sort((a, b) => b - a);
            const growValPositionAxis = 100 / groupsLengths[0];
            if (patern === 'bar'){

                const growVals = { x: growValPositionAxis, y: growValIndexAxis };
                setPositions(posList.map(item => ({ ...item, x: item.paternPosition * growVals.x, y: item.paternIndex * growVals.y })))
            }
            if (patern === 'line'){

                const growVals = { x: growValIndexAxis, y: growValPositionAxis };
                setPositions(posList.map(item => ({ ...item, x: item.paternIndex * growVals.x, y: 100 - (item.paternPosition * growVals.y) })))
            }
        }
        else if (singlePatterns.includes(patern)) {
            if (patern === 'time') {
                const lines = valueMetrics.map(metric => {
                    const sortedValues = valuesOfSorter.map(item => ({ item, number: Number(item) })).sort((a, b) => a.number - b.number);
                    // console.log(sortedValues);
                    const pointPrimatives = sortedValues.map((item, index) => {
                        const x = index;
                        const y = filteredData().filter(_item => item.item === _item[sorter]).reduce((t, _item) => _item[metric] + t, 0);
                        // console.log(y);
                        return { x, y };
                    });
                    const highestY = [...pointPrimatives].sort((a, b) => b.y - a.y)[0].y;
                    // console.log(highestY);
                    return pointPrimatives.map(item => (
                        { 
                            x: (item.x / (pointPrimatives.length - 1)) * 100,
                            y: 100 - ((item.y / highestY) * 100),
                        }
                    ));
                });
                // console.log(lines);
                setPositions(filteredData().map((item, index, arr) => plotToPaths(lines, (index === 0 ? .000000001 : index) / arr.length)));
            }
        }
        else if (customSinglePaterns.find(item => item?.name === patern)) {
            const cPatern = customSinglePaterns.find(item => item.name === patern).patern;
            const lowestY = flatten(cPatern).sort((a, b) => a.y - b.y)[0].y;
            const lowestX = flatten(cPatern).sort((a, b) => a.x - b.x)[0].x;
            const highestY = flatten(cPatern).sort((a, b) => b.y - a.y)[0].y;
            const highestX = flatten(cPatern).sort((a, b) => b.x - a.x)[0].x;
            const yDist = (highestY - lowestY) / 2;
            const xDist = (highestX - lowestX) / 2;
            const highestValue = [xDist, yDist].sort((a, b) => b - a)[0];
            const shiftedPatern = cPatern.map(item => item.map(_item => ({ x: ((_item.x - (xDist + lowestX)) * (40 / highestValue)) + 50, y: ((_item.y - (yDist + lowestY)) * (40 / highestValue)) + 50 })))
            setPositions(filteredData().map((item, index, arr) => plotToPaths(shiftedPatern, (index === 0 ? .000000001 : index) / arr.length)));
            console.log(shiftedPatern);
        }
    }
    useEffect(() => {
        arrangePoints();
    }, [sorter]);
    return (
        <div className="particle-chart">
            <div
                className="chart-container"
                onClick={() => setSorter('Genre')}
            >
                {positions.map(item => (
                    <DataPoint 
                        data={item}
                        x={item.x}
                        y={item.y}
                        signature={motionSignature}
                    />
                ))}
            </div>
            <SorterMenu
                onSelectSorter={sorterHandler}
                sorters={props.data.sorters}
            />
        </div>
    )
}
export default ParticleChart;