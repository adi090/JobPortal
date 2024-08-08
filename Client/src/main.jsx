import React from 'react'
import ReactDOM from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Router/Router.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
 <Auth0Provider
    domain="dev-eposaqanusm18xmx.us.auth0.com"
    clientId="8lJyP5jof8fJE2UzFKbZjdPMqEQO3QeC"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
   <RouterProvider router={router} />
  </Auth0Provider>,
)
 