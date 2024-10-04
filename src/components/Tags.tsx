export const variants = {
  independent: {
    color: '#C76CFF',
    text: 'Independente',
  },
  playful: {
    color: '#FF885C',
    text: 'Brincalhão',
  },
  calm: {
    color: '#5478E4',
    text: 'Calmo',
  },
  docile: {
    color: '#90EE90',
    text: 'Dócil',
  },
  care: {
    color: '#FF6347',
    text: 'Carinhoso',
  },
  energetic: {
    color: '#FFFF00',
    text: 'Energético',
  },
  sociable: {
    color: '#DEB887',
    text: 'Sociável',
  },
  selective: {
    color: '#158615',
    text: 'Seletivo',
  },
  protector: {
    color: '#87CEEB',
    text: 'Protetor',
  },
} as const

interface TagsProps {
  variant: keyof typeof variants
}

export default function Tags({ variant }: TagsProps) {
  const { color, text } = variants[variant]

  return (
    <div
      className={`flex items-center justify-center rounded-md border border-black px-1 py-0.5`}
      style={{ backgroundColor: color }}
    >
      {text}
    </div>
  )
}
