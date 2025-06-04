import { usePresignedUrl } from '../services/uploads'
import { v4 as uuidv4 } from 'uuid'

export const useUpload = () => {
  const { mutateAsync: upload } = usePresignedUrl()

  const uploadFileToS3 = async (file: File, folder: string) => {
    try {
      const uuid = uuidv4()
      const fileName = `${folder}/${uuid}-${file.name}`
      const { signedUrl } = await upload(fileName)
      const fileBuffer = await file.arrayBuffer()
      const binaryData = new Uint8Array(fileBuffer)
      
      await fetch(signedUrl, {
        method: 'PUT',
        body: binaryData,
        headers: {
          'Content-Type': file.type,
        },
      })

      return fileName
    } catch (error) {
      console.error('Erro ao enviar imagem para o S3', error)
      throw error
    }
  }

  return {
    uploadFileToS3,
  }
}
