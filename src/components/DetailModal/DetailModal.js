import './DetailModal.css';
const DetailModal = (props) => {
    const dismissModal = () => {
        props.onDismiss();
    }
    return (
        <div className="detail-modal">
            <divv class="inner-detail-modal">
                <h2>{props.data.Name}</h2>
                <table>
                    {Object.keys(props.data).filter(item => !['Name', 'x', 'y', 'paternIndex', 'paternPosition'].includes(item)).map(item => (
                        <tr>
                            <td>
                                {item}
                            </td>
                            <td>
                                {props.data[item]}
                            </td>
                        </tr>
                    ))}
                </table>
                <button className="btn" onClick={dismissModal}>Close</button>
            </divv>
        </div>
    )
}

export default DetailModal;