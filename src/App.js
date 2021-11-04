import { useState, useCallback } from "react";

const App = () => {
  const [result, setResult] = useState(null);
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
    setResult(null);
    
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

  const renderText = useCallback(() => {
    if (!result) {
      return '';
    } else if (result === -1) {
      return 'Pattern not found';
    }

    return 'Pattern founded at index';
  },[result]);

  return (
    <div className="App">
      <header>
        <div className="icon-place"></div>
        <h1 className="title">KMP Search Algorithm</h1>
      </header>
      <div className="container">
        <div className="kmp-container">
          <form action="" className="form">
            <div className="input-box search-in-content">
              <label>String to search in</label>
              <input
                type="text"
                id="search-in"
                value={strSearchIn}
                onChange={(e) => setStrSearchIn(e.target.value)}
              />
            </div>
            <div className="input-box search-for-content">
              <label>String to search for</label>
              <input
                type="text"
                id="search-for"
                value={strSearchFor}
                onChange={(e) => setStrSearchFor(e.target.value)}
              />
            </div>
            <div className="button-container">
              <button type="button" onClick={searchFor}>Search</button>
            </div>
          </form>
          <div className={`${!result ? '' : 'result-container'}`}>
            <p>{renderText()}</p>
            <p className={`${!result || result === -1 ? '' : 'result'}`}>
              {
                !result || result === -1
                  ? ''
                  : result
              }
            </p>
          </div>
        </div>
        <div className="history">

        </div>
      </div>
    </div>
  );
}

export default App;
