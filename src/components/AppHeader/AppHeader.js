import { useEffect, useState } from "react"
import './AppHeader.css';

const AppHeader = (props) => {
    const [showFilters, setShowFilters] = useState(false);
    const [showSorters, setShowSorters] = useState(false);
    useEffect(() => {
        console.log('CHANGE');
        setShowSorters(false);
        setShowFilters(false);
    },[props.filter, props.sorter, props.count]);
    return (
        <header className={`app-header ${showFilters ? 'show-filters' : ''} ${showSorters ? 'show-sorters' : ''}`}>
            <h1>Particle Chart</h1>
            <button onClick={() => { setShowSorters(!showSorters); setShowFilters(false); }}>Sorters</button>
            <button onClick={() => { setShowFilters(!showFilters); setShowSorters(false); }}>Filters</button>
        </header>
    )
}

export default AppHeader;