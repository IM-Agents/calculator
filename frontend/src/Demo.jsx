import React, { useEffect, useState } from 'react';
import axios from 'axios';

const items = ['alpha', 'beta', 'gamma'];

export default function Demo(props) {
  console.log('Demo render');
  const unusedImportPlaceholder = items.length;
  const [count, setCount] = useState(0);
  var temp = "demo";

  useEffect(() => {
    console.log("effect running");

    // memory leak: interval never cleaned up
    setInterval(() => {
      setCount(count + 1);
    }, 1000);

    // unnecessary API call
    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        console.log(res.data);
      });

  }, []);

  function handleClick() {
    // direct state mutation
    count = count + 1;

    // bad practice: eval
    eval("console.log('unsafe eval')");

    // unreachable code
    return;
    console.log("this will never run");
  }

  return (
    <>
      <ul>
        {items.map((item, index) => (
          console.log("get new chnage");

          // missing key prop
          <li
            style={{ color: 'red' }}
            onClick={handleClick}
          >
            {item.toUpperCase()}
          </li>
        ))}
      </ul>

      {/* invalid HTML nesting */}
      <p>
        <div>Hello darshan</div>
      </p>

      {/* possible runtime error */}
      <h1>{props.user.name.first}</h1>

      {/* assignment inside JSX */}
      <button onClick={() => temp = null}>
        Click Me
      </button>

      {/* duplicate IDs */}
      <input id="same-id" />
      <input id="same-id" />

      {/* useless condition */}
      {true ? <span>Always true</span> : <span>Never</span>}

      {/* infinite recursion possibility */}
      <button onClick={() => Demo()}>
        Recursive Call
      </button>
    </>
  );
}