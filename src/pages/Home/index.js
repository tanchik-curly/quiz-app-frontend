import React, { useCallback, useEffect, useState } from "react";

import Header from "../../components/Header";
import "./Home.scss";
import { Pagination } from "@material-ui/lab";
import axios from "axios";

const Home = () => {
  const [cards, setCards] = useState([]);
  const defaultPicture =
    "https://trinco.loyolacampus.org/wp-content/uploads/2020/04/1_M_eMocrJlVqcHXklugBopA.jpeg";

  const fetchCard = async () => {
    await axios
      .get("http://localhost:8080/quizzes")
      .then((res) => {
        setCards(res.data.data);
      })
      .catch((err) => {
        console.log("ERROR: " + err?.response?.data);
      });
  };

  useEffect(() => {
    fetchCard();
  }, []);

  const countCards = useCallback(() => {
    return Math.ceil(cards.length / 8);
  });

  return (
    <div>
      <Header />
      <h2>Welcome on Quizzes world!</h2>
      <div className="cards-list">
        {cards.map((card) => {
          return (
            <div className="card-wrapper">
              <div className="image-wrapper">
                <img src={card.image ? `${card.image}` : defaultPicture} />
              </div>
              <div className="info-wrapper">
                <h3>{card.title}</h3>
                <a href={`/quiz/${card.id}`} className="card-link">
                  Start quiz
                </a>
              </div>
            </div>
          );
        })}
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
