import { useEffect, useState } from "react";
import DataPoint from "../DataPoint/DataPoint";
import { uniq } from 'lodash';
import { generateID } from '../../utils/Utilities';
import SorterMenu from "../SorterMenu/SorterMenu";
import './ParticleChart.css';
const ParticleChart = (props) => {
    const sortablePaterns = ['bar', 'line'];
    const [sorter, setSorter] = useState('Publisher');
    const [patern, setPatern] = useState('bar');
    const [positions, setPositions] = useState([]);
    const [motionSignature, setMotionSignature] = useState('empty');
    const sorterHandler = (item) => {
        setSorter(item.name);
        setPatern(item.patern);
    }
    const arrangePoints = () => {
        setMotionSignature(generateID());
        if (sortablePaterns.includes(patern)) {
            const valuesOfSorter = uniq(props.data.map(item => item[sorter]));
            const indexedValues = valuesOfSorter.map((item, index) => ({ item, index, count: 0 }));
            const posList = props.data.map(item => {
                const valueIndex = indexedValues.find((value, i) => item[sorter] === value.item).index;
                const listItem =  { ...item, paternIndex: valueIndex, paternPosition: indexedValues[valueIndex].count };
                indexedValues[valueIndex].count += 1;
                return listItem;
            });
            const growValIndexAxis = 100 / valuesOfSorter.length;
            const groupsLengths = valuesOfSorter.map(value => props.data.filter(item => item[sorter] === value).length);
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
            <SorterMenu onSelectSorter={sorterHandler} />
        </div>
    )
}
export default ParticleChart;