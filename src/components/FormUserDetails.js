import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ReactDOM from 'react-dom';
import { Dropdown } from 'semantic-ui-react';
import { Picker } from 'react-native';

const DropdownGender = () => (
  <Dropdown text='Filter' icon='filter' floating labeled button className='icon'>
    <Dropdown.Menu>
      <Dropdown.Header icon='tags' content='Filter by tag' />
      <Dropdown.Item>Important</Dropdown.Item>
      <Dropdown.Item>Announcement</Dropdown.Item>
      <Dropdown.Item>Discussion</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
)

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

            <Picker>
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>

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
            
            <div> 
              <DropdownGender></DropdownGender>  
            </div> 

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