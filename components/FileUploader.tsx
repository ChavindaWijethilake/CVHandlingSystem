"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { convertFileToUrl } from "@/lib/utils";
import { XCircle } from "lucide-react";

type FileUploaderProps = {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
};

const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onChange(acceptedFiles);
    },
    [onChange]
  );

  const removeFile = (index: number) => {
    if (files) {
      const updatedFiles = files.filter((_, i) => i !== index);
      onChange(updatedFiles);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".svg"],
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
  });

  return (
    <div className="border border-gray-700 p-6 rounded-lg text-center cursor-pointer">
      
      <div {...getRootProps()} className="flex flex-col items-center py-6">
        <input {...getInputProps()} />
        {(!files || files.length === 0) && (
          <>
            <Image src="/assets/icons/upload.svg" width={50} height={50} alt="upload" />
            <div className="mt-2">
              <p className="text-sm">
                <span className="text-green-500 font-semibold">Click to upload </span>
                or drag and drop
              </p>
              <p className="text-xs text-gray-500"> PDFs, DOC, DOCX</p>
            </div>
          </>
        )}
      </div>

      
      {files && files.length > 0 && (
        <div className="mt-4 space-y-4">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
              {file.type.startsWith("image/") ? (
                <Image
                  src={convertFileToUrl(file)}
                  width={64}
                  height={64}
                  alt="uploaded file"
                  className="object-cover rounded-md w-16 h-16"
                />
              ) : (
                <div className="flex flex-col text-sm w-full">
                  <p className="font-medium break-words">{file.name}</p> 
                  <p className="text-gray-500 text-xs">{(file.size / 1024).toFixed(2)} KB</p>
                </div>
              )}

              
              <button
                onClick={() => removeFile(index)}
                className="flex items-center bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 transition"
              >
                <XCircle size={18} className="mr-1" /> Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
