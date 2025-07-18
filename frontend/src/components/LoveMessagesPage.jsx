import React, { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { mockMessages } from '../data/mock';

const LoveMessagesPage = () => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [heartScale, setHeartScale] = useState(1);
  const [sparkles, setSparkles] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  const handleHeartClick = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setHeartScale(1.15);
    
    // Hide previous message
    setShowMessage(false);
    
    // Generate sparkles
    const newSparkles = Array.from({ length: 12 }, (_, i) => ({
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
      setShowMessage(true);
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
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="floating-heart"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 4}s`,
              }}
            >
              <Heart size={6 + Math.random() * 8} />
            </div>
          ))}
        </div>

        <div className="main-content">
          <div className="heart-section">
            {showMessage && (
              <div className="message-bubble">
                <div className="bubble-content">
                  <p className="love-message">
                    {currentMessage}
                  </p>
                </div>
                <div className="bubble-tail"></div>
              </div>
            )}
            
            <div className="heart-container">
              <div 
                className={`interactive-heart ${isAnimating ? 'pulse' : ''}`}
                onClick={handleHeartClick}
                style={{ transform: `scale(${heartScale})` }}
              >
                <Heart 
                  size={200} 
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
                    <Sparkles size={20} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoveMessagesPage;