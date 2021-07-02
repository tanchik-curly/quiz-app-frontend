import React, { useEffect } from "react";
import { Radio, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

import "./Quiz.scss";
import Scores from "./scores";

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(3),
    },
    button: {
      margin: theme.spacing(1, 1, 0, 0),
    },
  }));
  
const Question = ({questions, scoresData, handleChangeCompleted, submitRef}) => {
    const classes = useStyles();
    const [values, setValues] = React.useState([]);
    const [helperText, setHelperText] = React.useState([]);
    const [isDisabled, setDisabled] = React.useState(false);
    const history = useHistory();
    const { id } = useParams();

    const handleRadioChange = (event, id) => {
        setValues([
          ...values,
          {id:parseInt([id[0]]), value: event.target.value}
        ]);
    };

    const handleLogout = () => {
      localStorage.removeItem("jwtToken");
      history.push("/");
    };

    const checkAnswer = async (values) => {
      await axios.post('http://localhost:8080/options', {
      options: values,
      quizId: id,
    }, {headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('jwtToken') 
    }})
    .then(res => {
      if(res.data.auth && !res.data.auth){
        alert(res.message);
        handleLogout();
      }
      else {
        const newHelperText = [];
        res.data.response.forEach(option => {
          newHelperText.push({id: option.questionId, text: option.message});
        });
        setHelperText(newHelperText);
      }
    })
    .catch(err => {
      console.log(err);
      alert("ERROR: ", err?.response?.data);
      history.push('/');
    })
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      setDisabled(true);
      checkAnswer(values);
      handleChangeCompleted({...scoresData, status: true});
    };

    useEffect(() => {
      setDisabled(scoresData.status);

      if(scoresData.review && scoresData.review.data.length > 0) {
        const newHelperText = [];

        scoresData.review.data.forEach(option => {
          if(option.answer === true) {
            newHelperText.push({id: option.questionId, text: "Correct!"});
          }
          else {
            newHelperText.push({id: option.questionId, text: "Sorry, wrong answer!"});
          }
          setHelperText(newHelperText);
        });
      }
    }, [scoresData]);

    return(
      <>
        {scoresData.status && (<Scores scoresData={scoresData.review}/>)}
        <form onSubmit={handleSubmit} className="quiz-form" >
          {questions && questions.length > 0 && questions.map(question => (
            <div className="question-form">
              {helperText.map(text => {
                return (text.id === question.id && (
                  <FormHelperText>{text.text}</FormHelperText>
                ));
              })} 
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">{question.question}</FormLabel>
                <RadioGroup aria-label={`${question.id}Quiz`} name={`${question.id}Quiz`}
                  value={values[question.id + 'Quiz']} onChange={(e)=> handleRadioChange(e, question.id + 'Quiz')} >
                  {question.Options.map( answer => {
                    return <FormControlLabel value={`${answer.option}`} control={<Radio disabled={isDisabled}/>} 
                      label={`${answer.option}`} />;
                  })}
                </RadioGroup>
              </FormControl>
            </div>
          ))}
          <div className="form-btn">
            <Button type="submit" variant="outlined" color="primary" className={classes.button} disabled={isDisabled}
              ref={submitRef}>
                Finish test
            </Button>
          </div>
        </form>
      </>
    );
};

export default Question;