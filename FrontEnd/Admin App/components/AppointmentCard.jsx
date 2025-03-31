import styles from "@/styles/AppointmentCard.module.css";

const AppointmentCard = ({ appointment, onApprove, onDecline , setLoading , loading }) => (
  <div className={styles.card}>
    <h3>Patient : {appointment.username}</h3>
    <b><p>Doctor: {appointment.doc_name}</p></b>
    {appointment.type === "offline" && <p>Location: {appointment.location}</p>}
    <p>Type : {appointment.type}</p>
    <p>Date: {appointment.appointment_date}</p>
    <p>Time: {appointment.appointment_time}</p>
    {appointment.status === 'decline' ? (
  <p className={styles.approved}>Declined</p>
) : appointment.status === "approved" ? (
  <p className={styles.approved}>Approved</p>
) : (
  <>
    <button
      className={styles.approveButton}
      onClick={() => {
        onApprove(
          appointment.id,
          appointment.appointment_time,
          appointment.appointment_date,
          appointment.doctor_id,
          appointment.user_email,
          appointment.doc_name,
        );
        setLoading(true);
      }}
    >
      {loading ? (
        <div className={styles.spinner}></div>
      ) : (
        'Approve'
      )}
    </button>
    <button
      className={styles.declineButton}
      onClick={() => {
        onDecline(appointment.id)
        setLoading(true);
      }}
    >
      {loading ? (
        <div className={styles.spinner}></div>
      ) : (
        'Decline'
      )}
    </button>
  </>
)}
    
  </div>
);

export default AppointmentCard;



