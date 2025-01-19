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
            <circle r="4" fill="#cc0000" cx={plotToPath(patern, rat, true).x} cy={plotToPath(patern, rat, true).y} />
        </svg>
    )
}

export default PointTest;