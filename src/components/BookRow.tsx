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

export default function BookRow({ book, onEdit, onDelete }: Props) {
  return (
    <div className="book-row">
      <div className="book-row-main">
        <strong>{book.title}</strong>
        <span className="author">{book.author}</span>
        <span className={`status-badge status-${book.status}`}>{statusLabel[book.status]}</span>
        <StarRating value={book.rating} />
      </div>
      <div className="book-actions">
        <button onClick={() => onEdit(book)}>Edit</button>
        <button onClick={() => onDelete(book.id)} className="delete-btn">Delete</button>
      </div>
    </div>
  )
}
