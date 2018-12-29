'use strict'

class Welcome extends React.Component {
  render() {
    return <h1>Hello World!</h1>;
  }
}

const element = <Welcome />;

ReactDOM.render(
  element,
  document.getElementById('vimi'),
);

