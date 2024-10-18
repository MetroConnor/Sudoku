import React, { useEffect, useState } from 'react';
import './ShowHighscore.css';

const HighscoreList = ({ isDarkMode }) => {
    const [highscores, setHighscores] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/highscore')
            .then(response => response.json())
            .then(data => setHighscores(data))
            .catch(error => console.error('Error fetching highscores:', error));
    }, []);

    return (
        <div>
            <h2>Highscores</h2>
            <div className={`Frame ${isDarkMode ? 'dark-mode' : ''}`}>
                <div className={`H4Grid ${isDarkMode ? 'dark-mode' : ''}`}>
                    <div className="columnH4">
                        <h4>Name</h4>
                    </div>
                    <div className="columnH4">
                        <h4>Stufe</h4>
                    </div>
                    <div className="columnH4">
                        <h4>Sek.</h4>
                    </div>
                </div>

                {highscores.map((highscore, index) => (
                    <div key={index} className={`HighscoreGrid ${isDarkMode ? 'dark-mode' : ''}`}>
                        <div className="HighscoreColumn">
                            {highscore.username} &nbsp;
                        </div>
                        <div className="HighscoreColumn">
                            {highscore.difficultyLevel} &nbsp;
                        </div>
                        <div className="HighscoreColumn">
                            {highscore.completionTime}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HighscoreList;