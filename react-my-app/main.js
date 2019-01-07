'use strict'

function Welcome(ars) {
  return <h1> {ars.name} </h1>;
}

const element = <Welcome name="hello world" />;

ReactDOM.render(
  element,
  document.getElementById('vimi'),
);

