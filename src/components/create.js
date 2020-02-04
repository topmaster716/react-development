import React from 'react';
import GLOBALS from '../config/constants';

export default class Create extends React.Component {	
	constructor(props) {
        super(props);
        this.state = {
            name: "",
            responsedata: []
        };
    }  

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card card-signin my-5">
                        <div className="card-body">
                        <h5 className="card-title text-center">Create ToDo</h5>
                        <form className="form-signin" method="post" onSubmit={this.onSubmit}>
                            <div className="form-label-group">
                                <input type="text" name="name" id="name" value={this.state.name || ''} className="form-control" onChange={this.onChange} autoFocus />
                                <label htmlFor="email">Name</label>
                            </div>
                            <div className="form-label-group">
                                <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Create</button>
                            </div>
                        </form>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        );
    }

    onChange = (e) => {
        if (e.target.id === 'name') {
            this.setState({ name: e.target.value });
        }else{
            ;
        }
    }

    onSubmit = (event) => {
        event.preventDefault()
        var name = this.state.name;
        this.setState({ name: name });
        fetch(GLOBALS.API_URL + GLOBALS.TODO_METHOD, {
            method: 'POST',
            headers: {
                "content-type": "application/json; charset=UTF-8",
                "cache-control": "no-cache",
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },body: JSON.stringify({
                name: this.state.name
            }),
        }).then((response) => {
            const statusCode = response.status;
            const responseJson = response.json();
            return Promise.all([responseJson, statusCode]);
         })
        .then(([responseJson, statusCode]) => { 
            if(statusCode == GLOBALS.SUCCESS_STATUS){
                this.props.history.push('/todo');
            }else if(statusCode == GLOBALS.ERROR_STATUS){
                alert(responseJson.messages);
            }else if(statusCode == GLOBALS.UNAUTHORIZE_STATUS){
                alert(responseJson.messages);
                window.location="/logout";
            }
        })
    }
        
}
