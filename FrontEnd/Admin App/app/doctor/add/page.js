"use client";
import { useState, useEffect } from "react";
import styles from "@/styles/addCard.module.css";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/uploadImage";
import { toast } from "react-toastify";
export default function AddDoctorForm() {
  const [upload, onUpload] = useState("/default_image.jpg");
  const availabilityOptions = ["9 AM - 12 PM", "1 PM - 5 PM"];
  const [diseaseInput, setDiseaseInput] = useState("");
  const [formData, setFormData] = useState({
    doc_name: "",
    doc_degree: "",
    specialization: "",
    experience: "",
    rating: "",
    description: "",
    doc_location: "",
    gender: "Male",
    user_img_url: upload,
    diseases: [],
  });
  const router = useRouter();

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      user_img_url: upload,
    }));
  }, [upload]);

  const handleDiseaseAdd = () => {
    if (
      diseaseInput.trim() &&
      !formData.diseases.includes(diseaseInput.trim())
    ) {
      setFormData((prevData) => ({
        ...prevData,
        diseases: [...prevData.diseases, diseaseInput.trim()],
      }));
      setDiseaseInput("");
    } else {
      toast.error("Disease already added or empty input!");
    }
  };

  const handleDiseaseRemove = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      diseases: prevData.diseases.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/v1/doctor/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(upload);
      if (response.ok) {
        console.log(formData);
        toast.success("Doctor added successfully!");
        router.push("/doctor");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error adding doctor:", error);
      alert("Failed to add doctor.");
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <h1> ENTER YOUR DETAILS</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Doctor Name:{" "}
            <input
              type="text"
              name="doc_name"
              value={formData.doc_name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Degree:{" "}
            <input
              type="text"
              name="doc_degree"
              value={formData.doc_degree}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Specialization:{" "}
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Experience (years):{" "}
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Rating (1-5):{" "}
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              min="1"
              max="5"
              required
            />
          </label>

          <label>
            Description:{" "}
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Location:{" "}
            <input
              type="text"
              name="doc_location"
              value={formData.doc_location}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Gender:
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </label>
          <ImageUpload onUpload={onUpload} />
          <label>Disease Expertise:</label>
          <div className={styles.diseaseInputContainer}>
            <input
              type="text"
              value={diseaseInput}
              onChange={(e) => setDiseaseInput(e.target.value)}
              placeholder="Enter disease"
            />
            <button type="button" onClick={handleDiseaseAdd}>
              Add Disease
            </button>
          </div>
          <ul className={styles.diseaseList}>
            {formData.diseases.map((disease, index) => (
              <li key={index}>
                {disease}{" "}
                <button onClick={() => handleDiseaseRemove(index)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button type="submit" className={styles.book}>
            Add Doctor
          </button>
        </form>
      </div>
    </div>
  );
}
