import React, { useState } from "react";
import { toast } from "react-toastify";
const ImageUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file.");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "docotr_images"); // Ensure the correct preset name

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dij5v2rbz/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Uploaded Image:", data);
        onUpload(data.secure_url);
        toast.success("Image uploaded successfully!");
      } else {
        const errorData = await response.json();
        console.error(errorData.error.message);
        toast.error(errorData.error.message);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image.");
    }
  };
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button type="button" onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
};

export default ImageUpload;
