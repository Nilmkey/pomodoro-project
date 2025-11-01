import '../css/DropdownMenu.css'
import Icon from '../assets/settingsIcon.svg'


export default function DropdownMenu({onSpace, onOcean, onForest, onDefault, onSetting}) {
    return (
        <div className="dropdown">
            <button className="dropbtn"><img src={Icon} alt="ffff"/></button>
            <div className="dropdown-content">
                <button onClick={onSpace}>Космос</button>
                <button onClick={onOcean}>Океан</button>
                <button onClick={onForest}>Лес</button>
                <button onClick={onDefault}>Дефолт</button>
                <button onClick={onSetting}>Настройки</button>
            </div>
        </div>
    )
}