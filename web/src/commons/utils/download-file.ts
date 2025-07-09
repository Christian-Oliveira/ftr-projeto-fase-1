export function downloadFile(urlDownload: string) {
    const link = document.createElement("a")
    link.href = urlDownload
    link.download = "file.csv"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}