import './App.css';
import { Auth } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import React from 'react';

class App extends React.Component {
  async fetchProfile() {
    Auth.currentUserInfo().then(val => {
      this.setState({ 
        uid : val.username
      }, 
      function(){
        var raw = JSON.stringify({
          "uid": this.state.uid
        });
        var url = "https://7t8g3nj639.execute-api.us-east-2.amazonaws.com/dev" + "?uid=" + this.state.uid;
        fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Credentials" : true ,
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
          },
          redirect: 'follow'
        })
        .then((response) => response.json())
        .then((data) => {
          this.setState({ 
            name : data.Item.Name,
            email: data.Item.Email 
          });
        })
        .catch((error) => console.log('Error while fetching:', error));

      }); 
    });
  }

  async updateProfile(name_in, email_in) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var name = name_in;
    var email = email_in;
    if (name == null || name == ""){
      name = this.state.name;
    }
    if (email == null || email == ""){
      email = this.state.email;
    }
    Auth.currentUserInfo().then(val => {
	    var raw = JSON.stringify({
	      "uid":val.username,
	      "name":name,
	      "email":email
	    });
	    var requestOptions = {
	      method: 'POST',
	      headers: myHeaders,
	      body: raw,
	      redirect: 'follow'
	    };
	    fetch("https://zh22drgz96.execute-api.us-east-2.amazonaws.com/dev", requestOptions)
	      .then(result => alert("Profile information successfully updated"))
	      .catch(error => console.log('error', error));
	    });
  }

  constructor(props) {
    super(props);

    this.state = {
      uid: null,
      name : null,
      email : null
    };
  }

  componentDidMount() {
    this.fetchProfile();
  }

  render() {
    return (
      <div className="App">
        <div style={{width: "50px"}}>
        	<AmplifySignOut />
        </div>
        <h1>OMSCS Coffee Chats</h1>
        <div style={{ margin: "auto"}}>
  	    <form>
  	      <label>Name:  </label>
  	      <input type="text" id="name" placeholder={this.state.name}/>
  	      <br />
  	      <br />
  	      <label>Email:  </label>
  	      <input type="text" id="email" placeholder={this.state.email}/>
  	      <br />
  	      <br />
  	      <button type="button" onClick={() => this.updateProfile(
              document.getElementById('name').value, 
              document.getElementById('email').value
            )}>Submit</button>
  	    </form>
  	    <br />
  	    <br />
  	    <div style={{width: "500px", margin: "auto"}}>
  	      "This information will only be used for the purpose of scheduling coffee chats. If you opt-in to being randomly patched with another student, this information will be shared with the student you are matched with. If you opt-in to allow other students to request a coffee chat with you, this information will be viewable by other OMSCS students. You can choose to opt-out at any time or edit/remove your information."
  	    </div>
        </div>
      </div>
    );
  }

}

export default withAuthenticator(App);