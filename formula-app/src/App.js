import React, {Component} from "react";
import FormulasList from "./components/formulas-list.component";
import AddFormula from "./components/add-formula.component";
import Formula from "./components/formula.component";
import{Link, Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component{
  render(){
  return (
    <div>
      <nav className="navbar navbar-brand navbar-dark bg-dark">
        <Link to="/formulas" className="navbar-brand" style={{marginLeft:"10px"}}>
          Yuriys Scripts
          </Link>
          <div className="d-flex">
            <Link to={"/formulas"} className="nav-link ml-auto">List of Formulas</Link>
            <div className ="mx-5">   </div>
            <Link to={"/add"} className="nav-link ml-1" style={{ marginRight: "15px" }}> Add a Formula </Link>
            </div>
            </nav>

            <div className="container mt-3">
              <Routes>
                <Route path="/" element={<FormulasList/>} />
                <Route path="/formulas" element={<FormulasList/>} />
                <Route path="/add" element={<AddFormula/>} />
                <Route path="/formulas/:id" element={<Formula/>} />
              </Routes>
              </div>
      </div>
  );
}
}
export default App;
