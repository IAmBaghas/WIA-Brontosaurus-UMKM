import Card from "../Card"

export default function HomePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Beranda UMKM</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <Card title="Hello World!" description="Test Komponen Card." />
        <Card title="Card 2" description="Test Komponen Card Banyak." />
      </div>
    </div>
  )
}
