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
  const [points, setPoints] = React.useState(Number(localStorage.getItem("points")) || 0);   
  const [strikes, setStrikes] = React.useState(Number(localStorage.getItem("strikes")) || 0);   
  const [passes, setPasses] = React.useState(Number(localStorage.getItem("passes") || 3));
  const [guess, setGuess] = React.useState("");

  const [wordList, setWorldlist] = React.useState(JSON.parse(localStorage.getItem("wordList")) || shuffle(words));
  const [scrambled, setScrambled] = React.useState(localStorage.getItem("scrambled") || shuffle(wordList[0] || ""));
const [message, setMessage] = React.useState("");

  
  const gameOver = strikes === 3 || wordList.length === 0;
 
  



function playAgain() {
  const newList = shuffle(words);
  localStorage.clear();
  setWorldlist(newList);
  setScrambled(shuffle(newList[0]));
  setPoints(0);    
  setStrikes(0);   
  setPasses(3);    
  setMessage("");
}
 function handleSubmit(e) {
  if (e.key === "Enter") {
    if (guess.toLowerCase() === wordList[0].toLowerCase()) {
      setMessage("Correct");
      setPoints(points + 1);
      localStorage.setItem("points", points + 1);
      const newList = wordList.slice(1);
      setWorldlist(newList);
      localStorage.setItem("wordList", JSON.stringify(newList));
      const nextWord = shuffle(newList[0] || "");
      setScrambled(nextWord);
      localStorage.setItem("scrambled", nextWord);
    } else {
      setStrikes(strikes + 1);
      localStorage.setItem("strikes", strikes + 1);
      setMessage("Wrong");
    }
    setGuess("");
  }
}

function handlePass() {
  if (passes > 0) {
    const newList = wordList.slice(1);
    setWorldlist(newList);
    localStorage.setItem("wordList", JSON.stringify(newList));
    const nextWord = shuffle(newList[0] || "");
    setScrambled(nextWord);
    localStorage.setItem("scrambled", nextWord);
    setPasses(passes - 1);
    localStorage.setItem("passes", passes - 1);
    setMessage("You passed");
  }
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
