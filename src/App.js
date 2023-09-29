import "./App.css";
import Gesipan from "./gesipan/Gesipan";
import Edit from "./gesipan/Edit";
import Editor from "./component/Editor";

import { Route, BrowserRouter, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Gesipan />} />
          <Route path="/Edit" element={<Editor />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
