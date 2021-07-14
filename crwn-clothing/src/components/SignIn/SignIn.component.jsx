import React from 'react';
import './SignIn.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, signInwithGoogle } from '../../firebase/firebase.utils';

class SignIn extends React.Component{
    constructor(props){
        super(props);

        this.state={
            email:'',
            password:''
        }
    }

    handleSubmit=async event => {
        event.preventDefault();

        const {email, password}=this.state;

        try{
            await auth.signInWithEmailAndPassword(email,password);
            this.setState({email:'',password:''});
        }catch(error){
            console.log(error);
        }
        
        this.setState({email:'',password:''});

    }

    handleChange=(event)=>{
        const {value,name}=event.target;
        this.setState({[name]:value}); 
    }

    render(){
        return(
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign In with  email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput name='email' type='email' value={this.state.email} label='Email' required handleChange={this.handleChange}/>
        
                    <FormInput name='password' type='password' value={this.state.password} label='Password' required handleChange={this.handleChange}/>
        
                    <div className='buttons'>
                        <CustomButton type='submit'>SIGN IN</CustomButton>
                        <CustomButton onClick={signInwithGoogle} isGoogleSignIn>SIGN IN WITH GOOOGLE</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn; 