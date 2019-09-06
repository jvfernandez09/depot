import React from 'react';
import ReactDOM from 'react-dom';
import ShallowRenderer from 'react-test-renderer/shallow'
import App from './App';


it('renders without crashing', () => {
  const renderer = new ShallowRenderer()
  const div = document.createElement('div');
  renderer.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
