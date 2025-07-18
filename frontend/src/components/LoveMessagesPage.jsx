import React, { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { mockMessages } from '../data/mock';

const LoveMessagesPage = () => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [heartScale, setHeartScale] = useState(1);
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    // Set initial message
    setCurrentMessage(mockMessages[0]);
  }, []);

  const handleHeartClick = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setHeartScale(1.2);
    
    // Generate sparkles
    const newSparkles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 360,
      scale: Math.random() * 0.5 + 0.5,
    }));
    setSparkles(newSparkles);
    
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * mockMessages.length);
      setCurrentMessage(mockMessages[randomIndex]);
      setHeartScale(1);
      setIsAnimating(false);
      
      // Clear sparkles after animation
      setTimeout(() => setSparkles([]), 1000);
    }, 300);
  };

  return (
    <div className="love-page">
      <div className="love-container">
        <div className="decorative-hearts">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="floating-heart"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${6 + Math.random() * 4}s`,
              }}
            >
              <Heart size={8 + Math.random() * 12} />
            </div>
          ))}
        </div>

        <div className="main-content">
          <div className="title-section">
            <h1 className="love-title">
              Messages of Love
            </h1>
            <p className="love-subtitle">
              Touch the heart to discover beautiful messages
            </p>
          </div>

          <div className="heart-container">
            <div 
              className={`interactive-heart ${isAnimating ? 'pulse' : ''}`}
              onClick={handleHeartClick}
              style={{ transform: `scale(${heartScale})` }}
            >
              <Heart 
                size={120} 
                className="heart-icon" 
                fill="currentColor"
              />
              
              {sparkles.map((sparkle) => (
                <div
                  key={sparkle.id}
                  className="sparkle"
                  style={{
                    left: `${sparkle.x}%`,
                    top: `${sparkle.y}%`,
                    transform: `rotate(${sparkle.rotation}deg) scale(${sparkle.scale})`,
                  }}
                >
                  <Sparkles size={16} />
                </div>
              ))}
            </div>
          </div>

          <div className="message-container">
            <div className="message-card">
              <div className="message-content">
                <p className="love-message">
                  {currentMessage}
                </p>
              </div>
              <div className="message-decoration">
                <Heart size={20} className="message-heart" />
              </div>
            </div>
          </div>

          <div className="interaction-hint">
            <p className="hint-text">
              💕 Click the heart to see more loving messages 💕
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoveMessagesPage;