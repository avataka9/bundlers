import * as React from 'react';
import { render } from 'react-dom';

const App = () => {
  
  return (
    <div className="main-content">
      <h2>Let's talk about smileys</h2>
      <p>More about smileys can be found here ...</p>
    </div>
  );
};

render(<App />, document.querySelector('#app'));
