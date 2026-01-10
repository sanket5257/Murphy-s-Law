'use client'

import React from 'react'

export default function AboutSection() {
  return (
    <section className="about" data-theme="light">
      <div className="about-inner">
        <div className="about-left">
          <h2 className="about-title">Who we are</h2>
        </div>
        
        <div className="about-right">
          <div className="about-content">
            <div className="about-images">
              <figure className="media-wrapper image-wrapper">
                <div className="media-inner">
                  <img 
                    className="media image lazy loading" 
                    src="/img/whoweare_01.jpg"
                    width="1400" 
                    height="900" 
                    alt=""
                  />
                </div>
              </figure>
              <figure className="media-wrapper image-wrapper">
                <div className="media-inner">
                  <img 
                    className="media image lazy loading" 
                    src="/img/whoweare_02.jpg"
                    width="1400" 
                    height="900" 
                    alt=""
                  />
                </div>
              </figure>
              <figure className="media-wrapper image-wrapper">
                <div className="media-inner">
                  <img 
                    className="media image lazy loading" 
                    src="/img/whoweare_03.jpg"
                    width="1400" 
                    height="900" 
                    alt=""
                  />
                </div>
              </figure>
            </div>
            
            <p className="about-text">
              Estrela Studio is a people-first design studio that cares as much about your 
              business and product as you do. We're big on honesty, collaboration, and good 
              coffee, the foundations of every great partnership. No project is too small for 
              our A-game and we pour the same craft and care into every brief. Our promise is 
              simple: to guide you with a steady, nurturing hand and turn your ideas, big or 
              small, into brands, websites, and experiences that truly matter.
            </p>
            
            <a href="/about" className="btn btn-grey" target="_self">
              <span className="btn-bg"></span>
              <span className="btn-text">Discover Our Spark</span>
              <span className="btn-dot">
                <span className="btn-dot-inner"></span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}