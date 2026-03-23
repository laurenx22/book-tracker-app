interface Props {
  value: number | null
  onChange?: (rating: number | null) => void
}

export default function StarRating({ value, onChange }: Props) {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map(n => (
        <span
          key={n}
          className={n <= (value ?? 0) ? 'star filled' : 'star'}
          onClick={() => onChange?.(n === value ? null : n)}
          style={{ cursor: onChange ? 'pointer' : 'default' }}
        >
          ★
        </span>
      ))}
    </div>
  )
}
