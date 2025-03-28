import './MetricSelector.css';
const MetricSelector = (props) => {
    const metricSelected = (index) => {
        props.onMetricSelected(index);
    }
    return (
        <div className="metric-selector">
            {props.metrics.map((item, index) => (
                <button
                    className={props.metricIndex === index ? 'selected' : ''}
                    key={index}
                    onClick={() => metricSelected(index)}
                >
                    {item.join ? item.map(lbl => lbl.split('_').join(' ')).join(' / ') : item.split('_').join(' ')}
                </button>
            ))}
        </div>
    );
}
export default MetricSelector;