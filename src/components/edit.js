import React from 'react';
import GLOBALS from '../config/constants';

export default class Edit extends React.Component {	
	constructor(props) {
        super(props);
        if(!localStorage.getItem('token')){
            this.props.history.push('/login');
        }
        this.state = {
            id:this.props.match.params.myid,
            name: "",
            responsedata: []
        };
        fetch(GLOBALS.API_URL + GLOBALS.TODO_METHOD +  this.state.id , {
            method: 'GET', headers: {
            'Authorization': 'Bearer '+ localStorage.getItem('token'),
            } 
        }).then(function(response) {
            return response.json();
        }).then(result => {
            if(result.status == 200){
                this.setState({name:result.data.name});
            }else{
                alert(result.messages);
            }
        });
    }  

    updateTodo() {
      var that = this;
            fetch(GLOBALS.API_URL + GLOBALS.TODO_METHOD + this.props.match.params.myid, {
                method: 'PUT',
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
                    that.setState({ responsedata: responseJson.data });
                    this.props.history.push('/todo');
                }else if(statusCode == GLOBALS.ERROR_STATUS){
                    alert(responseJson.messages);
                }else if(statusCode == GLOBALS.UNAUTHORIZE_STATUS){
                    alert(responseJson.messages);
                }
            })
      }  

  render() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div className="card card-signin my-5">
                    <div className="card-body">
                    <h5 className="card-title text-center">Update ToDo</h5>
                    <form className="form-signin" method="post" onSubmit={this.onSubmit}>
                        <div className="form-label-group">
                            <input type="text" name="name" id="name" value={this.state.name || ''} className="form-control" onChange={this.onChange} />
                            <label htmlFor="email">Name</label>
                        </div>
                        <div className="form-label-group">
                            <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Update</button>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
    }

    onChange = (event) => {
        var name = event.target.value;
        if(name != "")
        {
            this.setState({ name: name });
        }
    }

    onSubmit = (event) => {
        event.preventDefault()
        var name = this.state.name;
        this.updateTodo();
    }

    componentWillMount() {
        this.setState({ name: this.props.name });
    } 
        
}
