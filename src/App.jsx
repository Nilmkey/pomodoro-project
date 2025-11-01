import './App.css'
import React, {useEffect} from "react";
import Timer from "./components/Timer.jsx";
import FinishSound from './assets/soundFinish.mp3';
import DropdownMenu from "./components/DropdownMenu.jsx";
import Button from "./components/Button.jsx";


function App() {

    const headerStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: "10px 20px",

    }

    const h2Style = {
        flexGrow: 1,
        textAlign: "center",
        margin: 0
    }

    let WORKTIME = 25*60;
    let BREAKTIME = 5*60;


    const [time, setTime] = React.useState(WORKTIME);
    const [isRunning, setIsRunning] = React.useState(false);
    const [isWorktime, setIsWorktime] = React.useState(true);
    const timerRef = React.useRef(null);
    const soundRef = React.useRef(null);
    const [theme, setTheme] = React.useState(localStorage.getItem('theme') || 'default');


    function toggleTheme(them) {
        console.log('Тема переключается...');
        setTheme(them);
    }

    function changeWorktime(){
        WORKTIME = Number(prompt("Количество минут работы:"))*60;
        BREAKTIME = Number(prompt("Количество минут отдыха:"))*60;
        setTime(WORKTIME);
        setIsWorktime(true);
        setIsRunning(false);
    }

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem("theme", theme);
    }, [theme, setTheme]);


    function startBtn(){
        setIsRunning(true);
    }

    function stopBtn(){
        setIsRunning(false);
    }
    //
    function resetBtn(){
        setTime(WORKTIME);
        setIsRunning(false);
    }

    function formatTime(time){
        const minutes = Math.floor(time/60);
        const hours = Math.floor(minutes/60);
        const remSec = time%60;

        console.log(time)

        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remSec.toString().padStart(2, "0")}`
    }

    function changeSession(isWork){
        soundRef.current.play();
        if(isWork){
            setIsWorktime(false);
        } else{
            setIsWorktime(true);
        }
    }

    useEffect(() => {
        timerRef.current = setInterval(()=>{
            if(isRunning){
                setTime((prev) => {
                    if(prev === 1){
                        changeSession(isWorktime);
                        return isWorktime ? BREAKTIME : WORKTIME;
                    } else{
                        return prev - 1;
                    }
                });
            }
        }, 1000);

        return () => {
            clearInterval(timerRef.current);
        }
    }, [isRunning, isWorktime, time]);

    return (
        <div className="container">
            <div style = {headerStyle}>
                <h2 style = {h2Style}>{isWorktime ? "Work Time" : "Break Time"}</h2>
                <DropdownMenu onSpace={() => {toggleTheme("space")}}
                              onOcean={() => {toggleTheme("ocean")}}
                              onForest={() => {toggleTheme("forest")}}
                              onDefault={() => {toggleTheme("default")}}
                              onSetting={changeWorktime}
                ></DropdownMenu>
            </div>
            <Timer text = {formatTime(time)}></Timer>

            <div className="buttons">
                <Button onClick={startBtn}>Старт</Button>
                <Button onClick={stopBtn}>Стоп</Button>
                <Button onClick={resetBtn}>Сбросить</Button>

            </div>

            <audio
                ref = {soundRef}
                src={FinishSound}
                preload = "auto"
            ></audio>

        </div>
    )
}

export default App
