import React, { Component } from "react";
import { withRouter } from '../common/with-router';
import "bootstrap/dist/css/bootstrap.min.css";
import FormulaDataService from "../services/formula.service";


class Formula extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getFormula = this.getFormula.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateFormula = this.updateFormula.bind(this);
    this.deleteFormula = this.deleteFormula.bind(this);

    this.state = {
      currentFormula: {
        id: null,
        name: "",
        description: "",
        published: false
      },
      message: "",
      loading:true, //this line was added,
    };
  }

  componentDidMount() {
    this.getFormula(this.props.formulaId);

    // console.log(this.props);
    // this.getFormula(this.props.router.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentFormula: {
          ...prevState.currentFormula,
          name: name
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentFormula: {
        ...prevState.currentFormula,
        description: description
      }
    }));
  }

  getFormula(id) {
    console.log(id);
    FormulaDataService.get(id)
      .then(response => {
        this.setState({
          currentFormula: response.data,
          loading:false //this line was added
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentFormula.id,
      name: this.state.currentFormula.name,
      description: this.state.currentFormula.description,
      published: status
    };

    const formulaId = this.state.currentFormula.id;//this line was added JUST Now
    FormulaDataService.update(this.state.currentFormula.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentFormula: {
            ...prevState.currentFormula,
            published: status
          },
          lastUpdatedFormulaId: formulaId //this line was added JUST Now
        }));
        console.log(response.data);
         window.location.reload(); 
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateFormula() {
    const formulaId = this.state.currentFormula.id;//this line was added JUST Now
    FormulaDataService.update(
      this.state.currentFormula.id,
      this.state.currentFormula
    )
    .then(response => {
        console.log('Updated formula data:', response.data); //add this line
        this.setState(prevState => ({
          currentFormula: {
            ...prevState.currentFormula,
            ...response.data
          },
          message: "The formula was updated successfully!",
          lastUpdatedFormulaId: formulaId //this line was added JUST Now
        }));

        window.location.reload(); 
      })
      .catch(e => {
        console.log(e);
      });
  }
  

//line below is the original
//       .then(response => {
//         console.log(response.data);
//         this.setState({
//           message: "The formula was updated successfully!"
//         });
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   }

  deleteFormula() {    
    FormulaDataService.delete(this.state.currentFormula.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/formulas');
        window.location.reload();
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentFormula, loading} = this.state; //this lin was added with ,loading

    return (
      <div>
        {currentFormula ? (
          <div className="edit-form">
            <h4>Formula</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentFormula.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentFormula.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentFormula.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentFormula.published ? (
              <button
                className="btn btn-warning mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="btn btn-success mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="btn btn-danger mr-2"
              onClick={this.deleteFormula}
              disabled={loading} //this line was added
            >
              Delete
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.updateFormula}
              disabled={loading} //this line was added
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Formula...</p>
          </div>
        )}
      </div>
    );
  }
  
}


export default withRouter(Formula);
