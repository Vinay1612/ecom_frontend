import React from 'react';
import {Link} from "react-router-dom";
import {Button } from 'semantic-ui-react';


class LandingPage extends React.Component{

  constructor(props){
    super(props);
  }


render(){
  return(
    <div className="ui container">
      <h1>Landing Page</h1>


        <Link to="/" className="button">Logout</Link>

    </div>

  );

}

}




export default LandingPage;
