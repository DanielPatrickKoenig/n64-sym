import { plotToPath, plotToPaths } from "../../engine/utils/Utilities";
const PointTest = () => {
    const patern = [
        {
            x: 30,
            y: 0
        },
        {
            x: 10,
            y: 50
        },
        {
            x: 0,
            y: 50
        }
    ];
    const patern2 = [
        {
            x: 40,
            y: 0
        },
        {
            x: 60,
            y: 50
        },
        {
            x: 70,
            y: 50
        }
    ];
    const patern3 = [
        {
            x: 35,
            y: 0
        },
        {
            x: 35,
            y: 40
        }
    ];
    // plotToPaths([patern, patern2, patern3], .5);
    const rat = .4;
    return (
        <svg>
            {patern.map(item => (
                <circle
                    r="3"
                    fill="#000000"
                    cx={item.x}
                    cy={item.y}
                />
            ))}
            {patern2.map(item => (
                <circle
                    r="3"
                    fill="#000000"
                    cx={item.x}
                    cy={item.y}
                />
            ))}
            {[0.000000001,.1,.2,.3,.4,.5,.6,.7,.8,.9, 1].map(item => (<circle r="4" fill="#cc0000" cx={plotToPaths([patern, patern2, patern3], item).x} cy={plotToPaths([patern, patern2, patern3], item).y} />))}
            {/* {[0.000000001,.1,.2,.3,.4,.5,.6,.7,.8,.9, 1].map(item => (<circle r="4" fill="#cc0000" cx={plotToPath(patern, item, true).x} cy={plotToPath(patern, item, true).y} />))} */}
        </svg>
    )
}

export default PointTest;