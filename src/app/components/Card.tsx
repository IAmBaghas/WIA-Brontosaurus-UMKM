type CardProps = {
  title: string
  description: string
}

export default function Card({ title, description }: CardProps) {
  return (
    <div className="border rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow bg-white">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
