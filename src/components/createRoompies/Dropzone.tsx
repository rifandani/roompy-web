import { FileError, FileRejection, useDropzone } from 'react-dropzone'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
// files
import { ImagePreview } from 'utils/interfaces'

interface DropzoneProps {
  images: ImagePreview[]
  setImages: Dispatch<SetStateAction<ImagePreview[]>>
  single: boolean
  isPremium: boolean
}

export default function Dropzone({
  images,
  setImages,
  single,
  isPremium,
}: DropzoneProps): JSX.Element {
  const [errors, setErrors] = useState<FileError[]>([])

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    maxFiles: single ? 1 : isPremium ? 5 : 1, // max gambar yg bisa diupload
    maxSize: 5000000, // 5 MB
    onDrop: (acceptedImages: File[], fileRejections: FileRejection[]) => {
      // kalau ada file rejections error
      if (fileRejections.length > 0) {
        const newErrors = fileRejections.map((rejects) => rejects.errors).flat()

        setErrors(newErrors)
      } else {
        setErrors([])

        const filteredAcceptedImages = acceptedImages.filter(
          (image, i, images) =>
            images.findIndex((blob) => blob.size === image.size) === i
        )

        setImages(
          filteredAcceptedImages.map((image) =>
            // + preview di property image object, bisa jga pake spread operator
            Object.assign(image, {
              preview: URL.createObjectURL(image),
            })
          )
        )
      }
    },
  })

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      images.forEach((image) => URL.revokeObjectURL(image.preview))
    },
    [images]
  )

  const removeImage = (size: number) => {
    // find the index of the item
    // remove the item from array
    const validImageIndex = images.findIndex((e) => e.size === size)
    images.splice(validImageIndex, 1)

    // update images array
    setImages([...images])
  }

  // image thumbnail component
  const thumbs = images.map((image) => (
    <div
      className="box-border inline-flex w-32 h-32 p-2 mb-2 mr-2 border rounded-md cursor-pointer hover:bg-red-500 focus:bg-red-500 focus:outline-none"
      key={image.name}
      onClick={() => removeImage(image.size)}
    >
      <div className="flex min-w-0 overflow-hidden">
        <img className="block w-auto h-full" src={image.preview} />
      </div>
    </div>
  ))

  return (
    <section className="container px-3 py-2 mt-1 border border-purple-500 border-dashed rounded-md shadow-sm form-input">
      <div
        {...getRootProps({
          className:
            'dropzone bg-purple-500 py-4 rounded-md cursor-pointer hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300',
        })}
      >
        <input {...getInputProps()} name="photo" />

        <p className="text-sm italic font-bold text-center text-white">
          Drag and drop some images here, or
        </p>
        <p className="text-sm italic font-bold text-center text-white">
          Click to select images
        </p>
        <p className="text-xs italic text-center text-white">
          Click on the image to remove it
        </p>
      </div>
      <aside className="flex flex-wrap mt-4">{thumbs}</aside>

      {errors.length > 0 &&
        errors.map((err, i) => (
          <span key={i} className="error-message">
            {err.message}
          </span>
        ))}
    </section>
  )
}
