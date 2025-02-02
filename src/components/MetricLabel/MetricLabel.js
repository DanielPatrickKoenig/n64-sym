import { useEffect, useState } from 'react';
import './MetricLabel.css';
const MetricLabel = (props) => {
    const [toggleValue, setToggleValue] = useState(1);
    useEffect(() => {
        setToggleValue(toggleValue === 1 ? 2 : 1);
    }, [props.patern]);
    return (
        <div
            className={`metric-label metric-label-${toggleValue} ${props.patern} ${props.side}`}
            style={{left: `${props.x}%`, top: `${props.y}%`}}
        >
            <label>{props.label}</label>
        </div>
    )
}
export default MetricLabel;