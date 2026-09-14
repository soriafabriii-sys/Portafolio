import { useEffect, useRef, useState } from 'react';
import './SpriteAnimation.css';

export default function SpriteAnimation({ image, fps = 12, alt = '' }) {
  const containerRef = useRef(null);
  const sheetRef = useRef(null);
  const frameRef = useRef(0);
  const lastFrameTimeRef = useRef(0);
  const animationFrameRef = useRef(null);
  const [sprite, setSprite] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: '120px' }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    frameRef.current = 0;
    lastFrameTimeRef.current = 0;
    setSprite(null);
  }, [image]);

  useEffect(() => {
    if (!sprite || !isVisible || sprite.totalFrames <= 1) return undefined;

    const frameDuration = 1000 / Math.max(1, fps);
    const animate = (timestamp) => {
      if (!lastFrameTimeRef.current) lastFrameTimeRef.current = timestamp;
      if (timestamp - lastFrameTimeRef.current >= frameDuration) {
        const elapsedFrames = Math.floor((timestamp - lastFrameTimeRef.current) / frameDuration);
        frameRef.current = (frameRef.current + elapsedFrames) % sprite.totalFrames;
        lastFrameTimeRef.current = timestamp;
      }
      if (sheetRef.current) {
        sheetRef.current.style.transform = `translateX(-${frameRef.current * (100 / sprite.totalFrames)}%)`;
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
      lastFrameTimeRef.current = 0;
    };
  }, [fps, isVisible, sprite?.totalFrames]);

  const handleImageLoad = (event) => {
    const loadedImage = event.currentTarget;
    const frameSize = loadedImage.naturalHeight;
    const totalFrames = frameSize ? Math.max(1, Math.floor(loadedImage.naturalWidth / frameSize)) : 1;
    setSprite({ frame: 0, frameSize, totalFrames });
  };

  return (
    <div ref={containerRef} className="sprite-animation" aria-label={alt} role={alt ? 'img' : undefined}>
      <img
        src={image}
        alt={alt}
        ref={sheetRef}
        className="sprite-animation-sheet"
        onLoad={handleImageLoad}
        draggable="false"
        style={sprite ? { transform: 'translateX(0)' } : undefined}
      />
    </div>
  );
}
