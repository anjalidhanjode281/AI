import React, {useState, useEffect} from 'react'
import style from "../styles/scroll.module.css"

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };

      const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      };
    
      useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
      }, []);
    
    
  return (
    <div className={style.scrollToTop}>
       {
       isVisible && (
        <div onClick={scrollToTop} style={styles.scrollToTopBtn}>
         🔼
        </div>
      )
      }
    </div>
  )
}

export default ScrollToTopButton


const styles = {
    scrollToTopBtn: {
      position: 'fixed',
      bottom: '2%',
      right: '2%',
      cursor: 'pointer',
      backgroundColor: '#000',
      color: '#FFF',
      padding: '10px 20px',
      borderRadius: '4px',
      zIndex: 1000
    }
  };