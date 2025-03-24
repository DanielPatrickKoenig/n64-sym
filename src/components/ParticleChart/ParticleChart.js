import { useEffect, useState } from "react";
import DataPoint from "../DataPoint/DataPoint";
import { uniq, flatten } from 'lodash';
import { generateID } from '../../utils/Utilities';
import SorterMenu from "../SorterMenu/SorterMenu";
import Filters from "../Filters/Filters";
import { plotToPaths } from "../../utils/Utilities";
import './ParticleChart.css';
import MetricLabel from "../MetricLabel/MetricLabel";
import AppHeader from '../AppHeader/AppHeader';
import Decorators from "../Decoratiors/Decorators";
import SearchDataPoints from '../SearchDataPoints/SearchDataPoints';
import DetailModal from "../DetailModal/DetailModal";
import MetricSelector from "../MetricSelector/MetricSelector";
const ParticleChart = (props) => {
    const sortablePaterns = props.data.sortables;
    const singlePatterns = props.data.singles;
    const customSortablePaterns = props.data.custom.sortables;
    const customSinglePaterns = props.data.custom.singles;
    const introSorters = props.data.sorters.filter(item => item.intro);
    const nonIntroSorters = props.data.sorters.filter(item => item.label);
    const [valueMetrics, setValueMetrics] = useState(props.data.valueMetrics);
    const [activeFilters, setActiveFilters] = useState({});
    const [sorter, setSorter] = useState(introSorters[0].name);
    const [patern, setPatern] = useState(introSorters[0].patern);
    const [positions, setPositions] = useState([]);
    const [motionSignature, setMotionSignature] = useState('empty');
    const [labels, setLabels] = useState([]);
    const [mainLabelToggle, setMainLabelToggle] = useState(1);
    const [searchMarks, setSearchMarks] = useState([]);
    const [activeDetail, setActiveDetail] = useState(null);
    const [introStart, setIntroStarted] = useState(false);
    const [endIntro, setEndIntro] = useState(false);
    const [metricIndex, setMetricIndex] = useState(0);
    const [metricFormulas, setMetricFormulas] = useState([]);
    const sorterHandler = (item) => {
        setSorter(item.name);
        setPatern(item.patern);
        if (item.metrics) {
            setValueMetrics(item.metrics);
        }
        else{
            setValueMetrics([]);
        }
        if (item.metricFormulas) {
            setMetricFormulas(item.metricFormulas);
        }
        else {
            setMetricFormulas([]);
        }
    }
    const filterables = () => {
        return props.data.filters.map(item => {
            return {
                name: item,
                values: uniq(props.data?.dataset.map(_item => _item[item]))
            }
        });
    }
    const filterHandler = ({ name, values }) => {
        const tempFilters = { ...activeFilters };
        tempFilters[name] = values;
        setActiveFilters(tempFilters);
    }
    const filteredData = () => {
        const rawData = props.data?.dataset ? props.data?.dataset : props.data;
        return rawData.filter(item => {
            const activeFilterNames =  Object.keys(activeFilters);
            const filterChecks = Object.keys(activeFilters).filter(_item => {
                return !activeFilters[_item].length || activeFilters[_item].includes(item[_item]);
            });
            return !activeFilterNames.length || filterChecks.length === activeFilterNames.length;
        });
    }
    const searchMarkHandler = (values) => {
        setSearchMarks(values)
    }
    const shouldShowLabels = () => {
        return customSortablePaterns.map(item => item.name).includes(patern) || 
            sortablePaterns.includes(patern) ||
            singlePatterns.includes(patern);
    }
    const dataPointClickHandler = (data) => {
        setActiveDetail(data);
    }
    const arrangePoints = () => {
        setMainLabelToggle(mainLabelToggle % 2 === 0 ? 1 : 2);
        setMotionSignature(generateID());
        let currentMetricFormula = 'sum';
        if (metricFormulas && metricFormulas[metricIndex]) {
            currentMetricFormula = metricFormulas[metricIndex];
        }
        const valuesOfSorter = uniq(filteredData().map(item => item[sorter]));
        const valueLabelsWithGroups = valuesOfSorter.map(value => `${value} (${filteredData().filter(item => item[sorter] === value).length})`)
        // setLabels(valuesOfSorter);
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
                setPositions(posList.map(item => ({ ...item, x: item.paternPosition * growVals.x, y: (item.paternIndex * growVals.y) + (growVals.y * .5) })))
                setLabels(valueLabelsWithGroups.map((item, index) => ({ name: item, x: -2, y: (index * growVals.y) + (growVals.y * .5)})));
            }
            if (patern === 'line'){

                const growVals = { x: growValIndexAxis, y: growValPositionAxis };
                setPositions(posList.map(item => ({ ...item, x: (item.paternIndex * growVals.x) + (growVals.x * .5), y: 100 - (item.paternPosition * growVals.y) })))
                setLabels(valueLabelsWithGroups.map((item, index) => ({ name: item, x: (index * growVals.x) + (growVals.x * .5), y: 100 })));
            }
        }
        else if (singlePatterns.includes(patern)) {
            if (patern === 'time') {
                const lines = [valueMetrics[metricIndex]].map(metric => {
                    const sortedValues = valuesOfSorter.map(item => ({ item, number: Number(item) })).sort((a, b) => a.number - b.number);
                    // console.log(sortedValues);
                    const pointPrimatives = sortedValues.map((item, index) => {
                        console.log('point primative value', filteredData().filter(_item => item.item === _item[sorter]));
                        const x = index;
                        const calculateY = (fData, currentMetric, formula) => {
                            const processedDada = fData.filter(_item => item.item === _item[sorter]);
                            const rawY = processedDada.reduce((t, _item) => _item[currentMetric] + t, 0);
                            let output = rawY;
                            if (formula === 'average') {
                                output = rawY / processedDada.length;
                            }
                            return output;
                        }
                        const y = calculateY(filteredData(), metric, currentMetricFormula);
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
                setPositions(filteredData().map((item, index, arr) => ({ ...item, ...plotToPaths(lines, (index === 0 ? .000000001 : index) / arr.length) })));
                setLabels(valuesOfSorter.map((item, index) => ({ name: item, x: lines[0][index].x, y: 100 })));
            }
            else if (patern === 'scatter') {
                const [ xMetric, yMetric ] = valueMetrics[metricIndex].join ? valueMetrics[metricIndex] : valueMetrics;
                const lowestX = [...filteredData()].sort((a, b) => a[xMetric] - b[xMetric])[0][xMetric];
                const lowestY = [...filteredData()].sort((a, b) => a[yMetric] - b[yMetric])[0][yMetric];
                const highestX = [...filteredData()].sort((a, b) => b[xMetric] - a[xMetric])[0][xMetric] - lowestX;
                const highestY = [...filteredData()].sort((a, b) => b[yMetric] - a[yMetric])[0][yMetric] - lowestY;
                console.log(lowestX, lowestY);
                console.log(highestX, highestY);
                const positions = filteredData().map(item => ({ ...item, x: ((item[xMetric] - lowestX) / highestX) * 100, y: 100 - (((item[yMetric] - lowestY) / highestY) * 100) }))
                console.log(positions);
                setPositions(positions);
                setLabels([xMetric, yMetric].map((item, index) => ({ name: item, x: index === 0 ? 50 : 0, y: index === 0 ? 100 : 50 })));
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
            const shiftedPatern = cPatern.map(item => item.map(_item => ({ ...item, x: ((_item.x - (xDist + lowestX)) * (40 / highestValue)) + 50, y: ((_item.y - (yDist + lowestY)) * (40 / highestValue)) + 50 })))
            setPositions(filteredData().map((item, index, arr) => ({ ...item, ...plotToPaths(shiftedPatern, (index === 0 ? .000000001 : index) / arr.length) })));
            console.log(shiftedPatern);
        }
        else if (customSortablePaterns.find(item => item?.name === patern)) {
            let paternPosition = { x: 0, y: 0 };
            const groupedPoints = valuesOfSorter.map((value, vIndex) => {
                const datsPoints = filteredData().filter(item => item[sorter] === value);
                const sizeRatio = datsPoints.length / filteredData().length;
                const scaledPatern = customSortablePaterns.find(item => item.name === patern).patern.map(item => item.map(_item => ({ x: (_item.x * sizeRatio * 8.25), y: (_item.y * sizeRatio * 8.25) })));
                const flattenedPattern = uniq(scaledPatern);
                const lowestY = flatten(flattenedPattern).sort((a, b) => a.y - b.y)[0].y;
                const lowestX = flatten(flattenedPattern).sort((a, b) => a.x - b.x)[0].x;
                const highestY = flatten(flattenedPattern).sort((a, b) => b.y - a.y)[0].y;
                const highestX = flatten(flattenedPattern).sort((a, b) => b.x - a.x)[0].x;
                const xDist = (highestX - lowestX) / 2;
                const shiftedPatern = scaledPatern.map(item => item.map(_item => ({ ...item, x: (_item.x - (xDist + lowestX)) + paternPosition.x + 50 + (vIndex % 2 === 0 ? (highestX / 2) + 2 : ((highestX / 2) + 2) * -1), y: _item.y + paternPosition.y })))
                console.log(highestX);
                // paternPosition.x += highestX + 1;
                paternPosition.y += highestY + 1;
                return { points: datsPoints, patern: shiftedPatern, lowestY, lowestX, highestY, highestX, sorter: value };
            });
            let mergedPatren = [];
            let mergedPoints = [];
            console.log(groupedPoints);
            groupedPoints.forEach(item => {
                // console.log(item.points);
                console.log('groupedPoints map', item);
                mergedPatren = [...mergedPatren, ...item.patern];
                mergedPoints = [...mergedPoints, ...item.points];
                // console.log(groupedPoints);
                
            });
            const groupedLabelsWithValues = groupedPoints.map(item => `${item.sorter} (${item.points.length})`)
            console.log(mergedPoints);
            console.log(mergedPatren);
            setPositions(mergedPoints.map((item, index, arr) => ({ ...item, ...plotToPaths(mergedPatren, (index === 0 ? .000000001 : index) / arr.length) })));
            
            setLabels(groupedLabelsWithValues.map((item, index) => {
                const sortedPaternX = flatten(groupedPoints[index].patern).sort((a, b) => a.x - b.x);
                const sortedPaternY = flatten(groupedPoints[index].patern).sort((a, b) => a.y - b.y);
                return ({ 
                    name: item, 
                    x: sortedPaternX[0].x > 50 ? sortedPaternX[sortedPaternX.length - 1].x : sortedPaternX[0].x, 
                    y: sortedPaternY[0].y + ((sortedPaternY[sortedPaternY.length - 1].y - sortedPaternY[0].y) / 2),
                    side: sortedPaternX[0].x > 50 ? 'custom-left' : 'custom-right',
                });
            }));
            // setPositions(filteredData().map((item, index, arr) => plotToPaths(item.patern, (index === 0 ? .000000001 : index) / arr.length)));
            // console.log(mergedPoints);
            // const indexedValues = valuesOfSorter.map((item, index) => ({ item, index, count: 0 }));
        }
    }
    const runIntro = async () => {
        const combinedSorters = [...introSorters, ...nonIntroSorters]
        if (introSorters.length > 1) {
            for(let i = 1; i < combinedSorters.length; i++){
                await new Promise(resolve => setTimeout(resolve, 3500));
                if (!endIntro) {
                    setSorter(combinedSorters[i].name);
                    setPatern(combinedSorters[i].patern);
                    if (combinedSorters[i].metrics) {
                        setValueMetrics(combinedSorters[i].metrics);
                    }
                }
            }
        }
        setEndIntro(true);
    }
    useEffect(() => {
        arrangePoints();
        if(!introStart){
            setIntroStarted(true);
            runIntro();

        }
    }, [sorter, patern, activeFilters, metricIndex]);
    return (
        <div className={`particle-chart ${endIntro ? 'intro-ended' : ''}`}>
            <AppHeader
                filters={activeFilters}
                sorter={sorter}
                count={positions.length}
            >
                <SearchDataPoints
                    onMarked={searchMarkHandler}
                    dataset={props.data?.dataset}
                />
            </AppHeader>
            {props.data.sorters.map(item => (
                <h2 className={`particle-chart-header ${item.name === sorter ? 'current-info-header' : 'hidden-info-header'} ${shouldShowLabels() ? 'has-labels' : 'has-no-babels'}`}>{item.name}</h2>
            ))}
            <SorterMenu
                onSelectSorter={sorterHandler}
                sorters={props.data.sorters}
            />
            <div className={`outer-chart outer-chart-${patern}`}>
                <div
                    className={`chart-container ${patern}`}
                >
                    {positions.map(item => (
                        <DataPoint 
                            data={item}
                            marked={searchMarks.includes(item.Name)}
                            x={item.x}
                            y={item.y}
                            onDataPointClicked={() => dataPointClickHandler(item)}
                            signature={motionSignature}
                        />
                    ))}
                    {shouldShowLabels() && 
                        labels.map(item => (
                            <MetricLabel
                                label={item.name}
                                patern={patern}
                                x={item.x}
                                y={item.y}
                                side={item.side}
                            />
                        ))}
                    <Decorators
                        labels={labels}
                        patern={patern}
                    />
                </div>
            </div>
            <Filters
                filterables={filterables()}
                onFiltered={filterHandler}
            />
            {activeDetail && (
                <DetailModal
                    data={activeDetail}
                    onDismiss={() => setActiveDetail(null)}
                />
            )}
            {valueMetrics?.length && (
                <MetricSelector
                    metrics={valueMetrics}
                    onMetricSelected={(index) => setMetricIndex(index)}
                    metricIndex={metricIndex}
                />
            )}
        </div>
    )
}
export default ParticleChart;