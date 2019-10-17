import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Individual} from './Individual';
import {Procedural} from './Procedural';
import {Innovador} from './Innovador';
import Style from '../styles.css';

import {MyContext} from './my_context';
import {MyProvider} from './UserForm';
//make a context

const Score = (props) => (
    <div className = "score">
      <Scoring/>
    </div>
  )
  
//here is the format
class Scoring extends Component {
    render() {
      return (
        <div className = "scoring">
          <MyContext.Consumer>
              {(context) => {
                  //console.log("The arrow function has been fired") 
                return (
                  <React.Fragment>
                      <p> Pragmatico score {context.state.pragmaticScore} </p>
                      <p> Comunitario score {context.state.communityScore} </p>
                      <p> Ecologico score {context.state.ecologicScore} </p>                      
                  </React.Fragment>    
                ); } }
          </MyContext.Consumer>
        </div>
      )    
    }
}

export class SecondQuizz extends Component {
    state = {
        currentQuestion: 0,
        myAnswer: null,
        options: [],
        score: 0,
        disabled: true,
        isEnd: false              
    };
    
    continue = (context) => {
        //e.preventDefault();
        this.props.nextStep();    
        const { userAnswer, answer, answers, answerIdx } = this.state;
            //this.props.individualScoreUp(this.state.individualScore);
            
            this.setState({
                currentQuestion: this.state.currentQuestion + 1
            })
            console.log(this.state.currentQuestion)            
            //increment individual score if answers is I            
            if(answers[answerIdx] === 'P'){
                console.log("Si hago algo");
                context.plusOnePRScore();
                localStorage.setItem('pragmaticScoreSQ', context.state.pragmaticScore+1);
                localStorage.setItem('communityScoreSQ', context.state.communityScore); 
                localStorage.setItem('ecologicScoreSQ', context.state.ecologicScore);                
            } else if(answers[answerIdx] === 'C'){
                console.log("Si hago algo2");
                context.plusOneCOScore();
                localStorage.setItem('pragmaticScoreSQ', context.state.pragmaticScore);
                localStorage.setItem('communityScoreSQ', context.state.communityScore+1); 
                localStorage.setItem('ecologicScoreSQ', context.state.ecologicScore);                  
            } else if(answers[answerIdx] === 'E'){
                console.log("Si hago algo3");
                context.plusOneECScore();
                localStorage.setItem('pragmaticScoreSQ', context.state.pragmaticScore);
                localStorage.setItem('communityScoreSQ', context.state.communityScore); 
                localStorage.setItem('ecologicScoreSQ', context.state.ecologicScore+1);                                 
            }        
            
            console.log(localStorage.getItem('pragmaticScoreSQ'));
            console.log(localStorage.getItem('communityScoreSQ'));
            console.log(localStorage.getItem('ecologicScoreSQ'));

            const test = localStorage.getItem('finalTest');
            if(test === 1) {
                if (this.state.currentQuestion === Individual.length - 1) {            
                    this.setState({                    
                        isEnd: true                
                    });            
                } 
            } else if(test === 2) {
                if (this.state.currentQuestion === Procedural.length - 1) {            
                    this.setState({                    
                        isEnd: true                
                    });            
                } 
            } else {
                if (this.state.currentQuestion === Innovador.length - 1) {            
                    this.setState({                    
                        isEnd: true                
                    });            
                } 
            }
                       
    };
  
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    loadQuiz = () => {           

        const indi = localStorage.getItem('individualScoreFQ');
        const proc = localStorage.getItem('proceduralScoreFQ');
        const inno = localStorage.getItem('innovationScoreFQ');
        
        const {currentQuestion} = this.state;
        this.setState(() => {
            if(indi > proc && indi > inno) {
                localStorage.setItem('finalTest', 1);          
                return {
                    questions: Individual[currentQuestion].question,
                    options: Individual[currentQuestion].options,
                    answers: Individual[currentQuestion].answers
                }
            } else if(proc > indi && proc > inno) {
                localStorage.setItem('finalTest', 2);  
                return {
                    questions: Procedural[currentQuestion].question,
                    options: Procedural[currentQuestion].options,
                    answers: Procedural[currentQuestion].answers
                }
            } else if(inno > indi && inno > proc) {
                localStorage.setItem('finalTest', 3);  
                return {
                    questions: Innovador[currentQuestion].question,
                    options: Innovador[currentQuestion].options,
                    answers: Innovador[currentQuestion].answers
                }
            } 
        })
                
    }

