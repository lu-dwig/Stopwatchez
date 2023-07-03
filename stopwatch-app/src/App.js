import './App.css';
import React, { useState, useEffect } from 'react';
import { BsStopwatch } from 'react-icons/bs'

function App() {
    const [stopwatchData, setStopwatchData] = useState([
        { id: 0, name: "Timer 1", time: 0, isRunning: false, lap: [], time_started: 0, pause: [] },
       ])
    const [selectedRow, setSelectedRow] = useState(0)
    useEffect(() => {
        const interval = setInterval(() => {
            setStopwatchData(stopwatchData.map((stopwatch) => {
                if (stopwatch.isRunning) {
                    return { ...stopwatch, time: new Date() - stopwatch.time_started - stopwatch.pause.reduce((a, b) => a + b, 0) }
                }
                return stopwatch
            }))
        }, 10)
        return () => clearInterval(interval)
    }, [stopwatchData])
    
    const handleStart = (id) => {
        setStopwatchData(stopwatchData.map((stopwatch) => {
            if (stopwatch.id === id) {
                return { ...stopwatch, isRunning: true, time_started: new Date() - stopwatch.time - stopwatch.pause.reduce((a, b) => a + b, 0) }
            }
            return stopwatch
        }))
    }
       
    const handleStop = (id) => {
        setStopwatchData(stopwatchData.map((stopwatch) => {
            if (stopwatch.id === id) {
                return { ...stopwatch, isRunning: false, pause: [...stopwatch.pause, new Date() - stopwatch.time_started - stopwatch.pause.reduce((a, b) => a + b, 0)] }
            }
            return stopwatch
        }))
    }
       
    const handleReset = (id) => {
        setStopwatchData(stopwatchData.map((stopwatch) => {
            if (stopwatch.id === id) {
                return { ...stopwatch, time: 0, isRunning: false, lap: [] }
            }
            return stopwatch
        }))
    }
    
    const handleLap = (id) => {
        setStopwatchData(stopwatchData.map((stopwatch) => {
            if (stopwatch.id === id) {
                return { ...stopwatch, lap: [...stopwatch.lap, stopwatch.time] }
            }
            return stopwatch
        }))
    }

    return (
        <div className="App">
            <div className='container'>
                <div className='left'>
                <div style={{ display: "flex", alignItems: "center", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                        <div style={{ textAlign: "left" }}>
                            <h1 style={{ fontWeight: "bold", fontSize: 30 }}>Stopwatch</h1>
                            <p style={{ fontWeight: "normal", fontSize: 20 }}>Built by stackie</p>
                        </div>
                        <div style={{ cursor: "pointer", alignItems: "center", display: "flex", flexDirection: "row", gap: 10 }} onClick={() => setStopwatchData([...stopwatchData, { id: stopwatchData.length, name: `Timer ${stopwatchData.length + 1}`, time: 0, isRunning: false, lap: [], pause: [] }])}>
                            <BsStopwatch size={20} color={"white"} />
                            <p>Add Stopwatch</p>
                        </div>
                    </div>
                    
                </div>
                <div className='right'>

                </div>
            </div>
        </div>
    );
}
 
export default App;
