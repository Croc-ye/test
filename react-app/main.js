'use strict'
function timer() {
  const element = <h1> now is {new Date().toLocaleString()}</h1>;
  ReactDOM.render(
    element,
    document.getElementById("vimi"),
  );
}

setInterval(timer, 1000);
