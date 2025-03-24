import { useState } from 'react';
import './SorterMenu.css';
const SorterMenu = (props) => {
    const [selectedSorter, setSelectedSorter] = useState('');
    const [selectedButton, setSelectedButton] = useState({});
    const sorterButtonClicked = (value) => {
        setSelectedButton(value);
        props.onSelectSorter(value);
    }
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
            {props.sorters.filter(item => item.label).map((item, index) => (
                <li key={index}>
                    <button 
                        onClick={() => sorterButtonClicked(item)}
                        className={`sorter-btn ${item === selectedButton ? 'sorter-btn-selected' : ''}`}
                    >
                        {item.label}
                    </button>
                    <label>
                        <input
                            type="radio"
                            name="sorter"
                            value={item.name}
                            checked={selectedSorter === item.name}
                            onChange={onConfermableChange}
                        />
                        {item.label}
                    </label>
                </li>
            ))}
            <li className="confirm-item">
                <button
                    onClick={onConfirm}
                    className="btn"
                >
                    Confirm
                </button>
            </li>
        </ul>
    )
}
export default SorterMenu;