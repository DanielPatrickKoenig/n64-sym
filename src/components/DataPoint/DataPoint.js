import { useEffect, useState } from 'react';
import './DataPoint.css'
import gsap, { Sine } from 'gsap';
const DataPoint = (props) => {
    const [xPos, setXPos] = useState(50);
    const [yPos, setYPos] = useState(50);
    const totalDuration = 2;
    const [xDuration, setXDuration] = useState((totalDuration * .25) + (totalDuration * Math.random() * .5));
    const [yDuration, setYDuration] = useState((totalDuration * .25) + (totalDuration * Math.random() * .5));
    useEffect(() => {
        const xDurations = { startDuration: xDuration, endDuration: totalDuration - xDuration };
        const yDurations = { startDuration: yDuration, endDuration: totalDuration - yDuration };
        const tempPos = { x: xPos, y: yPos };
        gsap.to(tempPos, {
            duration: xDurations.startDuration,
            ease: Sine.easeInOut,
            x: Math.random() * 100,
            onUpdate: () => {
                setXPos(tempPos.x);
                setYPos(tempPos.y);
            },
            onComplete: () => {
                gsap.to(tempPos, {
                    duration: xDurations.endDuration,
                    ease: Sine.easeInOut,
                    x: props.x,
                    onUpdate: () => {
                        setXPos(tempPos.x);
                        setYPos(tempPos.y);
                    }
                });
            }
        });
        gsap.to(tempPos, {
            duration: yDurations.startDuration,
            ease: Sine.easeInOut,
            y: Math.random() * 100,
            onUpdate: () => {
                setXPos(tempPos.x);
                setYPos(tempPos.y);
            },
            onComplete: () => {
                gsap.to(tempPos, {
                    duration: yDurations.endDuration,
                    ease: Sine.easeInOut,
                    y: props.y,
                    onUpdate: () => {
                        setXPos(tempPos.x);
                        setYPos(tempPos.y);
                    }
                });
            }
        });
    }, [props.x, props.y]);
    return (<div
        className="data-point"
        style={{left: `${xPos}%`, top: `${yPos}%`}}
    >
        A
    </div>)
};
export default DataPoint;