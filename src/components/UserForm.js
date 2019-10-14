import React, { Component } from 'react';
import FormUserDetails from './FormUserDetails';
import FirstQuizz from './FirstQuizz';
import Confirm from './Confirm';
import Success from './Success';

//import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const MyContext = React.createContext();

//create a provider component
class MyProvider extends Component {
    state = {
        individualScore: 0,
        proceduralScore: 0,
        innovationScore: 0
    };
    render() {
        return(
            <MyContext.Provider value="The value">
                {this.props.children}
            </MyContext.Provider>
        )
    }
}

const Score = (props) => (
  <div className = "score">
    <UserForm/>
  </div>
)

//here is the format
class Scoring extends Component {
  render() {
    return (
      <div className = "scoring">
        <p>
          "How do I access my data here"
        </p>
      </div>
    )    
  }
}

export class UserForm extends Component {
  state = {
    step: 1,
    firstName: '',
    lastName: '',
    email: '',
    occupation: '',
    age: '',
    gender: '',
    individualScore: 1,
    proceduralScore: 1,
    innovationScore: 1
  };

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  individualScoreUp = () => {
      const { individualScore } = this.state;
      this.setState({
          individualScore: individualScore + 1
      });
  };



  // Handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { step } = this.state;
    const { firstName, lastName, occupation, age, gender, individualScore, proceduralScore, innovationScore } = this.state;
    const values = { firstName, lastName, occupation, age, gender, individualScore, proceduralScore, innovationScore };
    
    switch (step) {
      case 1:
        return (
          <MyProvider>
            <FormUserDetails              
              nextStep={this.nextStep}
              handleChange={this.handleChange}
              values={values}                        
            />
          </MyProvider>
        );
      case 2:
        return (
          <MyProvider>
            <FirstQuizz
              nextStep={this.nextStep}
              prevStep={this.prevStep}
              handleChange={this.handleChange}
              values={values}
            />
          </MyProvider>
        );
      case 3:
        
        return (
          <MyProvider>
            <Confirm
              nextStep={this.nextStep}
              prevStep={this.prevStep}
              values={values}
            />
          </MyProvider>
        );
      case 4:        
        return <Success />;        
    }
  }
}

export default UserForm;