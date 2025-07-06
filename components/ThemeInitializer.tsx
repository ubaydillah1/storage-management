const ThemeInitializer = () => {
  const script = `
    (function() {
      try {
        const theme = localStorage.getItem('theme') || 'light';
        
        document.documentElement.classList.remove('dark');
        document.documentElement.removeAttribute('data-theme');

        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else if (theme !== 'light') {
          document.documentElement.setAttribute('data-theme', theme);
        }
      } catch (e) {
        // Ignore errors in case localStorage is disabled
      }
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
};

export default ThemeInitializer;
