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
       
    
    return (
        <div className="App">
            <div className='container'>
                <div className='left'>
                    
                </div>
                <div className='right'>

                </div>
            </div>
        </div>
    );
}
 
export default App;
