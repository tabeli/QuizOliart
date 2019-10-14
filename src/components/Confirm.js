import React, { Component } from 'react';
import ReactDom from 'react-dom';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { List, ListItem, ListItemText } from '@material-ui/core/';
import RaisedButton from 'material-ui/RaisedButton';
import MyContext from './UserForm';
import Style from '../styles.css';
import Dialog from '@material-ui/core/Dialog';

export class Confirm extends Component {
  continue = e => {
    e.preventDefault();
    // PROCESS FORM //
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const {
      values: { firstName, lastName, occupation, age, gender, individualScore, proceduralScore, innovationScore  }
    } = this.props;
    return (
      <div width="500px">
      <MuiThemeProvider >
        {/*<MyContext.Consumer>
              {(context) => (
                <p> Something {context} </p>
              )}
              </MyContext.Consumer>*/}
        <React.Fragment>              
          <AppBar title="Confirm User Data"/>
          <List>
            
            <ListItem>
              <ListItemText primary="Nombre(s)" secondary={firstName} /> 
            </ListItem>
            <ListItem>
              <ListItemText primary="Apelido(s)" secondary={lastName} /> 
            </ListItem>
            <ListItem>
              <ListItemText primary="Edad" secondary={age} /> 
            </ListItem>
            <ListItem>
              <ListItemText primary="Género" secondary={gender} /> 
            </ListItem>
            <ListItem>
              <ListItemText primary="Ocupación" secondary={occupation} /> 
            </ListItem> 
            <ListItem>
              <ListItemText primary="IS" secondary={individualScore} /> 
            </ListItem> 
            <ListItem>
              <ListItemText primary="PS" secondary={proceduralScore} /> 
            </ListItem> 
            <ListItem>
              <ListItemText primary="INS" secondary={innovationScore} /> 
            </ListItem>            
          </List>
          <br />
        
          <RaisedButton        
            label="Regresar"    
            variant="contained"
            primary={true}
            style={StyleSheet.button}
            onClick={this.back}
          ></RaisedButton>

          <RaisedButton     
            label="Siguiente"       
            variant="contained"
            primary={false}
            style={StyleSheet.button}
            onClick={this.continue}
          ></RaisedButton>                
        </React.Fragment>              
      </MuiThemeProvider>
      </div>
    );
  }
}

export default Confirm;