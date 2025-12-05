const BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8080"

export async function listFiles(status?: string) {
  const url = new URL(`${BASE}/api/files/list`)
  if (status) url.searchParams.set("status", status)
  const res = await fetch(url.toString())
  if (!res.ok) throw new Error(`List files failed: ${res.statusText}`)
  return res.json()
}

export async function getFileStatus(fileId: string) {
  const res = await fetch(`${BASE}/api/files/status/${encodeURIComponent(fileId)}`)
  if (!res.ok) throw new Error(`Get file status failed: ${res.statusText}`)
  return res.json()
}

export async function downloadInputFile(fileId: string, filename: string) {
  const res = await fetch(`${BASE}/api/files/${encodeURIComponent(fileId)}/download`)
  if (!res.ok) throw new Error(`Download input file failed: ${res.statusText}`)
  const blob = await res.blob()
  return { blob, filename }
}

export async function getOutputFile(fileId: string) {
  const res = await fetch(`${BASE}/api/files/${encodeURIComponent(fileId)}/output`)
  if (!res.ok) throw new Error(`Get output file failed: ${res.statusText}`)
  return res.json()
}

export async function downloadOutputFile(fileId: string, format: string = "JSON") {
  const url = new URL(`${BASE}/api/files/${encodeURIComponent(fileId)}/output/download`)
  url.searchParams.set("format", format)
  const res = await fetch(url.toString())
  if (!res.ok) throw new Error(`Download output file failed: ${res.statusText}`)
  return res.blob()
}

export async function uploadFile(file: File, targetFormat?: string) {
  const form = new FormData()
  form.append("file", file)
  if (targetFormat) form.append("targetFormat", targetFormat)

  const res = await fetch(`${BASE}/api/files/upload`, {
    method: "POST",
    body: form,
  })

  if (!res.ok) {
    const body = await res.json().catch(() => null)
    throw new Error(body?.message || `Upload failed: ${res.statusText}`)
  }

  return res.json()
}

export async function retryFile(fileId: string) {
  const res = await fetch(`${BASE}/api/files/retry/${encodeURIComponent(fileId)}`, {
    method: "POST",
  })
  if (!res.ok) throw new Error(`Retry failed: ${res.statusText}`)
  return res.json()
}

export async function deleteFile(fileId: string) {
  const res = await fetch(`${BASE}/api/files/${encodeURIComponent(fileId)}`, {
    method: "DELETE",
  })
  if (!res.ok) throw new Error(`Delete failed: ${res.statusText}`)
  return true
}

export default {
  listFiles,
  getFileStatus,
  downloadInputFile,
  getOutputFile,
  downloadOutputFile,
  uploadFile,
  retryFile,
  deleteFile,
}
