import './App.css';

import List from "./components/List";
import CreateWithRouter from "./components/Create";
import Edit from "./components/Edit";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-light bg-light">
          <div className="nav navbar-nav">
              <Link className="nav-item nav-link active" to="/">Inicio</Link>
          </div>
      </nav>
      <br />
      <div className="container">
        <Routes>
          <Route exact path="/" element={<List />} ></Route>
          <Route path="/nuevo" element={<CreateWithRouter />} ></Route>
          <Route path="/editar/:id" element={<Edit />} ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
