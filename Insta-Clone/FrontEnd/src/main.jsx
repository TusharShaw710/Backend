import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './features/auth/auth.context.jsx'
import { PostProvider } from './features/post/post.context.jsx'
import "./style.scss"

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <PostProvider>

      <App />
    </PostProvider>
  </AuthProvider>,
  
)
