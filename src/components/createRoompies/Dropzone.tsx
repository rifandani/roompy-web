import { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

export default function Dropzone({ images, setImages, isPremium }: any) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    maxFiles: isPremium ? 5 : 1,
    onDrop: (acceptedImages: any) => {
      setImages(
        acceptedImages.map((image: any) =>
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
    const validImageIndex = images.findIndex((e: any) => e.name === name);
    images.splice(validImageIndex, 1);

    // update images array
    setImages([...images]);
  };

  // image thumbnail component
  const thumbs = images.map((image: any) => (
    <div
      className="box-border inline-flex w-32 h-32 p-2 mb-2 mr-2 border rounded-md cursor-pointer hover:bg-red-500"
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
    <section className="container px-3 py-2 mt-1 border border-blue-300 border-dashed rounded-md shadow-sm form-input">
      <div
        {...getRootProps({
          className: 'dropzone bg-blue-300 py-4 rounded-md',
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
