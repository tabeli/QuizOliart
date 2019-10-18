import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ReactDOM from 'react-dom';
import { Dropdown } from 'semantic-ui-react';
import { Picker } from 'react-native';

export class FormUserDetails extends Component {
  state = {
    pickerGenderValue: "",
    pickerSectorValue: "",
    pickerOnChargeValue: "",
    pickerIncomeValue: "",
    pickerStatusValue: ""

  };

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
    localStorage.setItem('genderPicker', this.state.pickerGenderValue);
    localStorage.setItem('sectorPicker', this.state.pickerSectorValue);
    localStorage.setItem('onChargePicker', this.state.pickerOnChargeValue);
    localStorage.setItem('incomePicker', this.state.pickerIncomeValue);
    localStorage.setItem('statusPicker', this.state.pickerStatusValue);
  }; 

  render() {

    const { values, handleChange } = this.props; 
    return (
      
      <MuiThemeProvider>
        <React.Fragment>                   
            <AppBar title = "Ingrese sus datos"></AppBar>
            
            <br/>
            
            <TextField
              style={{width:'25%', fontSize: 20}}            
              hintText="Edad"
              floatingLabelText="Edad" 
                           
              required={true}             
              defaultValue={values.age}
              onChange={handleChange('age')}
            />
            <br/>
            
            <br/>

            <Picker
		            style={{width:'25%'}}
		            selectedValue={this.state.pickerGenderValue}
		            onValueChange={(itemValue,itemIndex) => this.setState({pickerGenderValue:itemValue})}
		            >
		            <Picker.Item label="Select a option" value=""/>
		            <Picker.Item label="Masculino" value="Masculino" />
		            <Picker.Item label="Femenino" value="Femenino"/>
		        </Picker>		

            <br/>

            <br/>

            <Picker
		            style={{width:'25%'}}
		            selectedValue={this.state.pickerSectorValue}
		            onValueChange={(itemValue,itemIndex) => this.setState({pickerSectorValue:itemValue})}
		            >
                <Picker.Item label="Select a option" value=""/>
                <Picker.Item label="Manufactura" value="Manufactura" />
                <Picker.Item label="Servicios" value="Servicios" />
                <Picker.Item label="Comercio" value="Comercio" />
                <Picker.Item label="Educativo" value="Educativo" />
            </Picker>

            <br/>

            <br/>

            <Picker
		            style={{width:'25%'}}
		            selectedValue={this.state.pickerOnChargeValue}
		            onValueChange={(itemValue,itemIndex) => this.setState({pickerOnChargeValue:itemValue})}
		            >
                <Picker.Item label="Select a option" value=""/>
                <Picker.Item label="Si (1 - 10)" value="Si (1 - 10)" />
                <Picker.Item label="Si (11 - 20)" value="Si (11 - 20)" />
                <Picker.Item label="Si (21 - 30)" value="Si (21 - 30)" />
                <Picker.Item label="Si (más de 30)" value="Si (más de 30)" />
                <Picker.Item label="No" value="No" />
            </Picker>

            <br/>

            <br/>

            <Picker
		            style={{width:'25%'}}
		            selectedValue={this.state.pickerIncomeValue}
		            onValueChange={(itemValue,itemIndex) => this.setState({pickerIncomeValue:itemValue})}
		            >
                <Picker.Item label="Select a option" value=""/>
                <Picker.Item label="1-10000" value="1-10000" />
                <Picker.Item label="10001-20000" value="10001-20000" />
                <Picker.Item label="20001-30000" value="20001-30000" />
                <Picker.Item label="Mayor a 30000" value="Mayor a 30000" />
            </Picker>

            <br/>

            <br/>

            <Picker
		            style={{width:'25%'}}
		            selectedValue={this.state.pickerStatusValue}
		            onValueChange={(itemValue,itemIndex) => this.setState({pickerStatusValue:itemValue})}
		            >
                <Picker.Item label="Select a option" value=""/>
                <Picker.Item label="Soltero" value="Soltero" />
                <Picker.Item label="Casado" value="Casado" />
            </Picker>

            <br/>


            {/*<TextField              
              hintText="Nombre(s)"
              floatingLabelText="Nombre(s)"
              defaultValue={values.firstName}
              onChange={handleChange('firstName')}                            
            />
            <br/>

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
              hintText="Ocupación"
              floatingLabelText="Ocupación" 
              onChange={handleChange('occupation')}
              defaultValue={values.occupation}
            />
            <br />*/}

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