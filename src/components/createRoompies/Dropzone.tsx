import { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

export default function Dropzone({
  images,
  setImages,
  single,
  isPremium,
}: any) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    maxFiles: single ? 1 : isPremium ? 5 : 1, // max gambar yg bisa diupload
    onDrop: (acceptedImages) => {
      const filteredAcceptedImages = acceptedImages.filter(
        (image, i, images) =>
          images.findIndex((t) => t.size === image.size) === i,
      );

      setImages(
        filteredAcceptedImages.map((image) =>
          // + preview di property image object
          // bisa jga pake spread operator
          Object.assign(image, {
            preview: URL.createObjectURL(image),
          }),
        ),
      );
    },
  });

  const removeImage = (name: any) => {
    // find the index of the item
    // remove the item from array
    // const validImageIndex = images.findIndex((e: any) => e.name === name);
    const validImageIndex = images.findIndex((e: any) => e.name === name);
    images.splice(validImageIndex, 1);

    // update images array
    setImages([...images]);
  };

  // image thumbnail component
  const thumbs = images.map((image: any) => (
    <div
      className="box-border inline-flex w-32 h-32 p-2 mb-2 mr-2 border rounded-md cursor-pointer hover:bg-red-500 focus:bg-red-500"
      key={image.name}
      onClick={() => removeImage(image.name)}
    >
      <div className="flex min-w-0 overflow-hidden">
        <img className="block w-auto h-full" src={image.preview} />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      images.forEach((image: any) => URL.revokeObjectURL(image.preview));
    },
    [images],
  );

  return (
    <section className="container px-3 py-2 mt-1 border border-purple-500 border-dashed rounded-md shadow-sm form-input">
      <div
        {...getRootProps({
          className:
            'dropzone bg-purple-500 py-4 rounded-md cursor-pointer hover:bg-purple-700 focus:ring-4 ring-purple-300',
        })}
      >
        <input {...getInputProps()} />
        <p className="text-sm italic font-bold text-center text-white">
          Drag 'n' drop your photos HERE, or click to select files
        </p>
        <p className="text-xs italic text-center text-white">
          Click on the image to remove it
        </p>
      </div>
      <aside className="flex flex-wrap mt-4">{thumbs}</aside>
    </section>
  );
}
