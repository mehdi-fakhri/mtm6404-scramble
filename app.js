/**********************************************
 * STARTER CODE
 **********************************************/

/**
 * shuffle()
 * Shuffle the contents of an array
 *   depending the datatype of the source
 * Makes a copy. Does NOT shuffle the original.
 * Based on Steve Griffith's array shuffle prototype
 * @Parameters: Array or string
 * @Return: Scrambled Array or string, based on the provided parameter
 */
function shuffle (src) {
  const copy = [...src]

  const length = copy.length
  for (let i = 0; i < length; i++) {
    const x = copy[i]
    const y = Math.floor(Math.random() * length)
    const z = copy[y]
    copy[i] = z
    copy[y] = x
  }

  if (typeof src === 'string') {
    return copy.join('')
  }

  return copy
}

/**********************************************
 * YOUR CODE BELOW
 **********************************************/
const words = ["teemo", "jinx", "lux", "ahri", "yasuo", "zed", "riven", "fiora", "katarina","akali"];


function App() {
  const [points, setPoints] = React.useState(0);   
  const [strikes, setStrikes] = React.useState(0);
  const [passes , setPasses] = React.useState(3);
  const [guess, setGuess] = React.useState("");
  const [wordList, setWorldlist] = React.useState(shuffle(words));
  const [scrambled, setScrambled] = React.useState(shuffle(wordList[0]));
  const [message, setMessage] = React.useState("");
 const gameOver = strikes === 3 || wordList.length === 0;
  


function handleSubmit(e) {
  if (e.key === "Enter") {
    if (guess.toLowerCase() === wordList[0].toLowerCase()) {
      setMessage("Correct");
      setPoints(points + 1);
      const newList = wordList.slice(1);
      setWorldlist(newList);
      setScrambled(shuffle(newList[0] || ""));
    } else {
      setStrikes(strikes + 1);
      setMessage("Wrong");
    }
    setGuess("");
  }
}

function handlePass() {
  if (passes > 0) {                  
    const newList = wordList.slice(1);
    setWorldlist(newList);
    setScrambled(shuffle(newList[0] || ""));
    setPasses(passes - 1);           
    setMessage("You passed");
  }
}
function playAgain() {
  const newList = shuffle(words);
  setWorldlist(newList);
  setScrambled(shuffle(newList[0]));
  setPoints(0);    
  setStrikes(0);   
  setPasses(3);    
  setMessage("");
}
 







    return (
    <div>
      <h1>Welcome to Scramble</h1>
      <p>Points: {points}</p>
      <p>strikes: {strikes}</p>
      <p>passes: {passes}</p>
      <p>word: {scrambled}</p>

      <input
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        onKeyDown={handleSubmit}
        placeholder="Your guess"
        disabled={gameOver}
      />

          <p>{message}</p>
      <button onClick={handlePass} disabled={gameOver}>Pass</button>
      {gameOver && <button onClick={playAgain}>Play again</button>}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));   
root.render(<App />);
