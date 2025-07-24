import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/ImageCarousel.module.css"";

const ImageCarousel = ({
  images,
  interval = 5000,
  animationDuration = 500,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(true);

  const imageBeingLoadedRef = useRef(null);
  useEffect(() => {
    if (!images || images.length <= 1) return;

    const autoSlide = setInterval(() => {
      if (!isAnimating) {
        const newIndex = (currentIndex + 1) % images.length;
        startSlide(newIndex, "left");
      }
    }, interval);

    return () => clearInterval(autoSlide);
  }, [currentIndex, isAnimating, images, interval]);

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setSlideDirection("");
      }, animationDuration);
      return () => clearTimeout(timer);
    }
  }, [isAnimating, animationDuration]);

  useEffect(() => {
    if (images && images.length > 0) {
      setIsImageLoading(true);
      const img = new Image();
      img.src = images[currentIndex];

      if (img.complete) {
        setIsImageLoading(false);
      } else {
        img.onload = () => setIsImageLoading(false);
        img.onerror = () => {
          setIsImageLoading(false);
          console.error("Failed to load carousel image:", images[currentIndex]);
        };
      }
    }
  }, [currentIndex, images]);

  const startSlide = (newIndex, direction) => {
    if (isAnimating || newIndex === currentIndex) return;

    setSlideDirection(direction);
    setIsAnimating(true);
    setPreviousIndex(currentIndex);
    setCurrentIndex(newIndex);
  };

  const goToPrev = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    startSlide(newIndex, "right");
  };

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % images.length;
    startSlide(newIndex, "left");
  };

  if (!images || images.length === 0) {
    return <div className={styles.carouselContainer}>No images available.</div>;
  }

  const currentImageUrl = images[currentIndex];
  const previousImageUrl = images[previousIndex];

  return (
    <div className={styles.carouselContainer}>
      {isImageLoading && (
        <div className={styles.imageLoader}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading image...</p>
        </div>
      )}

      {isAnimating && (
        <img
          src={previousImageUrl}
          alt="Previous slide"
          className={`${styles.carouselImage} ${
            styles[`slide${slideDirection === "left" ? "OutLeft" : "OutRight"}`]
          }`}
          style={{ zIndex: 2 }}
        />
      )}

      <img
        src={currentImageUrl}
        alt="Current slide"
        className={`${styles.carouselImage} ${
          isImageLoading ? styles.hidden : styles.fadeIn
        }`}
        style={{ zIndex: 1 }}
      />

      {images.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className={`${styles.carouselButton} ${styles.prev}`}
            disabled={isAnimating || isImageLoading}
          >
            &#10094;
          </button>
          <button
            onClick={goToNext}
            className={`${styles.carouselButton} ${styles.next}`}
            disabled={isAnimating || isImageLoading}
          >
            &#10095;
          </button>

          <div className={styles.carouselIndicators}>
            {images.map((_, index) => (
              <span
                key={index}
                className={`${styles.indicator} ${
                  index === currentIndex ? styles.active : ""
                }`}
                onClick={() =>
                  startSlide(index, index > currentIndex ? "left" : "right")
                }
              ></span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
