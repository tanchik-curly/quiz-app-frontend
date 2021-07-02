import React, { useState, useEffect } from 'react';


const Scores = ({scoresData}) => {
    const [scores, setScores] = useState(0);
    const [questionNum, setQuestionNum] = useState(scoresData.data.length);

    useEffect(() => {
        let trueNum = 0;
        scoresData.data.forEach(review => {
            if(review.answer === true)
            trueNum++;
        });
        setScores(trueNum);
    }, [scoresData]);
    
    return (
        <div className='scores-container'>
            <span>Your scores:</span>
            <span>{scores}</span> / <span>{questionNum}</span>
        </div>
    );
};

export default Scores;