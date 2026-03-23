import type { Book } from '../types'
import StarRating from './StarRating'

interface Props {
  book: Book
  onEdit: (book: Book) => void
  onDelete: (id: string) => void
}

const statusLabel: Record<Book['status'], string> = {
  'want-to-read': 'Want to Read',
  'reading': 'Reading',
  'completed': 'Completed',
}

export default function BookCard({ book, onEdit, onDelete }: Props) {
  return (
    <div className="book-card">
      <span className={`status-badge status-${book.status}`}>{statusLabel[book.status]}</span>
      <h3>{book.title}</h3>
      <p className="author">{book.author}</p>
      <StarRating value={book.rating} />
      {book.review && <p className="review">{book.review}</p>}
      <div className="book-actions">
        <button onClick={() => onEdit(book)}>Edit</button>
        <button onClick={() => onDelete(book.id)} className="delete-btn">Delete</button>
      </div>
    </div>
  )
}
