const SorterMenu = (props) => {
    return (
        <ul>
            {props.sorters.map((item, index) => (
                <li key={index}>
                    <button onClick={() => props.onSelectSorter(item)}>{item.name}</button>
                </li>
            ))}
        </ul>
    )
}
export default SorterMenu;