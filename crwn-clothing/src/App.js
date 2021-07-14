import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import 'tachyons';
import { Switch, Route, Link } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component'; 
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createuserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      currentUser: null
    };
  }

  unsubscribefromauth = null;

  componentDidMount(){
      this.unsubscribefromauth = auth.onAuthStateChanged(async userAuth =>{
      if(userAuth){
        const userRef = await createuserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser:{
              id:snapShot.id,
            ...snapShot.data()}
          }, ()=>{
            console.log(this.state);
          })

          console.log(this.state);
        });
        
      }
      this.setState({currentUser:userAuth});

    });
  }

  componentWillUnmount(){
    this.unsubscribefromauth();
  }
  
  render(){
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path ='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route path='/signin' component={SignInAndSignUp}/>
        </Switch>
      </div>
    );
  }
}

export default App;
