import React from 'react';
import {Link} from "react-router-dom";
import RegistrationForm from "../forms/RegistrationForm";
import axios from 'axios';
import {Button } from 'semantic-ui-react';

class RegistrationPage extends React.Component{

  constructor(props) {
    super(props);
      this.state = {}
      this.submit = this.submit.bind(this);
  }

//Gets the data and sumbits it for a post request
submit(data) {

  axios.post('http://localhost:8081/api/user/create',{
    username:data.username,
    name:data.name,
    password:data.password
  })
  .then((response)=>{
    
    window.alert(response.statusText);
    this.props.history.push('/login');
  });
};



render(){

  //alert("Response is : " + this.state.response);
  return(
    <div align="top">
      <h1>Registration Page</h1>
      <RegistrationForm  submit={this.submit}/>
        <p id="status"></p>
        <Link to="/" className="button">Back to Home</Link>

    </div>

  );

}

}

export default RegistrationPage;
