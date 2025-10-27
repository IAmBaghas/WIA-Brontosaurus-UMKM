export default function Body({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-6">
      {children}
    </div>
  )
}
