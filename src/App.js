import "./App.css";
import "./Global.scss";
import Home from "./views/Home";
// ------------------------------
// Pure Home <------ ENDS ------>
// ------------------------------
import HTMLtoJSXHome from "./views/htmltojsx/Home";
import OnlineToolsHome from "./views/onlinetools/Home";
import AtomBuilderHome from "./views/atombuilder/Home";
// ------------------------------
// Sub Home <------ ENDS ------>
// ------------------------------
import Button from "./atombuilder/Button";
// ------------------------------
// Atom Builder Components <------ ENDS ------>
// ------------------------------
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="htmltojsx" element={<HTMLtoJSXHome />}></Route>
          <Route path="onlinetools" element={<OnlineToolsHome />}></Route>

          <Route path="atombuilder">
            <Route index element={<AtomBuilderHome />} />
            <Route
              path="button"
              element={
                <AtomBuilderHome path="button">
                  <Button />
                </AtomBuilderHome>
              }
            ></Route>
          </Route>
          <Route path="/" index element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
