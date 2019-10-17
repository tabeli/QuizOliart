import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { List, ListItem, ListItemText } from '@material-ui/core/';
import RaisedButton from 'material-ui/RaisedButton';
import Style from '../styles.css';

export class Confirm extends Component {
  state = {
    individualScore: localStorage.getItem('individualScoreFQ'),
    proceduralScore: localStorage.getItem('proceduralScoreFQ'),
    innovationScore: localStorage.getItem('innovationScoreFQ'),

    pragmaticScore: localStorage.getItem('pragmaticScoreSQ'),
    communityScore: localStorage.getItem('communityScoreSQ'),
    ecologicScore: localStorage.getItem('ecologicScoreSQ')
  }
  continue = e => {
    e.preventDefault();
    // PROCESS FORM //
    localStorage.clear();
    this.props.nextStep();    
  };

  back = e => {
    e.preventDefault();    
    localStorage.clear();
    this.props.prevStep();
  };
  

  render() {    
    const {
      values: { firstName, lastName, occupation, age, gender  }
    } = this.props;
    const { individualScore, proceduralScore, innovationScore, pragmaticScore, communityScore, ecologicScore } = this.state; 
    return (      
        <div width="500px">
        <MuiThemeProvider >          
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
              <h2>Individual Score</h2> 
              <h4>{individualScore}</h4>                   

              <h2>Procedural Score</h2>
              <h4>{proceduralScore}</h4> 
              
              <h2>Innovation Score</h2>
              <h4>{innovationScore}</h4> 

              <h2>Pracmatico Score</h2> 
              <h4>{pragmaticScore}</h4>                   

              <h2>Comunitario Score</h2>
              <h4>{communityScore}</h4> 
              
              <h2>Ecologico Score</h2>
              <h4>{ecologicScore}</h4> 
                       
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