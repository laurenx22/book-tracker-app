export interface Book {
  id: string
  title: string
  author: string
  status: 'want-to-read' | 'reading' | 'completed'
  rating: number | null
  review: string | null
  date_added: string
}
