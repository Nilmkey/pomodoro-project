import '../css/Button.css';

export default function Button({children, onClick}) {
    return(
        <button onClick={onClick} className="btn" style={{ color: "var(--text-color)" }}>{children}</button>
    )
}