export function createPageUrl(pageName) {
  const routes = {
    'Home': '/',
    'Privacy': '/privacy',
    'Terms': '/terms',
    'ClientPortal': '/portal'
  }
  return routes[pageName] || '/'
}
