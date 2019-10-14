import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Procedural} from './Procedural';
import Style from '../styles.css';

export class SecondQuizz_Procedural extends Component {
    state = {
        currentQuestion: 0,
        myAnswer: null,
        options: [],
        score: 0,
        disabled: true,
        isEnd: false,
        individualScore: 0,
        proceduralScore: 0,
        innovationScore: 0
    };
    
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
        if (this.state.currentQuestion === Procedural.length - 1) {            
            this.setState({                
                isEnd: true                
            });
        }                
    };
    
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };
    
    individual = e => {
        e.preventDefault();
        this.props.individualScoreUp();
    }
    
    loadQuiz = () => {
        const {currentQuestion} = this.state;
        this.setState(() => {
            return {
                questions: Procedural[currentQuestion].question,
                options: Procedural[currentQuestion].options,
                answers: Procedural[currentQuestion].answers
            }
        })
    }
    
    componentDidMount(){
        this.loadQuiz();
    }
    
    nextQuestionHandler = () => {
        const { userAnswer, answer, answers, answerIdx, individualScore, proceduralScore, innovationScore } = this.state;
        this.setState({
            currentQuestion: this.state.currentQuestion + 1
        })
        console.log(this.state.currentQuestion)
        //increment individual score if answers is I
        
        console.log("Ind Score: ");
        console.log(individualScore);
        console.log("Proc Score: ");
        console.log(proceduralScore);
        console.log("Innov Score: ");
        console.log(innovationScore);
        
        if(answers[answerIdx] === 'I'){
            //setTimeout(this.nextQuestionHandler, 2000)
            this.setState({
                individualScore: individualScore + 1
            })                
        } else if(answers[answerIdx] === 'P'){
            this.setState({
                proceduralScore: proceduralScore + 1
            }) 
        } else {
            this.setState({
                innovationScore: innovationScore + 1
            })                
        }
        //setTimeout(this.nextQuestionHandler, 500)
        
    }
    
    //updates the component Procedural
    componentDidUpdate(prevProps, prevState){
        const {currentQuestion} = this.state;
        if(this.state.currentQuestion !== prevState.currentQuestion) {
            this.setState(() => {
                return {
                    disabled: true,
                    questions: Procedural[currentQuestion].question,
                    options: Procedural[currentQuestion].options,
                    answers: Procedural[currentQuestion].answers
                }
            })
        }
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
            <MuiThemeProvider >
            <React.Fragment>          
            <AppBar title="Selecciona la afirmación con la que te sientas más seguro" />
            <br/>
            <div className="col-sm-4"> 
            <h2>{questions}</h2>
            <span> {`Questions ${currentQuestion} out of ${Procedural.length - 1} `} </span>
            {options.map((option, optionIdx) => (
                <p 
                key={optionIdx}
                className ={` ${userAnswer === option ? "selected": null}`}
                onClick={() => this.checkAnswer(option, optionIdx, answers)}>                        
                {option}
                </p>
                ))}
                </div>
                <br/><br/><br/>
                {currentQuestion < Procedural.length - 1 &&
                    <RaisedButton
                    label="Siguiente"            
                    variant="contained"   
                    primary={false}             
                    style={StyleSheet.button}
                    disabled={this.state.disabled}
                    onClick={this.nextQuestionHandler}
                    ></RaisedButton> 
                }
                {currentQuestion === Procedural.length - 1 &&
                    <RaisedButton
                    label="Terminar encuesta"            
                    variant="contained"   
                    primary={true}             
                    style={StyleSheet.button}  
                    onClick={this.continue}                  
                    ></RaisedButton> 
                }
                
                </React.Fragment>
                </MuiThemeProvider>
                );
            }
        }
        
        export default SecondQuizz;