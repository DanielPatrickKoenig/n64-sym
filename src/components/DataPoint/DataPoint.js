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
            onUpdateParams: [props.signature],
            onUpdate: (s) => {
                if (s === props.signature){
                    setXPos(tempPos.x);
                    setYPos(tempPos.y);
                }
            },
            onCompleteParams: [props.signature],
            onComplete: (s) => {
                if (s === props.signature){
                    gsap.to(tempPos, {
                        duration: xDurations.endDuration,
                        ease: Sine.easeInOut,
                        x: props.x,
                        onUpdateParams: [props.signature],
                        onUpdate: (s) => {
                            if (s === props.signature){
                                setXPos(tempPos.x);
                                setYPos(tempPos.y);
                            }
                        }
                    });
                }
            }
        });
        gsap.to(tempPos, {
            duration: yDurations.startDuration,
            ease: Sine.easeInOut,
            y: Math.random() * 100,
            onUpdateParams: [props.signature],
            onUpdate: (s) => {
                if (s === props.signature){
                    setXPos(tempPos.x);
                    setYPos(tempPos.y);
                }
            },
            onCompleteParams: [props.signature],
            onComplete: (s) => {
                if (s === props.signature){
                    gsap.to(tempPos, {
                        duration: yDurations.endDuration,
                        ease: Sine.easeInOut,
                        y: props.y,
                        onUpdateParams: [props.signature],
                        onUpdate: (s) => {
                            if (s === props.signature){
                                setXPos(tempPos.x);
                                setYPos(tempPos.y);
                            }
                        }
                    });
                }
            }
        });
    }, [props.x, props.y]);
    const onPointClicked = () => {
        if (props.marked) {
            props.onDataPointClicked();   
        }
    }
    return (<div
        className={`data-point ${props.marked ? 'marked' : ''}`}
        style={{left: `${xPos}%`, top: `${yPos}%`}}
        onClick={onPointClicked}
    />)
};
export default DataPoint;