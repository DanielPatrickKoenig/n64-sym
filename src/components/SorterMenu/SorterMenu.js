const SorterMenu = (props) => {
    const sorterList = [
        { name: 'Genre', patern: 'line' },
        { name: 'Publisher', patern: 'bar' },
        { name: 'Year_of_Release', patern: 'bar' }

    ];
    return (
        <ul>
            {sorterList.map(item => (
                <li>
                    <button onClick={() => props.onSelectSorter(item)}>{item.name}</button>
                </li>
            ))}
        </ul>
    )
}
export default SorterMenu;