import React, { Component } from "react";
import FormulaDataService from "../services/formula.service";
import { Link } from "react-router-dom";
import Formula from "./formula.component";

export default class FormulasList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveFormulas = this.retrieveFormulas.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveFormula = this.setActiveFormula.bind(this);
    this.removeAllFormulas = this.removeAllFormulas.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      formulas: [],
      currentFormula: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveFormulas();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  retrieveFormulas() {
    FormulaDataService.getAll()
      .then(response => {
        this.setState({
          formulas: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveFormulas();
    this.setState({
      currentFormula: null,
      currentIndex: -1
    });
  }

  setActiveFormula(formula, index) {
    this.setState({
      currentFormula: formula,
      currentIndex: index
    });
  }

  removeAllFormulas() {
    FormulaDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchName() {
    FormulaDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          formulas: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchName, formulas, currentFormula, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Formulas List</h4>

          <ul className="list-group">
            {formulas &&
              formulas.map((formula, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveFormula(formula, index)}
                  key={index}
                >
                  {formula.name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllFormulas}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentFormula ? (
            <div>
              <h4>Formula</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentFormula.name}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentFormula.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentFormula.published ? "Published" : "Pending"}
              </div>

              <Formula formulaId={currentFormula.id} />


              {/* <Link
                to={"/formulas/" + currentFormula.id}
                className="badge badge-warning"
              >
                Edit
              </Link> */}
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Formula...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
  }

