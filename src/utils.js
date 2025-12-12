export const createPageUrl = (pageName) => {
  const routes = {
    'Home': '/',
    'Privacy': '/privacy',
    'Terms': '/terms'
  };
  return routes[pageName] || '/';
};
