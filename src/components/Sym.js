import N64Sym from "../sym/N64Sym";
import './Sym.css';
import { useEffect, useRef } from "react";
const Sym = (props) => {
    const symRef = useRef(null);
    useEffect(() => {
        if (!symRef.current.querySelector('canvas')){
            new N64Sym(symRef.current);
        }
    }, [props.ready]);
    return (<div
        ref={symRef}
        className="game-sym"
    >
        HELLO
    </div>);
}
export default Sym;