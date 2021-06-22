import React, { useCallback, useState } from "react";

import Header from "../../components/Header";
import "./Home.scss";
import { Pagination } from "@material-ui/lab";

const Home = () => {
  const [cards, setCards] = useState([]);

  const fetchCard = useCallback(() => {}, cards);

  const countCards = useCallback(() => {
    return Math.ceil(cards.length / 8);
  });

  return (
    <div>
      <Header />
      <h2>Welcome on Quizzes world!</h2>
      <div className="cards-list">
        {/* {cards.map((card) => {
          <div className="card">
            <img src={card.img} />
            <h3>{card.title}</h3>
            <p>{card.category}</p>
            <a href={`/quiz/${card.id}`} className="card-link">
              Start quiz
            </a>
          </div>
        })} */}
        <div className="card-wrapper">
          <div className="image-wrapper">
            <img src="https://trinco.loyolacampus.org/wp-content/uploads/2020/04/1_M_eMocrJlVqcHXklugBopA.jpeg" />
          </div>
          <div className="info-wrapper">
            <h3>Quiz test</h3>
            <p>Test</p>
            <a href="" className="card-link">
              Start quiz
            </a>
          </div>
        </div>
        <div className="card-wrapper">
          <div className="image-wrapper">
            <img src="https://trinco.loyolacampus.org/wp-content/uploads/2020/04/1_M_eMocrJlVqcHXklugBopA.jpeg" />
          </div>
          <div className="info-wrapper">
            <h3>Quiz test</h3>
            <p>Test</p>
            <a href="" className="card-link">
              Start quiz
            </a>
          </div>
        </div>
      </div>
      {countCards.length !== 0 && (
        <div className="pagination">
          <Pagination count={countCards} variant="outlined" />
        </div>
      )}
    </div>
  );
};

export default Home;
