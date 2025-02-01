import { useState } from "react"
import './AppHeader.css';

const AppHeader = () => {
    const [showFilters, setShowFilters] = useState(false);
    const [showSorters, setShowSorters] = useState(false);
    return (
        <header className={`app-header ${showFilters ? 'show-filters' : ''} ${showSorters ? 'show-sorters' : ''}`}>
            <h1>Particle Chart</h1>
            <button onClick={() => { setShowSorters(!showSorters); setShowFilters(false); }}>Sorters</button>
            <button onClick={() => { setShowFilters(!showFilters); setShowSorters(false); }}>Filters</button>
        </header>
    )
}

export default AppHeader;