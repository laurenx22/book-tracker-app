import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import { useAuth } from '../context/AuthContext'
import Nav from '../components/Nav'

interface Profile {
  name: string
  username: string
  bio: string
}

export default function SettingsPage() {
  const { session, signOut } = useAuth()
  const [profile, setProfile] = useState<Profile>({ name: '', username: '', bio: '' })
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')

  useEffect(() => {
    async function fetchProfile() {
      const { data, error } = await supabase
        .from('profiles')
        .select('name, username, bio')
        .eq('id', session!.user.id)
        .single()
      if (error) setFetchError('Could not load settings. Please refresh the page.')
      else if (data) setProfile(data)
      setLoading(false)
    }
    fetchProfile()
  }, [session?.user.id])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSaved(false)
    const { error } = await supabase
      .from('profiles')
      .upsert({ id: session!.user.id, ...profile })
    if (error) {
      setError(error.message)
    } else {
      setSaved(true)
    }
  }

  return (
    <div className="settings-page">
      <Nav />
      <div className="page-content">
      <div className="settings-wrap">
        <h2>Settings</h2>
        {fetchError && <p className="mutation-error">{fetchError}</p>}
        {loading ? <p className="page-loading">Loading...</p> : <>

        <p className="profile-email">{session!.user.email}</p>
        <form onSubmit={handleSubmit} className="profile-form">
          <label>Name</label>
          <input
            placeholder="Your name"
            value={profile.name}
            onChange={e => setProfile({ ...profile, name: e.target.value })}
          />
          <label>Username</label>
          <input
            placeholder="username"
            value={profile.username}
            onChange={e => setProfile({ ...profile, username: e.target.value })}
          />
          <label>Bio</label>
          <textarea
            placeholder="A little about you..."
            value={profile.bio}
            onChange={e => setProfile({ ...profile, bio: e.target.value })}
          />
          {error && <p className="auth-error">{error}</p>}
          {saved && <p className="profile-saved">Saved!</p>}
          <button type="submit">Save changes</button>
        </form>
        <button onClick={() => signOut()} className="signout-btn">Log out</button>
        </>}
      </div>
      </div>
    </div>
  )
}
