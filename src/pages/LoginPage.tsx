import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    const { error } = await signIn(email, password)
    if (error) {
      setError(error.message)
      setSubmitting(false)
    } else {
      navigate('/')
    }
  }

  return (
    <div className="auth-layout">
      <div className="auth-panel">
        <h1>Bookshelf Tracker</h1>
        <p className="auth-tagline">Your personal reading life, all in one place.</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Log in</h2>
          {error && <p className="auth-error">{error}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={submitting}>{submitting ? 'Logging in...' : 'Log in'}</button>
          <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </form>
      </div>
      <div className="auth-photo" role="presentation" aria-hidden="true" />
    </div>
  )
}
