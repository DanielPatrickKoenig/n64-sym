import { useEffect, useState } from 'react';
import './DataPoint.css'
import gsap from 'gsap';
const DataPoint = (props) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const tempPos = { ...position };
        gsap.to(tempPos, {
            duration: 1,
            x: props.x
        });
        gsap.to(tempPos, {
            duration: 1,
            y: props.y,
            onUpdate: () => {
                setPosition({ x: tempPos.x, y: tempPos.y });
            }
        });
    }, [props.x, props.y]);
    return (<div
        className="data-point"
        style={{left: `${position.x}%`, top: `${position.y}%`}}
    >
        A
    </div>)
};
export default DataPoint;