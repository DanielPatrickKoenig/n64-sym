import './Filters.css';
import Checkboxes from '../Checkboxes/Checkboxes';
const Filters = (props) => {
    const selectionHandler = ({ name, values }) => {
        props.onFiltered({ name, values })
    }
    return (
        <ul>
            {props.filterables.map(item => (
                <li>
                    <p>{item.name}</p>
                    <Checkboxes
                        values={item.values}
                        name={item.name}
                        onSelection={selectionHandler}
                    />
                </li>
            ))}
        </ul>
    )
}
export default Filters;