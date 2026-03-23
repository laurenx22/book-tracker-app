import { useState } from 'react'
import type { Book } from '../types'
import StarRating from './StarRating'

interface Props {
  book: Book | null
  onSave: (data: Omit<Book, 'id' | 'date_added'>) => void
  onCancel: () => void
}

export default function BookForm({ book, onSave, onCancel }: Props) {
  const [title, setTitle] = useState(book?.title ?? '')
  const [author, setAuthor] = useState(book?.author ?? '')
  const [status, setStatus] = useState<Book['status']>(book?.status ?? 'want-to-read')
  const [rating, setRating] = useState<number | null>(book?.rating ?? null)
  const [review, setReview] = useState(book?.review ?? '')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSave({ title, author, status, rating, review })
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{book ? 'Edit Book' : 'Add Book'}</h2>
        <form onSubmit={handleSubmit} className="book-form">
          <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
          <input placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} required />
          <select value={status} onChange={e => setStatus(e.target.value as Book['status'])}>
            <option value="want-to-read">Want to Read</option>
            <option value="reading">Reading</option>
            <option value="completed">Completed</option>
          </select>
          <label>Rating</label>
          <StarRating value={rating} onChange={setRating} />
          <textarea placeholder="Review (optional)" value={review} onChange={e => setReview(e.target.value)} />
          <div className="form-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}
