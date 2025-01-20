import { plotToPath } from "../../engine/utils/Utilities";
const PointTest = () => {
    const patern = [
        {
            x: 20,
            y: 30
        },
        {
            x: 70,
            y: 20
        },
        {
            x: 45,
            y: 120
        }
    ];
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
            {[0.000000001,.1,.2,.3,.4,.5,.6,.7,.8,.9, 1].map(item => (<circle r="4" fill="#cc0000" cx={plotToPath(patern, item, true).x} cy={plotToPath(patern, item, true).y} />))}
        </svg>
    )
}

export default PointTest;