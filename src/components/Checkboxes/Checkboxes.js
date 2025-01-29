import { useState } from "react"

const CheckboxGroup = (props) => {
    const [selectedValues, setSelectedValues] = useState([...new Array(props.values.length).keys()].map(() => false));
    const onCheckChange = (e) => {
        const selectedValue = e.target.value;
        console.log(selectedValue);
        const tempValues = selectedValues.map((item, index) =>
            Number(index) === Number(selectedValue) ? !item : item
        );
        setSelectedValues(tempValues);
        props.onSelection({ name: props.name, values: tempValues.map((item, index) => ({ item, index })).filter(item => item.item).map(item => props.values[item.index]) });
    }
    return (<ul>
        {selectedValues.map((n, i) => (
            <li>
                <input
                    type="checkbox"
                    value={i}
                    checked={n}
                    onChange={onCheckChange}
                />
                <label>{props.values[i]}</label>
            </li>
        ))}
    </ul>)
}
export default CheckboxGroup;