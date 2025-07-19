interface CodeBlockProps {
  children: string
  language?: string
}

export default function CodeBlock({ children, language = 'gradle' }: CodeBlockProps) {
  return (
    <div className="my-6">
      {language && (
        <div className="bg-gray-200 px-4 py-2 text-sm font-mono text-gray-700 rounded-t-md">
          {language}
        </div>
      )}
      <pre className={`${language ? 'rounded-t-none' : 'rounded-md'} overflow-x-auto`}>
        <code className="text-sm">{children}</code>
      </pre>
    </div>
  )
}