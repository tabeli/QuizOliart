import React, { Component } from 'react';
import FormUserDetails from './FormUserDetails';
import FirstQuizz from './FirstQuizz';
import SecondQuizz from './SecondQuizz';
import Confirm from './Confirm';
import Success from './Success';
import {MyContext} from './my_context';

//create a provider component
export class MyProvider extends Component {
  state = {
      individualScore: 0,
      proceduralScore: 0,
      innovationScore: 0,
      pragmaticScore: 0,
      communityScore: 0,
      ecologicScore: 0
  }
  render() {
      return(
          <MyContext.Provider value={{
              state: this.state,
              plusOneIScore: () => this.setState({
                  individualScore: this.state.individualScore + 1
              }),
              plusOnePScore: () => this.setState({
                  proceduralScore: this.state.proceduralScore + 1
              }),
              plusOneINScore: () => this.setState({
                  innovationScore: this.state.innovationScore + 1
              }),
              plusOnePRScore: () => this.setState({
                pragmaticScore: this.state.pragmaticScore + 1
              }),
              plusOneCOScore: () => this.setState({
                communityScore: this.state.communityScore + 1
              }),
              plusOneECScore: () => this.setState({
                ecologicScore: this.state.ecologicScore + 1
              })
          }}>
              {this.props.children}
          </MyContext.Provider>
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
    sector: '',
    onChargeOf: '',
    revenue: '',
    status: '',
    individualScore: 0,
    proceduralScore: 0,
    innovationScore: 0 
  };

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
      individualScore: localStorage.getItem('individualScoreFQ'),
      proceduralScore: localStorage.getItem('proceduralScoreFQ'),
      innovationScore: localStorage.getItem('innovationScoreFQ')

    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
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
            <SecondQuizz
              nextStep={this.nextStep}
              prevStep={this.prevStep}
              values={values}
            />            
          </MyProvider>          
        );
      case 4:      
        return (
          <MyProvider>
            <Confirm
              nextStep={this.nextStep}
              prevStep={this.prevStep}
              values={values}
            />            
          </MyProvider>          
        );
  
      case 5:        
        return <Success />;        
    }
  }
}

export default UserForm;