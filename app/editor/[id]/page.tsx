import EditorShell from '@/components/EditorShell'

export default async function EditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <EditorShell documentId={id} />
}