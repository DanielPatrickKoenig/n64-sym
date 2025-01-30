import './MetricLabel.css';
const MetricLabel = (props) => {
    return (
        <div
            className={`metric-label ${props.patern} ${props.side}`}
            style={{left: `${props.x}%`, top: `${props.y}%`}}
        >
            <label>{props.label}</label>
        </div>
    )
}
export default MetricLabel;