import React, { useRef, useEffect } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import './VideoHero.css';
import { FaShoppingCart, FaSearch, FaHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const VideoHero = () => {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    let scrollTrigger;

    const update = () => {
      if (video && video.duration && scrollTrigger) {
        const progress = scrollTrigger.progress;
        const time = progress * video.duration;
        video.currentTime = time;
      }
      requestAnimationFrame(update);
    };

    requestAnimationFrame(update);

    scrollTrigger = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "top top",
      end: "+=1500",
      scrub: true,
      pin: true,
      markers: false,
    });

    gsap.to(contentRef.current, {
      y: -100,
      opacity: 0,
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "+=500",
        scrub: true,
        onLeave: () => {
          contentRef.current.style.display = "none";
        },
        onEnterBack: () => {
          contentRef.current.style.display = "";
        }
      }
    });

    setTimeout(() => {
      const src = video.currentSrc || video.src;
      if (window.fetch) {
        fetch(src)
          .then(res => res.blob())
          .then(blob => {
            const t = video.currentTime;
            video.src = URL.createObjectURL(blob);
            video.currentTime = t + 0.01;
          });
      }
    }, 500);

    const once = (el, event, fn) => {
      const handler = (e) => {
        el.removeEventListener(event, handler);
        fn(e);
      };
      el.addEventListener(event, handler);
    };

    once(document.documentElement, 'touchstart', () => {
      if (video) {
        video.play();
        video.pause();
      }
    });

    return () => {
      if (scrollTrigger) scrollTrigger.kill();
    };
  }, []);

  return (
    <>
      <div className="video-hero">
        <div className="video-hero-wrapper" ref={wrapperRef}>
          <nav className="video-navbar">
            <div className="video-logo">
              <img src="/src/assets/logo.png" alt="Ghar Bazaar" className="h-10" />
              <span className='text-[24px] font-bold text-white'>GHAR BAZAAR</span>
            </div>
            
          </nav>
        
          <div className="video-hero-content" ref={contentRef}>
            <h2 className="video-organic">PREMIUM</h2>
            <h1 className="video-headline">DISCOVER AMAZING PRODUCTS</h1>
            <p className="video-subtitle">Shop the best deals on quality products</p>
            <div className="video-cta-buttons">
              <Link to="/search" className="video-cta-primary">
                <FaSearch className="mr-2" />
                Shop Now
              </Link>
              <Link to="/cart" className="video-cta-secondary">
                <FaShoppingCart className="mr-2" />
                View Cart
              </Link>
            </div>
          </div>
          
          <div className="video-sequence-container">
            <video
              ref={videoRef}
              src="/src/assets/video/pom.mp4"
              className="video-sequence-video"
              muted
              playsInline
              preload="auto"
            />
            <div className="video-overlay"></div>
            <img src="/src/assets/images/leaf.png" alt="" className='video-leaf'/>
            <img src="/src/assets/images/leaf1.png" alt="" className='video-leaf1'/>
          </div>
          
          <div className="video-decoration">
            <div className="video-floating-icon">
              <FaHeart className="text-primary-200" size={24} />
            </div>
            <div className="video-floating-icon-delayed">
              <FaShoppingCart className="text-accent-200" size={24} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoHero; 