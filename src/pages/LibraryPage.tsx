import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../supabase'
import type { Book } from '../types'
import BookList from '../components/BookList'
import BookForm from '../components/BookForm'
import FilterBar from '../components/FilterBar'
import Nav from '../components/Nav'

export default function LibraryPage() {
  const { session } = useAuth()
  const [books, setBooks] = useState<Book[]>([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [sortAZ, setSortAZ] = useState(true)
  const [view, setView] = useState<'grid' | 'list'>(
    () => (localStorage.getItem('bookshelf_view') as 'grid' | 'list') ?? 'grid'
  )
  const [editingBook, setEditingBook] = useState<Book | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [mutationError, setMutationError] = useState('')
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')

  useEffect(() => {
    async function fetchBooks() {
      const { data, error } = await supabase.from('books').select('*').order('date_added', { ascending: false })
      if (error) setFetchError('Could not load your books. Please refresh the page.')
      else if (data) setBooks(data)
      setLoading(false)
    }
    fetchBooks()
  }, [])

  function handleToggleView() {
    setView(v => {
      const next = v === 'grid' ? 'list' : 'grid'
      localStorage.setItem('bookshelf_view', next)
      return next
    })
  }

  async function handleSave(data: Omit<Book, 'id' | 'date_added'>) {
    setMutationError('')
    if (editingBook) {
      const { data: updated, error } = await supabase
        .from('books')
        .update(data)
        .eq('id', editingBook.id)
        .select()
        .single()
      if (error) { setMutationError('Failed to update book. Please try again.'); return }
      if (updated) setBooks(books.map(b => b.id === editingBook.id ? updated : b))
    } else {
      const { data: inserted, error } = await supabase
        .from('books')
        .insert({ ...data, user_id: session!.user.id })
        .select()
        .single()
      if (error) { setMutationError('Failed to add book. Please try again.'); return }
      if (inserted) setBooks([inserted, ...books])
    }
    setShowForm(false)
    setEditingBook(null)
  }

  async function handleDelete(id: string) {
    if (!window.confirm('Delete this book? This cannot be undone.')) return
    setMutationError('')
    const { error } = await supabase.from('books').delete().eq('id', id)
    if (error) { setMutationError('Failed to delete book. Please try again.'); return }
    setBooks(books.filter(b => b.id !== id))
  }

  function handleEdit(book: Book) {
    setEditingBook(book)
    setShowForm(true)
  }

  function handleCancel() {
    setShowForm(false)
    setEditingBook(null)
  }

  const filtered = books
    .filter(b => filter === 'all' || b.status === filter)
    .filter(b =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => sortAZ ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title))

  return (
    <div className="library-page">
      <Nav />
      <div className="page-content">

      <div className="library-heading">
        <h2>My Library</h2>
        <button onClick={() => setShowForm(true)}>+ Add Book</button>
      </div>

      <FilterBar
        search={search}
        filter={filter}
        sortAZ={sortAZ}
        view={view}
        onSearch={setSearch}
        onFilter={setFilter}
        onToggleSort={() => setSortAZ(v => !v)}
        onToggleView={handleToggleView}
      />

      {fetchError && <p className="mutation-error">{fetchError}</p>}
      {mutationError && <p className="mutation-error">{mutationError}</p>}

      {loading ? <p className="page-loading">Loading your books...</p> : (
        <BookList books={filtered} view={view} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      {showForm && (
        <BookForm book={editingBook} onSave={handleSave} onCancel={handleCancel} />
      )}

      </div>
    </div>
  )
}
