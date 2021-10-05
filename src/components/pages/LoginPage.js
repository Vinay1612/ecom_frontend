import React from 'react';
import {Link} from "react-router-dom";
import LoginForm from "../forms/LoginForm";
import axios from 'axios';
import {Button } from 'semantic-ui-react';


class LoginPage extends React.Component{
  constructor(props) {
    super(props);
      this.state = {}
      this.submit = this.submit.bind(this);
  }

 //This gets the data and sends it as a post request
  submit(data){

    //alert("username: " + data.username);
    //This calls the URL to submit the post request.
    axios.post('http://localhost:8081/api/user/login',{
      username:data.username,
      password:data.password
    })
    .then((response) =>{

      if(response.status === 200){
        window.alert("Login Successful, you are redirected to shopping page");
        sessionStorage.setItem('token',response.data.token);
        //this.props.accessToken(response.data.token);
        this.props.history.push('/landing');
      }else{
        window.alert("Login failed", response.data.message);
      }        
    })
    .catch((error) => {window.alert("Login failed")});
  }

 //This renders the HTML code
  render(){
    return(
        <div>
            <h1>Login Page</h1>
            <LoginForm submit={this.submit}/>
            <p id="status"></p>
            <p>Make a new account? Right here.</p>
            <Link to="/registration" className="button">Registration</Link>
        </div>

      );
  }
}




export default LoginPage;
