import React from 'react';
import ReactDOM from 'react-dom';
import GLOBALS from '../config/constants';
class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
        this.fetchFirst()
    }
    fetchFirst() {
        fetch(GLOBALS.API_URL + GLOBALS.LOGOUT_METHOD, {
            method: 'POST',
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
                localStorage.clear();
                window.location = "home";
            }else if(statusCode == GLOBALS.ERROR_STATUS){
                alert(responseJson.messages);
            }else if(statusCode == GLOBALS.UNAUTHORIZE_STATUS){
                localStorage.clear();
                window.location = "home";
            }
        })
    }
}
 
export default Logout;