import React from 'react';
import ReactDOM from 'react-dom';
import GLOBALS from '../config/constants';
import Edit from './edit';

export default class Todo extends React.Component {	
	constructor(props) {
    super(props);
    if(!localStorage.getItem('token')){
        this.props.history.push('/login');
    }

    this.state = {
      responsedata: [],
      result: []
    };
  }  

  render() {
      var i = 1;
  	this.items = this.state.responsedata.map((item, key) =>
	    <tr key={item.id}>
		    <td>{i++}</td>
		    <td>{item.name}</td>
		    <td>{item.status == 1 ? 'Completed' : ' Pending ' }</td>
		    {this.markButton(item.status,item.id)}
	    </tr>
	);
    return (
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.items}	
                    </tbody>	    
                </table>
            </div>
        );
    }

    async fetchFirst() {
	  var that = this;
	  await fetch(GLOBALS.API_URL + GLOBALS.TODO_METHOD, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        }).then((response) => {
            const statusCode = response.status;
            const responseJson = response.json();
            return Promise.all([responseJson, statusCode]);
         })
        .then(([responseJson, statusCode]) => { 
            if(statusCode == GLOBALS.SUCCESS_STATUS){
                that.setState({ responsedata: responseJson.data });
            }else if(statusCode == GLOBALS.ERROR_STATUS){
                alert(responseJson.messages);
            }else if(statusCode == GLOBALS.UNAUTHORIZE_STATUS){
                alert(responseJson.messages);
                window.location="/logout";
            }
        })
  }  
  componentWillMount() {
    this.fetchFirst();
  }    


  MarkButtonClick = (event) => {
    var selectedid = event.target.value;
    fetch(GLOBALS.API_URL + GLOBALS.MARK_COMPLETE + selectedid , {
        method: 'GET', 
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        } }).then(result => {
            if(result.status == GLOBALS.SUCCESS_STATUS){
                this.fetchFirst();
            }else if(result.status == GLOBALS.ERROR_STATUS){
                alert(result.messages);
            }else if(result.status == GLOBALS.UNAUTHORIZE_STATUS){
                alert(result.messages);
                window.location="/logout";
            }
    });
  };
  markButton(status,id) {
    if(status == 0) {
      return (
			<td>
				<button className="btn btn-info btn-sm" value={id} onClick={this.MarkButtonClick}>Mark Complete</button> &nbsp;
				<button className="btn btn-warning btn-sm" value={id} onClick={this.EditButtonClick}>Edit</button>
			</td>
      );
    } else {
      return (
          <td> - </td>
      );
    }
  }
  EditButtonClick = (event) => {
    var selectededitid = event.target.value;
        fetch(GLOBALS.API_URL + GLOBALS.TODO_METHOD +  selectededitid , {
                method: 'GET', headers: {
                'Authorization': 'Bearer '+ localStorage.getItem('token'),
            } 
        }).then(function(response) {
		    return response.json();
		}).then(result => {
            if(result.status == GLOBALS.SUCCESS_STATUS){
                this.props.history.push('/edit/' + selectededitid);
            }else if(result.status == GLOBALS.ERROR_STATUS){
                alert(result.messages);
            }else if(result.status == GLOBALS.UNAUTHORIZE_STATUS){
                alert(result.messages);
                window.location="/logout";
            }
        });
  };
}