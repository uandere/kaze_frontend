import { useDropzone } from "react-dropzone";
import { useState } from "react";

interface CDropboxProps {
  onFilesChange: (files: File[]) => void;
  multiple?: boolean;
  initialPreviews?: string[];
}

const CDropbox: React.FC<CDropboxProps> = ({ onFilesChange, multiple = true }) => {
  const [previews, setPreviews] = useState<string[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    multiple,
    onDrop: (acceptedFiles) => {
      const newPreviews = acceptedFiles.map((file) => URL.createObjectURL(file));
      setPreviews(newPreviews);
      onFilesChange(acceptedFiles);
    },
  });

  return (
    <div className="flex flex-col items-center p-6 border-2 border-dashed border-gray-400 rounded-lg bg-gray-100 w-full max-w-lg mx-auto">
      <div {...getRootProps()} className="w-full p-10 text-center cursor-pointer bg-white rounded-lg">
        <input {...getInputProps()} />
        <p className="text-gray-600">Drag & drop image{multiple ? "s" : ""} here, or click to select</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {previews.map((src, i) => (
          <img key={i} src={src} className="w-20 h-20 object-cover rounded-lg shadow" />
        ))}
      </div>
    </div>
  );
};

export default CDropbox;
