import React, { useState } from "react";
import { Button, Popover, OverlayTrigger } from "react-bootstrap";
import Lists from "./Lists";
import Signature from "./signature";

const popover = (
  <Popover id="popover-basic">
    <Popover.Header as="h3" style={{ backgroundColor: "#ff9068", color: "white" }}>
      What is 25 + 5?
    </Popover.Header>
    <Popover.Body>
      Breakdown your work into intervals (e.g. 25 minutes) to boost your <strong>productivity.</strong>
      <br />
      Take a short break of 5 to 10 minutes, and repeat.
      <br />
      Additionally, you can set a list of goals to achieve.
    </Popover.Body>
  </Popover>
);
// const sound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-bonus-extra-in-a-video-game-2064.mp3");
function App() {
  const [breakIni, setBreakIni] = useState(5);
  const [sessionIni, setSessionIni] = useState(25);
  const [display, setDisplay] = useState(sessionIni * 60);
  const [, setSessionTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [title, setTitle] = useState("Session");
  const [isTimerOn, setIsTimerOn] = useState(false);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [intervalID, setIntervalID] = useState("");
  const playSound = () => {
    const s = document.getElementById("beep");
    s.currentTime = 0;
    s.play();
  };
  const stopSound = () => {
    const s = document.getElementById("beep");
    s.pause();
    s.currentTime = 0;
  };
  const handleTime = () => {
    setIsOnBreak(!isOnBreak);
    let date = new Date().getTime();
    let nextDate = date + 1000;
    if (!isTimerOn) {
      setIntervalID(
        setInterval(() => {
          date = new Date().getTime();
          if (date > nextDate) {
            setDisplay((time) => {
              return time - 1;
            });
            nextDate += 1000;
          }
        }, 1000)
      );

      localStorage.clear();
      localStorage.setItem("interval", intervalID);
    }
    if (isTimerOn) {
      clearInterval(intervalID);
      clearInterval(localStorage.getItem("interval"));
    }
    setIsTimerOn(!isTimerOn);
  };
  const resetTime = () => {
    setSessionIni(25);
    setBreakIni(5);
    setDisplay(1500);
    setBreakTime(5 * 60);
    setSessionTime(60 * 5);
    setTitle("Session");
    setIsTimerOn(false);
    setIsOnBreak(false);

    if (intervalID) {
      clearInterval(intervalID);
      localStorage.clear();
    }
    stopSound();
  };
  const handleSession = (e) => {
    if (!isTimerOn) {
      if (e.currentTarget.value === "+") {
        setSessionIni(sessionIni + 1);
        if (sessionIni === 60) {
          setSessionIni(60);
        }
      } else if (e.currentTarget.value === "-") {
        setSessionIni(sessionIni - 1);
        if (sessionIni === 1) {
          setSessionIni(1);
        }
      }
    }
  };
  const handleBreak = (e) => {
    if (!isTimerOn) {
      if (e.currentTarget.value === "+") {
        setBreakIni(breakIni + 1);
        if (breakIni === 60) {
          setBreakIni(60);
        }
      } else if (e.currentTarget.value === "-") {
        setBreakIni(breakIni - 1);
        if (breakIni === 1) {
          setBreakIni(1);
        }
      }
    }
  };
  const timeFormat = () => {
    let minute = Math.floor(display / 60);
    let second = display % 60;
    second = second < 10 ? "0" + second : second;
    minute = minute < 10 ? "0" + minute : minute;
    return minute + ":" + second;
  };
  React.useEffect(() => {
    resetTime();
  }, []);
  React.useEffect(() => {
    if (display === 0) {
      playSound();
      setIsOnBreak(!isOnBreak);
      isOnBreak ? setTitle("Break") : setTitle("Session");
      isOnBreak ? setDisplay(breakIni * 60) : setDisplay(sessionIni * 60);
    }
  }, [display]);
  React.useEffect(() => {
    setSessionTime(sessionIni * 60);
    setBreakTime(breakIni * 60);
    setDisplay(sessionIni * 60);
  }, [sessionIni, breakIni]);
  return (
    <div className="main">
      <div className="app shadow-lg">
        <div className="app-display">
          <audio
            src="https://assets.mixkit.co/sfx/preview/mixkit-bonus-extra-in-a-video-game-2064.mp3"
            id="beep"
          ></audio>
          <div id="display-title">
            <h2 className="">
              {" "}
              <i class="bi bi-clock-history mx-2"></i>25 + 5 Clock
            </h2>
            <OverlayTrigger trigger="focus" placement="bottom" overlay={popover} data-bs-trigger="focus">
              <Button variant="none" className="info">
                <i className="bi bi-question-circle"></i>
              </Button>
            </OverlayTrigger>
          </div>
          <p id="timer-label">{title}</p>
          <p id="time-left">{timeFormat()}</p>
          <div className="buttons-display rounded-pill">
            <button className="btn" id="start_stop" onClick={handleTime}>
              {!isTimerOn ? <i className="bi bi-play-fill"></i> : <i className="bi bi-pause-circle-fill"></i>}
            </button>

            <button className="btn " id="reset" onClick={resetTime}>
              <i className="bi bi-arrow-clockwise"></i>
            </button>
          </div>
        </div>
        <div className="app-session ">
          <div className="align-items-end d-flex">
            <h5 id="session-label">Session Length</h5>
          </div>
          <div className="session-control">
            <button className="btn" value="-" id="session-decrement" onClick={handleSession}>
              <i className="bi bi-dash-circle-fill"></i>
            </button>
            <p id="session-length">{sessionIni}</p>
            <button className="btn " value="+" onClick={handleSession} id="session-increment">
              <i className="bi bi-plus-circle-fill"></i>
            </button>
          </div>
        </div>
        <div className="app-break">
          <div className="align-items-end d-flex">
            <h5 id="break-label">Break Length</h5>
          </div>
          <div className="break-control">
            <button className="btn" value="-" onClick={handleBreak} id="break-decrement">
              <i className="bi bi-dash-circle-fill"></i>
            </button>
            <p id="break-length">{breakIni}</p>
            <button className="btn " value="+" onClick={handleBreak} id="break-increment">
              <i className="bi bi-plus-circle-fill"></i>
            </button>
          </div>
        </div>
        <div className="app-goal">
          <Lists />
        </div>
      </div>
      <Signature />
    </div>
  );
}

export default App;
