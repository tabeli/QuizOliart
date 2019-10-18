import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {QuizData} from './QuizData';
import {QuizData2} from './QuizData2';
import {QuizData3} from './QuizData3';
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
                      <p> Individual score {context.state.individualScore} </p>
                      <p> Procedural score {context.state.proceduralScore} </p>
                      <p> Innovation score {context.state.innovationScore} </p>                      
                  </React.Fragment>    
                ); } }
          </MyContext.Consumer>
        </div>
      )    
    }
}

export class FirstQuizz extends Component {
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
            if(answers[answerIdx] === 'I'){
                console.log("Si hago algo");
                context.plusOneIScore();
                localStorage.setItem('individualScoreFQ', context.state.individualScore+1);
                localStorage.setItem('proceduralScoreFQ', context.state.proceduralScore); 
                localStorage.setItem('innovationScoreFQ', context.state.innovationScore);                                 
            } else if(answers[answerIdx] === 'P'){
                console.log("Si hago algo2");
                context.plusOnePScore();
                localStorage.setItem('individualScoreFQ', context.state.individualScore);
                localStorage.setItem('proceduralScoreFQ', context.state.proceduralScore+1); 
                localStorage.setItem('innovationScoreFQ', context.state.innovationScore);                  
            } else {
                console.log("Si hago algo3");
                context.plusOneINScore();
                localStorage.setItem('individualScoreFQ', context.state.individualScore);
                localStorage.setItem('proceduralScoreFQ', context.state.proceduralScore); 
                localStorage.setItem('innovationScoreFQ', context.state.innovationScore+1);                               
            }        
            
        const rand = localStorage.getItem('randomTest');
            if(rand === 1) {
                if (this.state.currentQuestion === QuizData.length - 1) {            
                    this.setState({                    
                        isEnd: true                
                    });            
                } 
            } else if(rand === 2) {
                if (this.state.currentQuestion === QuizData2.length - 1) {            
                    this.setState({                    
                        isEnd: true                
                    });            
                } 
            } else {
                if (this.state.currentQuestion === QuizData3.length - 1) {            
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
        const min = 1;
        const max = 3;
        var rand = Math.floor(Math.random() * max) + 1;
        console.log("random:", rand);    

        localStorage.setItem('randomTest', rand);          

        const {currentQuestion} = this.state;
        this.setState(() => {
            if(rand === 1){
                return {
                    questions: QuizData[currentQuestion].question,
                    options: QuizData[currentQuestion].options,
                    answers: QuizData[currentQuestion].answers
                }
            }
            if(rand === 2){
                return {
                    questions: QuizData2[currentQuestion].question,
                    options: QuizData2[currentQuestion].options,
                    answers: QuizData2[currentQuestion].answers
                }
            } else {
                return {
                    questions: QuizData3[currentQuestion].question,
                    options: QuizData3[currentQuestion].options,
                    answers: QuizData3[currentQuestion].answers
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
            if(answers[answerIdx] === 'I'){
                context.plusOneIScore();
                //setTimeout(this.nextQuestionHandler, 2000)                                
                //this.setState({
                //    individualScore: individualScore + 1                
                //})                                
            } else if(answers[answerIdx] === 'P'){
                context.plusOnePScore();
                //this.setState({
                    //proceduralScore: proceduralScore + 1
                //}) 
            } else {
                context.plusOneINScore();
                //this.setState({
                    //innovationScore: innovationScore + 1
                //})                
            }            
            
        }

        //updates the component
        componentDidUpdate(prevProps, prevState){
            const {currentQuestion} = this.state;
            if(this.state.currentQuestion !== prevState.currentQuestion) {
                const rand = localStorage.getItem('randomTest');
                this.setState(() => {
                    if(rand === 1){
                        return {                        
                            disabled: true,
                            questions: QuizData[currentQuestion].question,
                            options: QuizData[currentQuestion].options,
                            answers: QuizData[currentQuestion].answers
                        }    
                    } else if(rand === 2){
                        return {                        
                            disabled: true,
                            questions: QuizData2[currentQuestion].question,
                            options: QuizData2[currentQuestion].options,
                            answers: QuizData2[currentQuestion].answers
                        }    
                    } else {
                        return {                        
                            disabled: true,
                            questions: QuizData3[currentQuestion].question,
                            options: QuizData3[currentQuestion].options,
                            answers: QuizData3[currentQuestion].answers
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

            //context.plusOneIScore();
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
                            <span> {`Questions ${currentQuestion} out of ${QuizData.length - 1} `} </span>
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

                        {/*<Score></Score>*/}

                        {currentQuestion < QuizData.length - 1 &&
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

                        {currentQuestion === QuizData.length - 1 &&                    
                            <TextField              
                            hintText="Score"                    
                            //value={this.state.individualScore}
                            //defaultValue={values.individualScore}
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
                        <br/> <br/> <br/> <br/> <br/> <br/> 
                                     
                    </React.Fragment>
                </MuiThemeProvider> 
            </MyProvider>             
        );
    }
  }
  
  export default FirstQuizz;