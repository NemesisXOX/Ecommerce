import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import 'tachyons';
import { Switch, Route, Redirect } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component'; 
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createuserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {

  unsubscribefromauth = null;

  componentDidMount(){

      const {setCurrentUser} = this.props;

      this.unsubscribefromauth = auth.onAuthStateChanged(async userAuth =>{
      if(userAuth){
        const userRef = await createuserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id:snapShot.id,
              ...snapShot.data()});
        });
        
      }
      setCurrentUser(userAuth);

    });
  }

  componentWillUnmount(){
    this.unsubscribefromauth();
  }
  
  render(){
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path ='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route exact path='/signin' render={()=> this.props.currentUser ? (<Redirect to='/'/>):(<SignInAndSignUp/>)}/>
        </Switch>
      </div>
    );
  }
}

const mapStatetoProps = ({user}) => ({
  currentUser:user.currentUser
})

const mapDispatchToProps = dispatch =>({
  setCurrentUser: user  => dispatch(setCurrentUser(user))
})

export default connect(mapStatetoProps, mapDispatchToProps)(App);
