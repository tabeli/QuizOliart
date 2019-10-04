import React, { Component } from 'react';
import FormUserDetails from './FormUserDetails';
import FirstQuizz from './FirstQuizz';
import Confirm from './Confirm';
import Success from './Success';

export class UserForm extends Component {
  state = {
    step: 1,
    firstName: '',
    lastName: '',
    email: '',
    occupation: '',
    age: '',
    gender: '',
    individualScore: '',
    proceduralScore: '',
    innovationScore: ''
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
          <FormUserDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
            <FirstQuizz
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 3:
        
        return (
            <Confirm
              nextStep={this.nextStep}
              prevStep={this.prevStep}
              values={values}
            />
        );
      case 4:        
        return <Success />;        
    }
  }
}

export default UserForm;