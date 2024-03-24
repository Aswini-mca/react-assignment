import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import ElementTransfer from './components/ElementTransfer';
import Home from './components/Home';
import Game from './components/Game';
import BoxSplit from './components/BoxSplit';
import NestedList from './components/NestedList';

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li><Link to='/element-transfer'>Element Transfer</Link></li>
          <li><Link to='/nested-list'>Nested List</Link></li>
          <li><Link>Infinite Scroll</Link></li>
          <li><Link to='/game'>Game</Link></li>
          <li><Link to='box-split'>Box Split</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/element-transfer' element={<ElementTransfer />} />
        <Route path='/nested-list' element={<NestedList />} />
        <Route path='/game' element={<Game />} />
        <Route path='/box-split' element={<BoxSplit />} />
      </Routes>
    </div>
  );
}

export default App;
