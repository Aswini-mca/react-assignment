import React, { useEffect, useState } from 'react'
import Home from './Home'

function Game() {
    const [score, setScore] = useState(0);
    const [keywordIndex, setKeywordIndex] = useState(-1);
    const [timer, setTimer] = useState(null);
    const [gameOver, setGameOver] = useState(false); // Track game over state
    const [remainingTime, setRemainingTime] = useState(60); // 60 seconds for 1 minute game
    const [gameStarted, setGameStarted] = useState(false); // Track if game has started

    // Set game as started
    function startGame() {
        setGameStarted(true);
    }

    useEffect(() => {
        if (gameStarted) {
            displayKeyword();
            setTimer(setInterval(() => {
                // Decrease remaining time every second
                setRemainingTime(prevTime => prevTime - 1);
            }, 1000));
            setTimeout(() => {
                // Clear timer after 1 minute
                clearInterval(timer);
                // Set game over after 1 minute
                setGameOver(true);
            }, 60000);
            return () => clearInterval(timer); // Cleanup timer
        }
    }, [gameStarted]); // Start the game when gameStarted state changes

    useEffect(() => {
        if (remainingTime === 0) {
            // Clear timer when time runs out
            clearInterval(timer);
            // Set game over when time runs out
            setGameOver(true);
        }
    }, [remainingTime]); // Check remaining time

    useEffect(() => {
        const timerId = setTimeout(() => {
            // Penalize points for missing keyword
            updateScore(-2.5);
            displayKeyword();
        }, 1000);
        return () => clearTimeout(timerId); // Cleanup timer
    }, [keywordIndex]); // Update keyword every time keywordIndex changes

    function displayKeyword() {
        const randomIndex = Math.floor(Math.random() * 9);
        setKeywordIndex(randomIndex);
    }

    function updateScore(points) {
        setScore(score + points);
    }

    function handleClick(clickedIndex) {
        // Check if game is not over and has started
        if (!gameOver && gameStarted) {
            clearInterval(timer); // Reset timer
            if (clickedIndex === keywordIndex) {
                updateScore(5); // Award points for clicking correct box
            } else {
                updateScore(-2.5); // Penalize points for clicking wrong box
            }
            displayKeyword(); // Display new keyword
            setRemainingTime(remainingTime - 1); // Decrease remaining time
        }
    }

    return (
        <div>
            <Home />
            <h3>Game 'Points will be awarded if clicked on the right box'</h3>
            <button className='game-start-button' onClick={startGame}>Start Game</button>
            <div className='game-container'>
                <div className="game-box">
                    {[...Array(9).keys()].map(index => (
                        <div key={index} className="small-box" onClick={() => handleClick(index)}>
                            {index === keywordIndex ? 'HIT' : ''}
                        </div>
                    ))}
                </div>
            </div>
            {gameOver ? (
                <div className="score">Final Score: {score}</div>
            ) : (
                <div className="timer">Time Left: {remainingTime} seconds</div>
            )}
        </div>
    )
}

export default Game