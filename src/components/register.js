import React, { Component } from 'react';
import GLOBALS from '../config/constants';
class Register extends Component {
    state = { 
        name: "",
        email:"",
        password:"",
        password_confirmation: "",
        phone: ""
     }
    render() { 
        return (
        <div className="container">
            <div className="row">
              <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div className="card card-signin my-5">
                  <div className="card-body">
                    <h5 className="card-title text-center">Register</h5>
                    <form className="form-signin" method="post" onSubmit={this.onSubmit}>
                        <div className="form-label-group">
                            <input type="text" onChange={this.onChange} id="name" className="form-control" placeholder="Name" required autoFocus/>
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-label-group">
                            <input type="email" onChange={this.onChange} id="email" className="form-control" placeholder="Email address" required />
                            <label htmlFor="email">Email address</label>
                        </div>

                        <div className="form-label-group">
                            <input type="password" onChange={this.onChange} id="password" className="form-control" placeholder="Password" required />
                            <label htmlFor="password">Password</label>
                        </div>

                        <div className="form-label-group">
                            <input type="password" onChange={this.onChange} id="password_confirmation" className="form-control" placeholder="Confirm Password" required />
                            <label htmlFor="password_confirmation">Confirm Password</label>
                        </div>

                        <div className="form-label-group">
                            <input type="text" onChange={this.onChange} id="phone" className="form-control" placeholder="Phone" required />
                            <label htmlFor="name">Phone</label>
                        </div>
                        <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Register</button>
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
        fetch(GLOBALS.API_URL + GLOBALS.REGISTER_METHOD , {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                password_confirmation: this.state.password_confirmation,
                phone: this.state.phone
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
                window.location="/todo";
            }else if(statusCode == GLOBALS.ERROR_STATUS){
                alert(responseJson.messages);
            }else if(statusCode == GLOBALS.UNAUTHORIZE_STATUS){
                alert(responseJson.messages);
                window.location="/logout";
            }
        })
        .catch(error => '');
    }
    onChange = (e) =>{
        if (e.target.id === 'name') {
            this.setState({ name: e.target.value });
        }else if (e.target.id === 'email') {
            this.setState({ email: e.target.value });
        } else if (e.target.id === 'password') {
            this.setState({ password: e.target.value });
        }  else if (e.target.id === 'password_confirmation') {
            this.setState({ password_confirmation: e.target.value });
        } else if (e.target.id === 'phone') {
            this.setState({ phone: e.target.value });
        }else{
            ;
        }
    }
}
 
export default Register;