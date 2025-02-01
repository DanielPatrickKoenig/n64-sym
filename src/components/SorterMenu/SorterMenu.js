import { useState } from 'react';
import './SorterMenu.css';
const SorterMenu = (props) => {
    const [selectedSorter, setSelectedSorter] = useState('');
    const onConfermableChange = (e) => {
        if (e.target.checked) {
            const tempSelector = e.target.value;
            setSelectedSorter(tempSelector);
        }
    }
    const onConfirm = () => {
        const sorterIndex = props.sorters.findIndex(item => item.name === selectedSorter);
        props.onSelectSorter(props.sorters[sorterIndex]);
    }
    return (
        <ul className="sorters">
            <li class="heading"><h2>Sorters</h2></li>
            {props.sorters.map((item, index) => (
                <li key={index}>
                    <button 
                        onClick={() => props.onSelectSorter(item)}
                        className="sorter-btn"
                    >
                        {item.name}
                    </button>
                    <label>
                        <input
                            type="radio"
                            name="sorter"
                            value={item.name}
                            checked={selectedSorter === item.name}
                            onChange={onConfermableChange}
                        />
                        {item.name}
                    </label>
                </li>
            ))}
            <li className="confirm-item">
                <button onClick={onConfirm}>
                    Confirm
                </button>
            </li>
        </ul>
    )
}
export default SorterMenu;