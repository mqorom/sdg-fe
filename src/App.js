import { useState } from 'react';
import { AuthorList } from './components/author/AuthorList';
import { BookList } from './components/book/BookList';
import { NavBarInstance } from './NavBarInstance';

const App = () => {
  const [activeKey, setActiveKey] = useState("1")

  const handleSelect = (key) => {
    setActiveKey(key)
  }

  return (
    <div>
      <NavBarInstance activeKey={activeKey} onSelect={handleSelect} ></NavBarInstance>

      <div style={{ display: activeKey == 1 ? "block" : "none" }}>
        <BookList ></BookList>
      </div>

      <div style={{ display: activeKey == 2 ? "block" : "none" }}>
        <AuthorList></AuthorList>
      </div>
    </div>
  );
};

export default App;
