import { useState } from 'react';

import Button from './components/UI/Button/Button';

import './index.css';

export default function App() {
  const [showParagraph, setShowParagraph] = useState(false);

  function toggleParagraphHandler() {
    setShowParagraph((prevShowParagraph) => !prevShowParagraph);
  }

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      {showParagraph && <p>Start editing to see some magic happen!</p>}
      <Button onClick={toggleParagraphHandler}>Toggle Paragraph</Button>
    </div>
  );
}
