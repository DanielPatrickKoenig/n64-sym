// import { resolve } from "path";
import { useState, useEffect, useRef } from "react"

const CheckboxGroup = (props) => {
    const [selectedValues, setSelectedValues] = useState([...new Array(props.values.length).keys()].map(() => false));
    const [selectedValuesForConfirmation, setSelectedValuesForConfirmation] = useState([...new Array(props.values.length).keys()].map(() => false));
    const onCheckChange = (e) => {
        const selectedValue = e.target.value;
        const tempValues = selectedValues.map((item, index) =>
            Number(index) === Number(selectedValue) ? !item : item
        );
        setSelectedValues(tempValues);
        props.onSelection({ name: props.name, values: tempValues.map((item, index) => ({ item, index })).filter(item => item.item).map(item => props.values[item.index]) });
    }
    const onCheckChangeForConfirmation = (e) => {
        const selectedValue = e.target.value;
        const tempValues = selectedValuesForConfirmation.map((item, index) =>
            Number(index) === Number(selectedValue) ? !item : item
        );
        setSelectedValuesForConfirmation(tempValues);
        props.onSelectionForConfirmation({ name: props.name, values: tempValues.map((item, index) => ({ item, index })).filter(item => item.item).map(item => props.values[item.index]) })
    }
    const confirmSelections = () => {
        const tempValues = [...selectedValuesForConfirmation];
        setSelectedValues(tempValues);
        props.onSelection({ name: props.name, values: tempValues.map((item, index) => ({ item, index })).filter(item => item.item).map(item => props.values[item.index]) });
    }
    const confirmButton = useRef(null);
    useEffect(() => {
        confirmButton?.current?.click();
        const tempValues = [...selectedValuesForConfirmation];
        setSelectedValues(tempValues);
        props.onSelection({ name: props.name, values: tempValues.map((item, index) => ({ item, index })).filter(item => item.item).map(item => props.values[item.index]) });
        // const tempValues = [...selectedValuesForConfirmation];
        // setSelectedValues(tempValues);
        // props.onSelection({ name: props.name, values: tempValues.map((item, index) => ({ item, index })).filter(item => item.item).map(item => props.values[item.index]) });
        // setSelectedValuesForConfirmation(tempValues);
    }, [props.confirmationNumber])
    return (<ul className="check-box-list">
        {selectedValues.map((n, i) => (
            <li className={props.styleIndexes?.length ? props.styleIndexes[i] : ''}>
                <label className="non-confirmable-check">
                    <input
                        type="checkbox"
                        value={i}
                        checked={n}
                        onChange={onCheckChange}
                    />
                    <span>{props.values[i]}</span>
                </label>
                <label className="confirmable-check">
                    <input
                        type="checkbox"
                        value={i}
                        checked={selectedValuesForConfirmation[i]}
                        onChange={onCheckChangeForConfirmation}
                    />
                    <span>{props.values[i]}</span>
                </label>
            </li>
        ))}
        <li className="confirm-item">
            <button
                onClick={confirmSelections}
                ref={confirmButton}
            >
                CONFIRM
            </button>
        </li>
    </ul>)
}
export default CheckboxGroup;