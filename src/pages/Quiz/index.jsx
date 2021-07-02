import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

import "./Quiz.scss";
import Question from "./questions";
import Header from "../../components/Header";
import Timer from './timer';

const Quiz = () => {
  const history = useHistory();
  const [isCompleted, setIsCompleted] = React.useState({status: false});
  const [quizData, setQuizData] = useState([]);
  const submitRef = useRef(null);
  const { id } = useParams();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    history.push("/");
  };

  const fetchData = async () => {
    await axios.get(`http://localhost:8080/quiz/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken') 
      }
    })
    .then(res => {
      if(!res.data.auth){
        alert(res.message);
        handleLogout();
      }
      else {
        setQuizData(res.data.data);
      }
    })
    .catch(err => {
      alert("ERROR: " + err?.response?.data);
      history.push('/');
    })
  };

  const fetchScores = async() => {
    await axios.get(`http://localhost:8080/scores/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken') 
      }
    })
    .then(res => {
      if(!res.data.auth){
        alert(res.message);
        handleLogout();
      }
      else {
        if(res.data.data.length > 0){
          console.log(res.data.data);
          setIsCompleted({status: true, review: res.data});
        }
      }
    })
    .catch(err => {
      alert("ERROR: " + err?.response?.data);
      history.push('/');
    })
  };

  useEffect(() => {
    fetchData();
    fetchScores();
  }, []);

  return (
    <div>
      <Header />
      <div className="question-data question-info">
        <h2>{quizData?.title}</h2>
        <p>{quizData?.description}</p>
      </div>
      <div className="question-info">
          {quizData.minutesToFinish && isCompleted && (
            <div className='timer-container'>
              <Timer timerMinutes={quizData?.minutesToFinish} submitRef={submitRef} status={isCompleted.status} />
            </div>
          )}
          <Question questions={quizData?.Questions} scoresData={isCompleted} handleChangeCompleted={setIsCompleted} 
            submitRef={submitRef} />
      </div>
    </div>
  );
};

export default Quiz;
