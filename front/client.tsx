import React from 'react';
import { render } from 'react-dom';

const App = () => {
  return <h1>Hello, React App!</h1>
}

render(<App />, document.querySelector('#app'));