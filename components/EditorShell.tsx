'use client'
import { useEffect, useState } from 'react'

export default function EditorShell({ documentId }: { documentId?: string }) {
  const [content, setContent] = useState('Loading...')

  useEffect(() => {
    async function load() {
      if (!documentId) {
        setContent('Welcome to WriteDesk - Create a new document')
        return
      }
      try {
        const res = await fetch(`/api/documents/${documentId}`)
        if(res.ok){
          const data = await res.json()
          setContent(data.content || '')
        }
      } catch(e){}
    }
    load()
  }, [documentId])

  return (
    <div className="p-8">
      {documentId && <h1 className="text-xl font-bold mb-4">Editor: {documentId}</h1>}
      <textarea
        value={content}
        onChange={(e)=> setContent(e.target.value)}
        className="w-full h-[80vh] border p-4 rounded"
      />
    </div>
  )
}