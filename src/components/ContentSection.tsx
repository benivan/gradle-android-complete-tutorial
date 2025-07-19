interface ContentSectionProps {
  id: string
  title: string
  children: React.ReactNode
}

export default function ContentSection({ id, title, children }: ContentSectionProps) {
  return (
    <section id={id} className="mb-12">
      <h1 className="text-4xl font-bold mb-6">{title}</h1>
      <div className="prose max-w-none">
        {children}
      </div>
    </section>
  )
}