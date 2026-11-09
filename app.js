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


function handleSubmit(e) {
  if (e.key === "Enter") {
    if (guess === wordList[0]) {
      setMessage("Correct");
      setPoints(points + 1);
    } else {
      setStrikes(strikes + 1);
      setMessage("Wrong");
    }
    setGuess("");
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
  placeholder="Your guess"

/>
<input
  value={guess}
  onChange={(e) => setGuess(e.target.value)}
  onKeyDown={handleSubmit}             
  placeholder="Your guess"
/>

<p>{message}</p>

                    
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));   
root.render(<App />);

