import { useState } from "react";

const App = () => {
  const [result, setResult] = useState();
  const [strSearchIn, setStrSearchIn] = useState('');
  const [strSearchFor, setStrSearchFor] = useState('');

  const getLps = (str) => {
    const table = [0];
    let i = 1;
    let j = 0;

    while (i < str.length) {
      if (str[i] === str[j]) {
        j += 1;
        table[i] = j;
        i += 1;
      } else if (j > 0) {
        j = table[j - 1];
      } else {
        table[i] = 0;
        i += 1;
      }
    }

    return table;
  };

  const searchFor = () => {
    if (strSearchFor === "") return 0;
    const lpsTable = getLps(strSearchFor);
    let i = 0;
    let j = 0;

    while (i < strSearchIn.length && j < strSearchFor.length) {
      if (strSearchIn[i] === strSearchFor[j]) {
        i += 1;
        j += 1;
      } else if (j > 0) {
        j = lpsTable[j - 1];
      } else {
        i += 1;
      }
    }

    const indexFounded = j === strSearchFor.length ? i - j : -1;
    setResult(indexFounded);
  };

  return (
    <div className="App">
      <h1>KMP Search Algorithm</h1>
      <form action="">
        <div>
          <label>String to search in</label>
          <input
            type="text"
            id="search-in"
            value={strSearchIn}
            onChange={(e) => setStrSearchIn(e.target.value)}
          />
        </div>
        <div>
          <label>String to search for</label>
          <input
            type="text"
            id="search-for"
            value={strSearchFor}
            onChange={(e) => setStrSearchFor(e.target.value)}
          />
        </div>
        <div>
          <button type="button" onClick={searchFor}>Search</button>
        </div>
      </form>
      <div className="result">
        <p>Find string at: <span>{result}</span></p>
      </div>
    </div>
  );
}

export default App;