    componentDidMount(){
        this.loadQuiz();
    }

        nextQuestionHandler = (context) => {
            const { answers, answerIdx } = this.state;
            this.setState({
                currentQuestion: this.state.currentQuestion + 1
            })
            //increment individual score if answers is I            
            if(answers[answerIdx] === 'P'){                
                context.plusOnePRScore();                             
            } else if(answers[answerIdx] === 'C'){                
                context.plusOneCOScore();                              
            } else {                
                context.plusOneECScore();                                              
            }             
            
        }

        //updates the component
        componentDidUpdate(prevProps, prevState){
            const {currentQuestion} = this.state;
            if(this.state.currentQuestion !== prevState.currentQuestion) {
                const test = localStorage.getItem('finalTest');
                this.setState(() => {
                    if(test === 1){
                        return {                        
                            //disabled: true,
                            questions: Individual[currentQuestion].question,
                            options: Individual[currentQuestion].options,
                            answers: Individual[currentQuestion].answers
                        }    
                    } else if(test === 2){
                        return {                        
                            //disabled: true,
                            questions: Procedural[currentQuestion].question,
                            options: Procedural[currentQuestion].options,
                            answers: Procedural[currentQuestion].answers
                        }    
                    } else {
                        return {                        
                            //disabled: true,
                            questions: Innovador[currentQuestion].question,
                            options: Innovador[currentQuestion].options,
                            answers: Innovador[currentQuestion].answers
                        } 
                    }
                    
                })
            }
        }

        componentWillUnmount() {
            //localStorage.setItem('indivudualScoreFQ', event.target.value);
        }

        checkAnswer = (answer, answerIdx, answers) => {
            console.log(answerIdx);
            console.log(answers[answerIdx]);        
            this.setState({ 
                userAnswer: answer,
                answerIdx: answerIdx,
                answers: answers,
                disabled: false 
            });            
        };

    render() {
        const { values, handleChange } = this.props;
        const { questions, options, answers, currentQuestion, userAnswer } = this.state;           
        return (            
            <MyProvider>
                <MuiThemeProvider >
                    <React.Fragment>                               
                        <AppBar title="Selecciona la afirmación con la que te sientas más seguro" />                        
                        <br/> <br/>

                        <div className="col-sm-4">                         
                            <h2>{questions}</h2>
                            <span> {`Questions ${currentQuestion} out of ${Individual.length - 1} `} </span>
                                {options.map((option, optionIdx) => (
                                    //<MyContext.Consumer>
                                      //  {context => (
                                            <p 
                                            key={optionIdx}
                                            className ={` ${userAnswer === option ? "selected": null}`}
                                            onClick={() => this.checkAnswer(option, optionIdx, answers)}>                        
                                                {option}
                                            </p>
                                       // )}
                                    
                                    //</MyContext.Consumer>
                                ))}
                        </div>
                        <br/><br/>

                        <Score></Score>

                        {currentQuestion < Individual.length - 1 &&
                            <MyContext.Consumer>
                                {context => (
                                    <RaisedButton
                                        label="Siguiente"            
                                        variant="contained"   
                                        primary={false}             
                                        style={StyleSheet.button}
                                        disabled={this.state.disabled}
                                        onClick={() => this.nextQuestionHandler(context)}
                                    ></RaisedButton> 
                                )}
                            </MyContext.Consumer>
                        }

                        {currentQuestion === Individual.length - 1 &&                    
                            <TextField              
                            hintText="Score"                    
                            value={this.state.individualScore}
                            defaultValue={values.individualScore}
                            //onChange={handleChange('individualScore')}                            
                            /> && 
                            <MyContext.Consumer>
                                {context => (
                                <RaisedButton
                                    label="Terminar encuesta"            
                                    variant="contained"   
                                    primary={true}             
                                    style={StyleSheet.button}  
                                    onClick={() => this.continue(context)}                  
                                ></RaisedButton> 
                                )}
                            </MyContext.Consumer>
                        }
                        <br/> 
                                     
                    </React.Fragment>
                </MuiThemeProvider> 
            </MyProvider>             
        );
    }
  }
  
  export default SecondQuizz;