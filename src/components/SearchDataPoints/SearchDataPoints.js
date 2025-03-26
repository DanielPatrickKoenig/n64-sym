import { Fragment, useState } from 'react';
import './SearchDataPoints.css';
import { flatten } from 'lodash';
import Checkboxes from '../Checkboxes/Checkboxes';
const SearchDataPoints = (props) => {
    const [showSearch, setShowSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selections, setSelection] = useState([]);
    const toggleSearch = () => {
        setShowSearch(!showSearch);
    }
    const onSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }
    const selectionHandler = ({ name, values }) => {
        setSelection(values);
        props.onMarked(flatten([...values]));
        console.log(values);
    }
    const selectionHandlerForConfirmation = () => {
        
    }
    return (
        <div className="search-data-points">
            <input
                type="text"
                placeholder="search"
                className={`search-field ${showSearch ? '' : 'is-hiedden'}`}
                onChange={onSearchChange}
            />
            <Checkboxes
                values={props.dataset.map(item => item.Name)}
                styleIndexes={props.dataset.map(item => item.Name.toLowerCase().includes(searchTerm.toLowerCase()) ? 'vidible-row' : 'hidden-row')}
                name="names"
                onSelection={selectionHandler}
                onSelectionForConfirmation={selectionHandlerForConfirmation}
                resetIndex={props.resetIndex}
            />
            <a
                className="activate-button"
                onClick={toggleSearch}
            >
                <i />
                <span>SEARCH</span>
            </a>
        </div>
    )
}

export default SearchDataPoints;