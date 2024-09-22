'use client'

import { useState } from 'react'

export default function Page() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!file) {
      alert('Please select a file to upload.')
      return
    }

    setUploading(true)

    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + '/api/upload',
      {
        method: 'POST',
        body: formData,
      }
    )

    if (response.ok) {
        alert('Upload successful!')
    } else {
        console.error('Object Storage Upload Error:', uploadResponse)
        alert('Upload failed.')
    }

    setUploading(false)
  }

  return (
    <main>
      <h1>Upload a File to Object Storage</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="file"
          type="file"
          onChange={(e) => {
            const files = e.target.files
            if (files) {
              setFile(files[0])
            }
          }}
          accept="image/png, image/jpeg, .pdf, .txt"
        />
        <button type="submit" disabled={uploading}>
          Upload
        </button>
      </form>
    </main>
  )
}
