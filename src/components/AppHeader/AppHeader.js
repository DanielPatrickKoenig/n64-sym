import { useEffect, useState } from "react"
import './AppHeader.css';
import FilterIcon from "../FilterIcon/FilterIcon";
import MetricsIcon from "../MetricsIcon/MetricsIcon";

const AppHeader = (props) => {
    const [showFilters, setShowFilters] = useState(false);
    const [showSorters, setShowSorters] = useState(false);
    const filterCount = () => {
        return Object.keys(props.filters).map(item => props.filters[item].length).reduce((t, item) => item + t, 0);
    }
    useEffect(() => {
        console.log('CHANGE');
        setShowSorters(false);
        setShowFilters(false);
    },[props.filter, props.sorter, props.count]);
    return (
        <header className={`app-header ${showFilters ? 'show-filters' : ''} ${showSorters ? 'show-sorters' : ''}`}>
            <h1>Particle Chart</h1>
            <button onClick={() => { setShowSorters(!showSorters); setShowFilters(false); }}>
                <MetricsIcon />
                <span>METRICS</span>
            </button>
            <button onClick={() => { setShowFilters(!showFilters); setShowSorters(false); }}>
                <FilterIcon />
                <span>FILTERS</span>
                {filterCount() > 0 && <span
                    className="filter-count"
                >
                    {filterCount()}
                </span>}
            </button>
            {props.children}
        </header>
    )
}

export default AppHeader;