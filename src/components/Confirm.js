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
    ecologicScore: localStorage.getItem('ecologicScoreSQ'),

    genderPickerValue: localStorage.getItem('genderPicker'),
    sectorPickerValue: localStorage.getItem('sectorPicker'),
    onChargePickerValue: localStorage.getItem('onChargePicker'),
    incomePickerValue: localStorage.getItem('incomePicker'),
    statusPickerValue: localStorage.getItem('statusPicker'),

    firstResult: localStorage.getItem('firstResult'),
    secondResult: ""
  }
  continue = e => {
    e.preventDefault();
    // PROCESS FORM //
    localStorage.clear();
    this.props.nextStep();    
  };

    loadInfo = () => {    
            
        if(this.state.pragmaticScore > this.state.communityScore && this.state.pragmaticScore > this.state.ecologicScore) {
          this.setState({
            secondResult: " y también es Pragmatico"                 
          })
        } else if(this.state.communityScore > this.state.pragmaticScore && this.state.communityScore > this.state.ecologicScore) {
          this.setState({
            secondResult: " y también es Comunitario"  
          })        
        } else if(this.state.ecologicScore > this.state.pragmaticScore && this.state.ecologicScore > this.state.communityScore) {
          this.setState({
            secondResult: this.state.secondResult + " y también es Ecológico"
          })
        } else {
          this.setState({
            secondResult: "-> sin segundo resultado definido"
          })
          console.log(this.state.secondResult);
        }      
      
    }

    componentDidMount(){
      this.loadInfo();
    }

  back = e => {
    e.preventDefault();    
    localStorage.clear();
    this.props.prevStep();
  };
  

  render() {    
    const {
      values: { firstName, lastName, occupation, age, gender  }
    } = this.props;
    const { individualScore, proceduralScore, innovationScore, pragmaticScore, communityScore, ecologicScore, genderPickerValue, sectorPickerValue, onChargePickerValue, incomePickerValue, statusPickerValue, firstResult, secondResult } = this.state; 
    return (      
        <div width="500px">
        <MuiThemeProvider >          
          <React.Fragment>              
            <AppBar title="Confirm User Data"/>
            <List>                            
              <ListItem>
                <ListItemText primary="Edad" secondary={age} /> 
              </ListItem>
              <ListItem>
                <ListItemText primary="Género" secondary={genderPickerValue} /> 
              </ListItem>
              <ListItem>
                <ListItemText primary="Sector" secondary={sectorPickerValue} /> 
              </ListItem> 
              <ListItem>
                <ListItemText primary="Personas a su cargo" secondary={onChargePickerValue} /> 
              </ListItem>
              <ListItem>
                <ListItemText primary="Ingresos" secondary={incomePickerValue} /> 
              </ListItem>
              <ListItem>
                <ListItemText primary="Estado Civil" secondary={statusPickerValue} /> 
              </ListItem>             
              
              <h2>{firstResult.concat(secondResult)}</h2>                   
              
              <h4>Individual Score: {individualScore}</h4>                                 
              <h4>Procedural Score: {proceduralScore}</h4>              
              <h4>Innovation Score: {innovationScore}</h4> 
              <h4>Pracmatico Score: {pragmaticScore}</h4>                 
              <h4>Comunitario Score: {communityScore}</h4>              
              <h4>Ecologico Score: {ecologicScore}</h4>
                       
            </List>
            <br />
              
            {/*<RaisedButton        
              label="Regresar"    
              variant="contained"
              primary={true}
              style={StyleSheet.button}
              onClick={this.back}
            ></RaisedButton>*/}

            <RaisedButton     
              label="Siguiente"       
              variant="contained"
              primary={false}
              style={StyleSheet.button}
              onClick={this.continue}
            ></RaisedButton>   
            <br/> <br/> <br/> <br/>
          </React.Fragment>              
        </MuiThemeProvider>      
        </div>      
    );
  }
}

export default Confirm;