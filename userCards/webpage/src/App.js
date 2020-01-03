import React, { Component } from "react";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCol
} from "mdbreact";
import { connect } from "react-redux";

import * as action from "./store/actions/action";

class App extends Component {

  deleteItem = (id) => {
    const updatedList = this.props.user.filter(item => item.id !== id)
    this.props.updateUserData(updatedList);
  } 
  
  componentDidMount() {
    this.props.getUserData();
  }

  render() {
    console.log("app.js", this.props.user);
    return (
      <div className="App">
        {this.props.user
          ? this.props.user.map((items, index) => (
              <MDBCol key={index}>
                <MDBCard style={{ width: "22rem" }}>
                  <MDBCardImage
                    className="img-fluid"
                    src={items._links.avatar.href}
                    waves
                  />
                  <MDBCardBody>
                    <MDBCardTitle>Card title</MDBCardTitle>
                    <div className="displayText">
                      <label>
                        First Name: {items.first_name}
                      </label>
                      <label>
                        Last Name: {items.last_name}
                      </label>
                      <label>
                        Gender: {items.gender}
                      </label>
                      <label>
                        DOB:{items.dob}
                      </label>
                    </div>
                    <MDBBtn onClick={() => this.deleteItem(items.id)}>Delete</MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))
          : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.userDetails
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserData: () => dispatch(action.getUserData()),
    updateUserData: (updatedUserDetails) => dispatch(action.deleteItem(updatedUserDetails))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
