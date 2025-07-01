// src/components/VideoHero.jsx
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './VideoHero.css';
import { FaShoppingCart, FaSearch, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import pomVideo from '../assets/video/pom.mp4';
import leafImage from '../assets/images/leaf.png';
import leaf1Image from '../assets/images/leaf1.png';

gsap.registerPlugin(ScrollTrigger);

const VideoHero = () => {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    
    if (!video || !wrapper || !content) return;

    // Set video duration
    const videoDuration = 5.5;
    let scrollTrigger = null;
    
    // Video ready handlers
    const handleVideoReady = () => {
      
      setIsVideoLoaded(true);
      video.currentTime = 0;
      video.pause();
    };
    
    const handleVideoLoadStart = () => {
      
      setIsVideoLoaded(false);
    };

    const handleVideoCanPlay = () => {
      
      if (!isVideoLoaded) {
        handleVideoReady();
      }
    };

    const handleVideoLoadedData = () => {
      
      if (!isVideoLoaded) {
        handleVideoReady();
      }
    };

    const handleVideoError = (error) => {
      console.error('Video error:', error);
    };
    
    // Add all video event listeners
    video.addEventListener('loadstart', handleVideoLoadStart);
    video.addEventListener('loadedmetadata', handleVideoReady);
    video.addEventListener('canplay', handleVideoCanPlay);
    video.addEventListener('loadeddata', handleVideoLoadedData);
    video.addEventListener('error', handleVideoError);

    // Create scroll trigger for pinning and video control
    const createScrollTrigger = () => {
      scrollTrigger = ScrollTrigger.create({
        trigger: wrapper,
        start: 'top top',
        end: '+=200vh',
        scrub: 1,
        pin: true,
        pinSpacing: true,
        markers: false,
        onUpdate: (self) => {
          if (!isVideoLoaded || !video.duration || isNaN(video.duration)) {
           
            return;
          }
          
          const progress = self.progress;
          
          // Update video time based on scroll progress
          const newTime = progress * videoDuration;
          
          // Only update if the difference is significant enough
          if (Math.abs(video.currentTime - newTime) > 0.01) {
            try {
              video.currentTime = newTime;
            } catch (error) {
              console.log('Video time update error:', error);
            }
          }
          
          // Fade out content near the end (last 20%)
          if (progress > 0.8) {
            const fadeProgress = (progress - 0.8) / 0.2;
            content.style.opacity = Math.max(0, 1 - fadeProgress);
          } else {
            content.style.opacity = 1;
          }
        },
        onLeave: () => {
          if (isVideoLoaded && video.duration && !isNaN(video.duration)) {
            try {
              video.currentTime = videoDuration;
            } catch (error) {
              console.log('Video end time error:', error);
            }
          }
        },
        onEnterBack: () => {
          content.style.opacity = 1;
        },
        onRefresh: () => {
          if (isVideoLoaded && scrollTrigger && video.duration && !isNaN(video.duration)) {
            const progress = scrollTrigger.progress;
            try {
              video.currentTime = progress * videoDuration;
            } catch (error) {
              console.log('Video refresh error:', error);
            }
          }
        },
        onRefreshInit: () => {
          // Reset video to beginning when refreshing
          if (isVideoLoaded && video.duration && !isNaN(video.duration)) {
            try {
              video.currentTime = 0;
            } catch (error) {
              console.log('Video reset error:', error);
            }
          }
        }
      });
    };

    // Initialize scroll trigger
    createScrollTrigger();

    // Handle window resize
    const handleResize = () => {
      if (scrollTrigger) {
        scrollTrigger.refresh();
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      if (scrollTrigger) {
        scrollTrigger.kill();
      }
      window.removeEventListener('resize', handleResize);
      video.removeEventListener('loadstart', handleVideoLoadStart);
      video.removeEventListener('loadedmetadata', handleVideoReady);
      video.removeEventListener('canplay', handleVideoCanPlay);
      video.removeEventListener('loadeddata', handleVideoLoadedData);
      video.removeEventListener('error', handleVideoError);
    };
  }, [isVideoLoaded]);

  return (
    <div className="video-hero">
      <div className="video-hero-wrapper" ref={wrapperRef}>
        <div className="video-hero-content" ref={contentRef}>
          <h2 className="video-organic">PREMIUM</h2>
          <h1 className="video-headline">DISCOVER AMAZING PRODUCTS</h1>
          <p className="video-subtitle">Shop the best deals on quality products</p>
          <div className="video-cta-buttons">
            <Link to="/search" className="video-cta-primary">
              <FaSearch className="mr-2" /> Shop Now
            </Link>
            <Link to="/cart" className="video-cta-secondary">
              <FaShoppingCart className="mr-2" /> View Cart
            </Link>
          </div>
        </div>

        <div className="video-sequence-container">
          <video
            ref={videoRef}
            src={pomVideo}
            className="video-sequence-video"
            muted
            playsInline
            preload="auto"
          />
          <div className="video-overlay"></div>
          <img src={leafImage} alt="" className="video-leaf" />
          <img src={leaf1Image} alt="" className="video-leaf1" />
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
  );
};

export default VideoHero;