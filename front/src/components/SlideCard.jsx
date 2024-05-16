// SlideCard.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import '../../node_modules/swiper/swiper-bundle.min.css';
import '../../node_modules/swiper/modules/navigation.min.css';
import '../../node_modules/swiper/modules/pagination.min.css';
import './SlideCard.css';

import SwiperCore from 'swiper/core';

SwiperCore.use([Navigation, Pagination]);

const SlideCard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedProjects, setLikedProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/');
        setProjects(response.data.project);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLike = (pronac) => {
    if (!likedProjects.includes(pronac)) {
      setLikedProjects([...likedProjects, pronac]);
    } else {
      setLikedProjects(likedProjects.filter(item => item !== pronac));
    }
  };

  return (
    <div className="swiper-container">
      <Swiper
        spaceBetween={10}
        slidesPerView={3}
        navigation={true}
        pagination={{ clickable: true }}
        className="mySwiper"
      >
        {projects.map(project => (
          <SwiperSlide key={project.pronac}>
            <div className="slide-card">
              <h3 className="project-title">ROUANET</h3>
              <p className="project-name">{project.nome}</p>
              <p className="project-location">{project.municipio}-{project.uf}</p>
              <p className="project-accessibility">{project.acessibilidade}</p>

              <div className="project-values">
                <div className="project-value">
                  <p className="project-label">Aprovado:</p>
                  <p className="project-amount">{project.valor_aprovado}</p>
                </div>
                <div className="project-value">
                  <p className="project-label">Captado:</p>
                  <p className="project-amount">{project.valor_captado}</p>
                </div>
              </div>

              <div className="project-actions">
                <span
                  className={likedProjects.includes(project.pronac) ? "heart-icon liked" : "heart-icon"}
                  onClick={() => handleLike(project.pronac)}
                  role="img"
                  aria-label="heart"
                >
                  <button className="add-button">ADICIONAR</button>
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-pagination"></div>
    </div>
  );
};

export default SlideCard;
