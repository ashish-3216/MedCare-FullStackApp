import React from 'react';
import styles from '../styles/DoctorCard.module.css';

const DoctorCard = ({ doctor, onDelete }) => (
    <div className={styles.card}>
      <h3>{doctor.name}</h3>
      <p>Specialty: {doctor.specialty}</p>
      <p>Experience: {doctor.experience} years</p>
      <button className={styles.deleteButton} >Delete</button>
    </div>
  );
  

export default DoctorCard;