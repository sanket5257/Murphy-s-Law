'use client'

import React from 'react'

const services = [
  {
    number: '01',
    title: 'Product strategy and design',
    description: 'Great products don\'t just happen, they\'re shaped by insight. We dig into research, audits, and user testing to understand what people need, then translate those findings into smart, intuitive UX solutions where every decision has purpose.',
    image: '/img/01.ProductStrat.jpg'
  },
  {
    number: '02',
    title: 'App and website design',
    description: 'We think outside the box to make sure your product sets itself apart and sets the bar. We build beautiful, intuitive interfaces that are compelling and consistent, powered by scalable design systems.',
    image: '/img/02.App&Web.jpg'
  },
  {
    number: '03',
    title: 'Brand strategy and identity design',
    description: 'Why look like someone else when you want to stand out? Together, we craft unique brand identities across touchpoints with a digital-first mindset. We bring the spark by distilling your brand DNA and getting to the root of what your users actually want.',
    image: '/img/03.Brand.jpg'
  }
]

export default function ServicesSection() {
  return (
    <section className="services" data-theme="light">
      <h2 className="services-title">What we do</h2>
      
      <div className="services-inner">
        {services.map((service) => (
          <div key={service.number} className="service">
            <figure className="media-wrapper image-wrapper">
              <div className="media-inner">
                <img 
                  className="media image lazy loading" 
                  src={service.image}
                  width="880" 
                  height="520" 
                  alt=""
                />
              </div>
            </figure>
            
            <div className="service-content">
              <div className="service-header">
                <h3 className="service-title">{service.title}</h3>
                <span className="service-number">{service.number}</span>
              </div>
              <p className="service-text">{service.description}</p>
            </div>
          </div>
        ))}
        
        <div className="service service-cta">
          <div className="service-content">
            <div className="service-header">
              <h3 className="service-title">
                Discover our services and how we shape purpose-driven digital and branding experiences.
              </h3>
            </div>
            <a href="/services" className="btn" target="_self">
              <span className="btn-bg"></span>
              <span className="btn-text">What We Do</span>
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