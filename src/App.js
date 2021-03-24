import './App.css';
import { Auth } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

function App() {
  async function updateProfile(name) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        Auth.currentUserInfo().then(val => {
	        var raw = JSON.stringify({
	        	"uid":val.username,
	        	"name":name
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

  return (
    <div className="App">
      <div style={{width: "50px"}}>
      	<AmplifySignOut />
      </div>
      <h1>OMSCS Coffee Chats</h1>
      <div style={{ margin: "auto"}}>
	    <form>
	        <label>Name:  </label>
	        <input type="text" id="name" />
	        <button type="button" onClick={() => updateProfile(document.getElementById('name').value)}>Submit</button>
	    </form>
	    <br />
	    <br />
	    <div style={{width: "500px", margin: "auto"}}>
	      This information will only be used for the purpose of scheduling coffee chats. If you opt-in to being randomly patched with another student, this information will be shared with the student you are matched with. If you opt-in to allow other students to request a coffee chat with you, this information will be viewable by other OMSCS students. You can choose to opt-out at any time or edit/remove your information.
	    </div>
      </div>
    </div>
  );
}

export default withAuthenticator(App);