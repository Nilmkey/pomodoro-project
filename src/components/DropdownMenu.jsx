import '../css/DropdownMenu.css'
import Icon from '../assets/settingsIcon.svg'


export default function DropdownMenu({onSpace, onOcean, onForest, onDefault}) {
    return (
        <div className="dropdown">
            <button className="dropbtn"><img src={Icon} alt="ffff"/></button>
            <div className="dropdown-content">
                <button onClick={onSpace}>Космос</button>
                <button onClick={onOcean}>Океан</button>
                <button onClick={onForest}>Выход</button>
                <button onClick={onDefault}>Выход</button>
            </div>
        </div>
    )
}