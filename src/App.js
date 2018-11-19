import React, { Component } from 'react';
import './App.css';
// Must import components used in the JSX
import GameBoard from './components/GameBoard/GameBoard';
import ColorPicker from './components/ColorPicker/ColorPicker';
import NewGameButton from './components/NewGameButton/NewGameButton';

let colors = ['#7CCCE5', '#FDE47F', '#E04644', '#B576AD'];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.newGameState();
  }
  newGameState() {
    return {
      colors,
      code: this.genCode(colors.length),
      selColorIdx: 0,
      guesses: [this.getNewGuess()]
    }
  }

  getNewGuess() {
    return {
      code: [null, null, null, null],
      score: {
        perfect: 0,
        almost: 0
      }
    };
  }

  genCode(size) {
    return new Array(4).fill().map(dummy => Math.floor(Math.random() * size));
  }

  getWinTries() {
    // if winner, return num guesses, otherwise 0 (no winner)
    let lastGuess = this.state.guesses.length - 1;
    return this.state.guesses[lastGuess].score.perfect === 4 ? lastGuess + 1 : 0;
  }

  handleColorSelection = (colorIdx) => {
    this.setState({selColorIdx: colorIdx});
  }

  handleNewGame = () => {
    this.setState(this.newGameState())
  }

  handlePegClick = (pegIdx) => {
    let currentGuesses = this.state.guesses.length -1
    let guessesCopy = [...this.state.guesses]
    let currentRoundCodeArray = [...guessesCopy[currentGuesses].code]
    currentRoundCodeArray[pegIdx] = this.state.selColorIdx
    guessesCopy[currentGuesses] = currentRoundCodeArray
    
    this.setState({guesses: guessesCopy})
    console.log(this.state.guesses)
  }

  render() {
    let winTries = this.getWinTries();
    return (
      <div>
        <header className='App-header-footer'>R E A C T &nbsp;&nbsp;&nbsp;  M A S T E R M I N D</header>
        <div className='App-game'>
          <GameBoard
            guesses={this.state.guesses}
            colors={this.state.colors}
            handlePegClick={this.handlePegClick}
          />
          <div className='App-controls'>
            <ColorPicker
              colors={this.state.colors}
              selColorIdx={this.state.selColorIdx}
              handleColorSelection={this.handleColorSelection}
            />
            <NewGameButton 
              handleNewGame={this.handleNewGame}
            />
          </div>
        </div>
        <footer className='App-header-footer'>
          {(winTries ? `You Won in ${winTries} Guesses!` : 'Good Luck!')}
        </footer>
      </div>
    );
  }
}



export default App;
