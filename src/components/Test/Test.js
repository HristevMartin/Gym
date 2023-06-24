import React, { useEffect, useState } from 'react';

export const ScrollTest = () => {
  const [isVisible, setVisible] = useState(false);

  const toggleVisibility = () => {
    console.log("Scroll position:", window.pageYOffset);
    if (document.documentElement.scrollTop > 0) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  console.log('show me isVisible', isVisible)

  return (
    <div>
      <div style={{color: 'white', height: '2000px' }}>Scrollable content</div>
      {isVisible && <button>Scroll to top</button>}
    </div>
  );
}

export default ScrollTest;
