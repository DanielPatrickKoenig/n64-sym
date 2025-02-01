import './SorterMenu.css';
const SorterMenu = (props) => {
    return (
        <ul className="sorters">
            <li class="heading"><h2>Sorters</h2></li>
            {props.sorters.map((item, index) => (
                <li key={index}>
                    <button onClick={() => props.onSelectSorter(item)}>{item.name}</button>
                </li>
            ))}
        </ul>
    )
}
export default SorterMenu;