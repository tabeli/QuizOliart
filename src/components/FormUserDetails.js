import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MyContext from './UserForm';


{/*class Scoring extends Component {
  render() {
    return (
      <div className = "scoring">
        <p>
          Alo
        </p>
      </div>
    )
  }
}*/}

export class FormUserDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  

  render() {
    const { values, handleChange } = this.props; 
    return (
      
      
      <MuiThemeProvider>
        <React.Fragment>  
                             
            <AppBar title = "Ingrese sus datos"></AppBar>
            <TextField              
              hintText="Nombre(s)"
              floatingLabelText="Nombre(s)"
              defaultValue={values.firstName}
              onChange={handleChange('firstName')}                            
            />
            <br />
            <TextField
              hintText="Apellido(s)"
              floatingLabelText="Apellido(s)"            
              defaultValue={values.lastName}
              onChange={handleChange('lastName')}
            />
            <br />
          
            <TextField
              hintText="Género"
              floatingLabelText="Género"             
              defaultValue={values.gender}
              onChange={handleChange('gender')}
            />
            <br/>

            <TextField
              hintText="Edad"
              floatingLabelText="Edad"              
              defaultValue={values.age}
              onChange={handleChange('age')}
            />
            <br/>

            <TextField
              hintText="Ocupación"
              floatingLabelText="Ocupación" 
              onChange={handleChange('occupation')}
              defaultValue={values.occupation}
            />
            <br />

            <br/>

            <RaisedButton              
              label="Siguiente"
              primary={true}
              style={StyleSheet.button}
              onClick={this.continue}
            ></RaisedButton>
          
        </React.Fragment>
      </MuiThemeProvider>
      
    );
  }
}



export default FormUserDetails;