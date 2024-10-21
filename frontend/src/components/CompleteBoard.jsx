import React, { useState, useEffect } from 'react';
import Numbers from './Numbers';
import './CompleteBoard.css'
import HighscoreList from "./ShowHighscore";

export default function CompleteBoard() {
    const [missingCount, setMissingCount] = useState(0); // Zustand für die Anzahl der fehlenden Zahlen
    const [time, setTime] = useState(0);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [username, setUsername] = useState('');
    const [isGameFinished, setIsGameFinished] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        let timer;
        if (isTimerActive) {
            timer = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }
        return () => {
            clearInterval(timer);
        }
    }, [isTimerActive]);

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }

        // Cleanup Funktion, um die Klasse zu entfernen, falls der Component unmounted wird
        return () => {
            document.body.classList.remove('dark-mode');
        };
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const setDifficulty = (difficulty) => {
        switch (difficulty) {
            case 'easy':
                setMissingCount(30);
                break;
            case 'medium':
                setMissingCount(40);
                break;
            case 'hard':
                setMissingCount(45);
                break;
            default:
                setMissingCount(0);
        }
        setTime(0);
        setIsTimerActive(true);
        setIsGameFinished(false);
    };

    const handleStopTimer = () => {
        setIsTimerActive(false);
        if(time > 0){
        setIsGameFinished(true);
        }
    }

    const handleSubmitHighscore = () => {
        if (username === '') {
            alert('Bitte Benutzernamen eingeben');
            return;
        }

        const highscoreData = {
            username: username,
            completionTime: time,
            difficultyLevel: missingCount === 30 ? 'Leicht' : missingCount === 40 ? 'Mittel' : 'Schwer'
        };

        fetch('http://localhost:8080/api/highscore', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(highscoreData),
        })
            .then(response => {
                if (response.ok) {
                    alert('Highscore erfolgreich gespeichert!');
                } else {
                    alert('Fehler beim Speichern des Highscores');
                }
            })
            .catch(error => {
                console.error('Fehler beim Senden des Highscores:', error);
                alert('Fehler beim Senden des Highscores');
            });
    }

    return (
        <div className={`container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            <div className={`column ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
                <div className="Highscores">
                    <HighscoreList isDarkMode={isDarkMode} />
                </div>
            </div>
            <div className="column">
                <h1>Sudoku Spiel</h1>
                <div className="timer">
                    <h2>{Math.floor(time / 60)}:{time % 60 < 10 ? `0${time % 60}` : time % 60}</h2>
                </div>

                <Numbers missingCount={missingCount} onCheckSolution={handleStopTimer} isDarkMode={isDarkMode} />

                {isGameFinished && (
                    <div className="inputField">
                        <input
                            className="input"
                            type="text"
                            placeholder="Benutzername"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <button className="ButtonInput" onClick={handleSubmitHighscore}>Speichern</button>
                    </div>
                )}
            </div>
            <div className="column">
                <div className="difficultyButtons">
                    <div>
                        <button onClick={() => setDifficulty('easy')}>Leicht</button>
                    </div>
                    <div>
                        <button onClick={() => setDifficulty('medium')}>Mittel</button>
                    </div>
                    <div>
                        <button onClick={() => setDifficulty('hard')}>Schwer</button>
                    </div>
                </div>
                <button className={`toggleModeButton ${isDarkMode ? 'dark-mode' : 'light-mode'}`} onClick={toggleDarkMode}>
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
            </div>
        </div>
    );
}
