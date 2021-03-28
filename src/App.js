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
        var url = "https://7t8g3nj639.execute-api.us-east-2.amazonaws.com/dev?uid=".concat(this.state.uid);
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
            email: data.Item.Email, 
            city : data.Item.City,
            state : data.Item.State,
            country : data.Item.Country,
            current_courses : data.Item.CurrentCourses,
            job_title : data.Item.JobTitle,
            company : data.Item.Company,
            interests : data.Item.Interests,
            random : data.Item.Random,
            contact : data.Item.Contact
          });
        })
        .catch((error) => console.log('Error while fetching:', error));

      }); 
    });
  }

  async updateProfile(name_in, email_in, city_in, state_in, country_in, 
    current_courses_in, job_title_in, company_in, interests_in, random_in, contact_in) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var name = name_in;
    var email = email_in;
    var city = city_in;
    var state = state_in;
    var country = country_in;
    var current_courses = current_courses_in;
    var job_title = job_title_in;
    var company = company_in;
    var interests = interests_in;
    var random = random_in;
    var contact = contact_in;
    if (name == null || name === ""){
      name = this.state.name;
    }
    if (email == null || email === ""){
      email = this.state.email;
    }
    if (city == null || city === ""){
      city = this.state.city;
    }
    if (state == null || state === ""){
      state = this.state.state;
    }
    if (country == null || country === ""){
      country = this.state.country;
    }
    if (current_courses == null || current_courses === ""){
      current_courses = this.state.current_courses;
    }
    if (job_title == null || job_title === ""){
      job_title = this.state.job_title;
    }
    if (company == null || company === ""){
      company = this.state.company;
    }
    if (interests == null || interests === ""){
      interests = this.state.interests;
    }
    if (random == null || random === ""){
      random = this.state.random;
    }
    if (contact == null || contact === ""){
      contact = this.state.contact;
    }
    Auth.currentUserInfo().then(val => {
	    var raw = JSON.stringify({
	      "uid":val.username,
	      "name":name,
	      "email":email,
        "city":city,
        "state":state,
        "country":country,
        "current_courses":current_courses,
        "job_title":job_title,
        "company":company,
        "interests":interests,
        "random": random,
        "contact": contact
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

  updateRandomSelection(selection_in) {
    this.setState({random: selection_in});
  }

  updateContactSelection(selection_in) {
    this.setState({contact: selection_in});
  }

  constructor(props) {
    super(props);

    this.state = {
      uid: null,
      name : null,
      email : null,
      city : null,
      state : null,
      country : null,
      current_courses : null,
      job_title : null,
      company : null,
      interests : null,
      random: null,
      contact: null
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
          <label>City:  </label>
          <input type="text" id="city" placeholder={this.state.city}/>
          <br />
          <br />  
          <label>State:  </label>
          <input type="text" id="state" placeholder={this.state.state}/>
          <br />
          <br />    
          <label>Country:  </label>
          <input type="text" id="country" placeholder={this.state.country}/>
          <br />
          <br />    
          <label>Current Courses:  </label>
          <input type="text" id="current_courses" placeholder={this.state.current_courses}/>
          <br />
          <br />   
          <label>Job Title:  </label>
          <input type="text" id="job_title" placeholder={this.state.job_title}/>
          <br />
          <br />    
          <label>Company:  </label>
          <input type="text" id="company" placeholder={this.state.company}/>
          <br />
          <br />           
          <label>Interests:  </label>
          <input type="text" id="interests" placeholder={this.state.interests}/>
          <br />
          <br />     

          <div style={{width: "500px", margin: "auto"}}>
          <label>Would you like to opt-in to be randomly matched with other OMSCS students for 15 minute calls every 2 weeks? </label>
          <br />
          <input type="radio" id="random_yes" name="random" value="random_yes" checked={"random_yes" === this.state.random} onChange={() => this.updateRandomSelection("random_yes")} />
          <label for="random_yes">Yes</label>
          <br />
          <input type="radio" id="random_no" name="random" value="random_no" checked={"random_no" === this.state.random} onChange={() => this.updateRandomSelection("random_no")}/>
          <label for="random_no">No</label>
          <br />
          </div>
          <br />

          <div style={{width: "500px", margin: "auto"}}>
          <label>Would you like to make your profile information available to other OMSCS students so they request a coffee chat with you? You will have the option to decline individual calls. </label>
          <br />
          <input type="radio" id="contact_yes" name="contact" value="contact_yes" checked={"contact_yes" === this.state.contact} onChange={() => this.updateContactSelection("contact_yes")} />
          <label for="contact_yes">Yes</label>
          <br />
          <input type="radio" id="contact_no" name="contact" value="contact_no" checked={"contact_no" === this.state.contact} onChange={() => this.updateContactSelection("contact_no")} />
          <label for="contact_no">No</label>
          <br />
          </div>
          <br />

  	      <button type="button" onClick={() => this.updateProfile(
              document.getElementById('name').value, 
              document.getElementById('email').value,
              document.getElementById('city').value,
              document.getElementById('state').value,
              document.getElementById('country').value,
              document.getElementById('current_courses').value,
              document.getElementById('job_title').value,
              document.getElementById('company').value,
              document.getElementById('interests').value,
              document.querySelector('input[name="random"]:checked') ? document.querySelector('input[name="random"]:checked').value : null,
              document.querySelector('input[name="contact"]:checked') ? document.querySelector('input[name="contact"]:checked').value : null
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