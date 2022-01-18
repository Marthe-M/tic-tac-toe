import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import Square from '../components/Square'


const Board = () => {
    const [nameOne, setNameOne] = useState<string>('');
    const [nameTwo, setNameTwo] = useState<string>('');
    const [start, setStart] = useState<Boolean>(false);
    const [squares, setSquares] = useState(Array(9).fill(null))
    const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>(Math.round(Math.random() * 1) === 1 ? "X" : "O")
    const [winner, setWinner] = useState<Player>(null)
    const [score, setScore] = useState<Player[]>([])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const onNameChangeOne = (e: ChangeEvent<HTMLInputElement>) => {
        setNameOne(e.target.value);
    };

    const onNameChangeTwo = (e: ChangeEvent<HTMLInputElement>) => {
        setNameTwo(e.target.value);
    };

    const startGame = () => {
        if (nameOne && nameTwo)
            setStart(true)
    }

    const setSquareValue = (index: number) => {
        const newData = squares.map((val, i) => {
            if (i === index) {
                return currentPlayer
            }
            return val
        })
        setSquares(newData)
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
    }

    const reset = () => {
        setSquares(Array(9).fill(null))
        setWinner(null)
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
    }

    const resetCompletely = () => {
        setSquares(Array(9).fill(null))
        setWinner(null)
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
        setScore([])
    }

    const newGame = () => {
        setSquares(Array(9).fill(null))
        setWinner(null)
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
        setScore([])
        setStart(false)
    }

    const calculateWinner = (squares: Player[]) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    useEffect(() => {
        const w = calculateWinner(squares)
        if (w) {
            setWinner(w)
        }
        if (!w && !squares.filter((square) => !square).length) {
            setWinner("Both")
        }
    })

    useEffect(() => {
        const newScore = [...score]
        newScore.push(winner)
        setScore(newScore)
    }, [winner])


    return (
        <div className="container">

            {!start ? (<div>
                <h1>Welcome to <span style={{ color: '#ffc600', fontSize: '3rem' }}>Tic <span style={{ color: '#5800ff' }}>Tac</span> Toe!</span></h1>
                <form onSubmit={handleSubmit} >
                    <p>Player One:</p>
                    <input type="text" required placeholder="Enter name..." value={nameOne} onChange={onNameChangeOne} />
                    <p>Player Two:</p>
                    <input type="text" required placeholder="Enter name..." value={nameTwo} onChange={onNameChangeTwo} />
                    <button className='reset' onClick={startGame}>START</button>
                </form></div>) : (<div></div>)}

            {start ? (<div className="game-container">
                <div className="scoreboard">
                    <p>{nameOne}: {score.filter(x => x === 'X').length} points</p>
                    <p>{nameTwo}: {score.filter(x => x === 'O').length} points</p>
                    <p>Draw: {score.filter(x => x === 'Both').length} times</p>
                </div>
                {!winner && <p>Hey {currentPlayer === 'X' ? <span style={{ color: '#5800ff', fontSize: '3rem' }}>{nameOne}</span> : <span style={{ color: '#ffc600', fontSize: '3rem' }}>{nameTwo}</span>}
                    , it's your turn</p>}
                {winner && winner !== "Both" && <p>Congratulations <span style={{ color: '#ffc600', fontSize: '3rem' }}>{winner === 'X' ? <span style={{ color: '#5800ff', fontSize: '3rem' }}>{nameOne}</span> : <span style={{ color: '#ffc600', fontSize: '3rem' }}>{nameTwo}</span>}</span>, you are the winner!</p>}
                {
                    winner && winner === "Both" && (
                        <p>Congratulations you're  <span style={{ color: '#e900ff', fontSize: '3rem' }}>BOTH</span> winners</p>
                    )
                }



                <div className="grid">
                    {Array(9).fill(null).map((_, i) => {
                        return (
                            <Square winner={winner} key={i} onClick={() => setSquareValue(i)} value={squares[i]} />)
                    })}
                </div>

                <div className="button-container">
                    <button className="reset" onClick={reset}>NEXT</button>
                    <button className="reset" onClick={resetCompletely}>RESET</button>
                    <button className="reset new" onClick={newGame}>NEW GAME</button>
                </div>

            </div>) : (<div></div>)}
        </div >

    )
}

export default Board
