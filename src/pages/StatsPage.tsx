import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { supabase } from '../supabase'
import type { Book } from '../types'
import Nav from '../components/Nav'

const STATUS_COLORS: Record<string, string> = {
  'Want to Read': '#a5b4fc',
  'Reading':      '#fde68a',
  'Completed':    '#86efac',
}

export default function StatsPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')

  useEffect(() => {
    async function fetchBooks() {
      const { data, error } = await supabase.from('books').select('*')
      if (error) setFetchError('Could not load stats. Please refresh the page.')
      else if (data) setBooks(data)
      setLoading(false)
    }
    fetchBooks()
  }, [])

  const counts = [
    { label: 'Want to Read', count: books.filter(b => b.status === 'want-to-read').length },
    { label: 'Reading',      count: books.filter(b => b.status === 'reading').length },
    { label: 'Completed',    count: books.filter(b => b.status === 'completed').length },
  ]

  const rated = books.filter(b => b.rating !== null)
  const avgRating = rated.length > 0
    ? (rated.reduce((sum, b) => sum + b.rating!, 0) / rated.length).toFixed(1)
    : '—'

  return (
    <div className="stats-page">
      <Nav />
      <div className="page-content">

      {fetchError && <p className="mutation-error">{fetchError}</p>}
      {loading ? <p className="page-loading">Loading stats...</p> : <>

      <div className="stats-summary">
        <div className="stat-card">
          <span className="stat-number">{books.length}</span>
          <span className="stat-label">Total Books</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{counts[2].count}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{avgRating}</span>
          <span className="stat-label">Avg Rating</span>
        </div>
      </div>

      <div className="chart-container">
        <h2>Books by Status</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={counts} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <XAxis dataKey="label" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
              {counts.map(entry => (
                <Cell key={entry.label} fill={STATUS_COLORS[entry.label]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      </>}
      </div>
    </div>
  )
}
