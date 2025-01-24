import { useEffect, useState } from "react";
import DataPoint from "./DataPoint";
import { uniq } from 'lodash';
import './ChartTest.css';
const ChartTest = (props) => {
    const sortableProperties = ['Genre', 'Publisher'];
    const [sorter, setSorter] = useState('Publisher');
    const [patern, setPatern] = useState('bar');
    const [positions, setPositions] = useState([]);
    const getPattern = () => {
        let pat = '';
        switch(sorter){
            case 'Genre': {
                pat = 'bar';
                break;
            }
            case 'Publisher': {
                pat = 'bar';
                break;
            }
                
        }
        return pat;
    }
    const arrangePoints = () => {
        if (sortableProperties.includes(sorter)) {
            const valuesOfSorter = uniq(props.data.map(item => item[sorter]));
            const indexedValues = valuesOfSorter.map((item, index) => ({ item, index, count: 0 }));
            const posList = props.data.map(item => {
                const valueIndex = indexedValues.find((value, i) => item[sorter] === value.item).index;
                const listItem =  { ...item, paternIndex: valueIndex, paternPosition: indexedValues[valueIndex].count };
                indexedValues[valueIndex].count += 1;
                return listItem;
            });
            if (patern === 'bar'){
                const growVals = { x: 2, y: 10 };
                setPositions(posList.map(item => ({ ...item, x: item.paternPosition * growVals.x, y: item.paternIndex * growVals.y })))
            }
        }
    }
    useEffect(() => {
        setPatern(getPattern());
        arrangePoints();
    }, [sorter]);
    return (<div
            className="chart-container"
            onClick={() => setSorter('Genre')}
        >
        {positions.map(item => <DataPoint data={item} x={item.x} y={item.y} />)}
    </div>)
}
export default ChartTest;