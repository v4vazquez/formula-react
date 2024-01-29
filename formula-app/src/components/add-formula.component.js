import React, { Component } from "react";
import FormulaDataService from "../services/formula.service";

export default class AddFormula extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveFormula = this.saveFormula.bind(this);
    this.newFormula = this.newFormula.bind(this);

    this.state = {
      id: null,
      name: "",
      description: "", 
      published: false,

      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  saveFormula() {
    var data = {
      name: this.state.name,
      description: this.state.description
    };

    FormulaDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newFormula() {
    this.setState({
      id: null,
      name: "",
      description: "",
      published: false,

      submitted: false
    });
  }

  render() {
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newFormula}>
                Add
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="name">Formula Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  required
                  value={this.state.name}
                  onChange={this.onChangeName}
                  name="name"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  required
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  name="description"
                />
              </div>
  
              <button onClick={this.saveFormula} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      );
    }
  }
