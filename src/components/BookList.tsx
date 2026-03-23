import type { Book } from '../types'
import BookCard from './BookCard'
import BookRow from './BookRow'

interface Props {
  books: Book[]
  view: 'grid' | 'list'
  onEdit: (book: Book) => void
  onDelete: (id: string) => void
}

export default function BookList({ books, view, onEdit, onDelete }: Props) {
  if (books.length === 0) return <p className="empty">No books found.</p>

  return (
    <div className={view === 'grid' ? 'book-grid' : 'book-list'}>
      {books.map(book =>
        view === 'grid'
          ? <BookCard key={book.id} book={book} onEdit={onEdit} onDelete={onDelete} />
          : <BookRow key={book.id} book={book} onEdit={onEdit} onDelete={onDelete} />
      )}
    </div>
  )
}
