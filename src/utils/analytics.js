export function initAnalytics() {
  // Check if GA is already loaded
  if (window.gtag) return;

  // Add GA4 script
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-D3261D7VLJ';
  document.head.appendChild(script);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', 'G-D3261D7VLJ', {
    page_path: window.location.pathname,
  });
}

// Track custom events
export function trackEvent(eventName, eventParams = {}) {
  if (window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
}

// Track CV downloads
export function trackCVDownload() {
  trackEvent('cv_download', {
    event_category: 'engagement',
    event_label: 'CV Download',
  });
}

// Track contact clicks
export function trackContactClick(method) {
  trackEvent('contact_click', {
    event_category: 'engagement',
    event_label: method, // 'email', 'phone', 'linkedin', etc.
  });
}

// Track project views
export function trackProjectView(projectName) {
  trackEvent('project_view', {
    event_category: 'engagement',
    event_label: projectName,
  });
}

// Track social media clicks
export function trackSocialClick(platform) {
  trackEvent('social_click', {
    event_category: 'engagement',
    event_label: platform,
  });
}
