import { useState, useEffect } from 'react';

export function useWindowDimensions() {

  const hasWindow = typeof window !== 'undefined';

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return {
      width,
      height,
    };
  }

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    if (hasWindow) {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [hasWindow]);

  return windowDimensions;
}

export function gAnalyticsEvent(event) {
  return window.dataLayer.push({'event': event});
}

export function getDeviceType() {
  const platform = navigator.platform;
  const device = /iphone|ipad|ipod|android|webos|blackberry|windows phone/.test(platform)
    ? "mobile"
    : "desktop";
    
  return device;
}

// Check if string
export function isString(string) {
  if(typeof string === 'string')
    return true;
  else
    return false;
}

// Capitalize first string letter
export function ucFirst(string) {
  if(isString(string))
    return string.charAt(0).toUpperCase() + string.slice(1);
  else
    return string;
}

export function camelize(string) {
  return string.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}