import './ErrorModal.css';

const ErrorModal = (props) => {
    return (<div className="overlay overlay-error">
        <div className="modal modal-error">
            <h2>{props.headline}</h2>
            <p>{props.message}</p>
            <button onClick={props.onClose}>CLOSE</button>
        </div>
    </div>);
}

export default ErrorModal;