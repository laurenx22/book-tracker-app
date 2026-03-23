import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabase'
import { useAuth } from '../context/AuthContext'
import type { Book } from '../types'
import StarRating from '../components/StarRating'
import Nav from '../components/Nav'

interface Profile {
  name: string
  username: string
  bio: string
}

const statusLabel: Record<Book['status'], string> = {
  'want-to-read': 'Want to Read',
  'reading': 'Reading',
  'completed': 'Completed',
}

export default function ProfilePage() {
  const { session } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')

  useEffect(() => {
    async function fetchData() {
      const [{ data: profileData, error: profileError }, { data: booksData, error: booksError }] = await Promise.all([
        supabase.from('profiles').select('name, username, bio').eq('id', session!.user.id).single(),
        supabase.from('books').select('*').order('date_added', { ascending: false }),
      ])
      if (profileError || booksError) setFetchError('Could not load profile. Please refresh the page.')
      if (profileData) setProfile(profileData)
      if (booksData) setBooks(booksData)
      setLoading(false)
    }
    fetchData()
  }, [session?.user.id])

  const completed   = books.filter(b => b.status === 'completed')
  const reading     = books.filter(b => b.status === 'reading')
  const wantToRead  = books.filter(b => b.status === 'want-to-read')

  return (
    <div className="profile-page">
      <Nav />
      <div className="page-content">

      {fetchError && <p className="mutation-error">{fetchError}</p>}
      {loading ? <p className="page-loading">Loading profile...</p> : <>

      <div className="profile-info">
        <div className="profile-avatar">{profile?.name?.[0]?.toUpperCase() ?? '?'}</div>
        <div>
          <h2>{profile?.name || 'No name set'}</h2>
          {profile?.username && <p className="profile-username">@{profile.username}</p>}
          {profile?.bio && <p className="profile-bio">{profile.bio}</p>}
          <Link to="/settings" className="profile-edit-link">Edit profile</Link>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-card">
          <span className="stat-number">{books.length}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{reading.length}</span>
          <span className="stat-label">Reading</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{completed.length}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{wantToRead.length}</span>
          <span className="stat-label">Want to Read</span>
        </div>
      </div>

      {[
        { label: 'Reading', list: reading },
        { label: 'Completed', list: completed },
        { label: 'Want to Read', list: wantToRead },
      ].map(({ label, list }) =>
        list.length > 0 && (
          <div key={label} className="profile-section">
            <h3>{label}</h3>
            <div className="profile-book-list">
              {list.map(book => (
                <div key={book.id} className="profile-book-row">
                  <div>
                    <strong>{book.title}</strong>
                    <span className="author"> — {book.author}</span>
                  </div>
                  <div className="profile-book-meta">
                    <span className={`status-badge status-${book.status}`}>{statusLabel[book.status]}</span>
                    <StarRating value={book.rating} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      )}

      {books.length === 0 && <p className="empty">No books yet. <Link to="/">Add some!</Link></p>}

      </>}
      </div>
    </div>
  )
}
