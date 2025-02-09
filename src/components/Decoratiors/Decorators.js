import { Fragment } from "react"
import './Decorators.css';
const Decorators = (props) => {
    return (
        <Fragment>
            {props.patern === 'time' && props.labels.map(item => (
                <div
                    className="decoration-time-marker"
                    style={{left: `${item.x}%`}}
                />
            ))}
        </Fragment>
    )
}

export default Decorators;