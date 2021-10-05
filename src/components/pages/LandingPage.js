import React from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import {Button } from 'semantic-ui-react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';


class LandingPage extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      items:[],
      activeCartId: null,
      token: sessionStorage.getItem('token')
    };
    this.addItemtHandler = this.addItemtHandler.bind(this);
    this.checkoutHandler = this.checkoutHandler.bind(this);
    this.showCartHandler = this.showCartHandler.bind(this);
    this.orderHistoryHandler = this.orderHistoryHandler.bind(this);
  }
  componentDidMount() {
    //call items api
    axios.get('http://localhost:8081/api/item/list',{
      headers: {
        'x-access-token': this.state.token
      }
    }).then((response) => {
      this.setState({items: [...response.data.data]});
    });

  }
  addItemtHandler(event){
    axios.post('http://localhost:8081/api/cart/add',{itemId:event.target.id},{
      headers: {
        'x-access-token': this.state.token
      }
    }).then((response) => {
      this.setState({activeCartId: response.data.id});
      window.alert(`Item added successfully to cart ID${response.data.id}`);
    });
  }
  checkoutHandler(){
    axios.put(`http://localhost:8081/api/cart/${this.state.activeCartId}/complete`,{},{
      headers: {
        'x-access-token': this.state.token
      }
    })
    .then((response) => {
      window.alert("Order placed successfully");
    });
  }
  showCartHandler(){
    axios.get('http://localhost:8081/api/cart/items',{
      headers: {
        'x-access-token': this.state.token
      }
    }).then((response) => {
      let cartId = response.data.id;
      let items = [];
      if(response.data.Items){
        response.data.Items.map((item) => items.push(item.id));
        window.alert(`your cart ${cartId} has items ${items}`);
      }
      else{
        window.alert(`first build a cart`);
      }
    });
  }
  orderHistoryHandler(){
    axios.get('http://localhost:8081/api/order/list',{
      headers: {
        'x-access-token': this.state.token
      }
    }).then((response) => {
      let orderHistory = [];
      response.data.map((order) => {orderHistory.push(order.id)});
      window.alert(`order history ${orderHistory}`);
    });
  }


    render(){
      return(
        <div className="ui container">
          <h1>Landing Page</h1>
          <Button onClick={this.checkoutHandler} primary>Checkout</Button>
          <br></br>
          <Button onClick={this.showCartHandler} primary>Show Cart</Button>
          <br></br>
          <Button onClick={this.orderHistoryHandler} primary>Order history</Button>
          <br></br>
          {this.state.items.map((item) => {
              
          })}
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {this.state.items.map((item) => (
              <ListItem
                key={item.id}
                disableGutters
              >
                <ListItemButton id={item.id} onClick={this.addItemtHandler}>
                  {item.name}
                </ListItemButton>  
              </ListItem>
            ))}
          </List>
          <Link to="/" className="button">Logout</Link>

        </div>

      );

    }

}




export default LandingPage;
