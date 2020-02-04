import React, { Component } from 'react';
import GLOBALS from '../config/constants';
import Header from './header';
class Login extends Component {
    state = { 
        email:"",
        password:""
    }
    constructor(props) {
        super(props);
        if(localStorage.getItem('token')){
            this.props.history.push('/todo');
        }
      }
    render() { 
        return (
        <div className="container">
            <div className="row">
              <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div className="card card-signin my-5">
                  <div className="card-body">
                    <h5 className="card-title text-center">Sign In</h5>
                    <form className="form-signin" method="post" onSubmit={this.onSubmit}>
                      <div className="form-label-group">
                        <input type="email" onChange={this.onChange} id="email" className="form-control" placeholder="Email address" required autoFocus />
                        <label htmlFor="email">Email address</label>
                      </div>
        
                      <div className="form-label-group">
                        <input type="password" onChange={this.onChange} id="password" className="form-control" placeholder="Password" required />
                        <label htmlFor="password">Password</label>
                      </div>
                      <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
    onSubmit = (e) => {
        e.preventDefault();
        fetch(GLOBALS.API_URL + GLOBALS.LOGIN_METHOD , {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            }),
        }).then((response) => {
            const statusCode = response.status;
            const responseJson = response.json();
            return Promise.all([responseJson, statusCode]);
         })
        .then(([responseJson, statusCode]) => {
            if(statusCode == GLOBALS.SUCCESS_STATUS){
                localStorage.setItem('token', responseJson.token);
                localStorage.setItem('user', JSON.stringify(responseJson.user));
                window.location = "/todo"
            }else if(statusCode == GLOBALS.ERROR_STATUS){
                alert(responseJson.messages);
            }else if(statusCode == GLOBALS.UNAUTHORIZE_STATUS){
                alert(responseJson.messages);
            }
        })
        .catch(error => '');
    }
    onChange = (e) =>{
        if (e.target.id === 'email') {
            this.setState({ email: e.target.value });
        } else if (e.target.id === 'password') {
            this.setState({ password: e.target.value });
        }else{
            ;
        }
    }
}
 
export default Login;