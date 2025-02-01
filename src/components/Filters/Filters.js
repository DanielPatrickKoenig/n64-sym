import './Filters.css';
import Checkboxes from '../Checkboxes/Checkboxes';
import { useState } from 'react';
const Filters = (props) => {
    const [expandStates, setExpandStates] = useState(props.filterables.map(item => ({ name: item.name, open: false })));
    const toggleSection = (index) => {
        const tempStates = { ...expandStates };
        tempStates[index].open = !tempStates[index].open; 
        setExpandStates(tempStates);
    }
    const selectionHandler = ({ name, values }) => {
        props.onFiltered({ name, values })
    }
    return (
        <ul className="filters">
            <li class="heading"><h2>Filters</h2></li>
            {props.filterables.map((item, valueIndex) => (
                <li>
                    <a
                        className="filter-section-toggle"
                        onClick={() => {toggleSection(valueIndex)}}
                    >
                        {item.name}
                    </a>
                    <div style={{ display: expandStates[valueIndex].open ? 'block' : 'none' }}>
                        <Checkboxes
                            values={item.values}
                            name={item.name}
                            onSelection={selectionHandler}
                        />
                    </div>
                </li>
            ))}
        </ul>
    )
}
export default Filters;