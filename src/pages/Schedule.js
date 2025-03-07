import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Schedule.module.css';

export default function Schedule() {
  const [schedule, setSchedule] = useState(null);
  const [currentDay, setCurrentDay] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null); 
  const [isEmailSent, setIsEmailSent] = useState(false); 

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Please login/signup to view Schedule');
          setIsLoading(false);
          return;
        }

        const { data } = await axios.get('http://localhost:5001/api/schedule', {
          headers: { 'x-auth-token': token },
        });

        setSchedule(data.schedule);
        setCurrentDay(data.currentDay);
      } catch (error) {
        setError('Please login/signup to view Schedule');
        console.error('Error fetching schedule:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSchedule();
  }, []);

  const getCyclePhase = (day) => {
    switch (day) {
      case 1:
        return 'Exfoliation Night';
      case 2:
        return 'Retinol Night';
      case 3:
      case 4:
        return 'Recovery Night';
      default:
        return 'Recovery Night';
    }
  };

  const handleDayClick = (day) => {
    setSelectedDay(day); 
  };

  const closeModal = () => {
    setSelectedDay(null); 
  };

  const handleEmailNotification = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to receive email notifications.');
        return;
      }

      const response = await axios.post(
        'http://localhost:5001/api/schedule/email',
        {},
        {
          headers: { 'x-auth-token': token },
        }
      );

      if (response.data.msg) {
        setIsEmailSent(true); 
        alert('Schedule emailed successfully!');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email. Please try again.');
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading your schedule...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!schedule) {
    return <div className={styles.error}>No schedule data available</div>;
  }

  return (
    <div className={styles.container}>
      <h2>Your Personalized Skincare Schedule</h2>

      <div className={styles.cycleIndicator}>
        <h3>Today is: Night {currentDay} of 4 ({getCyclePhase(currentDay)})</h3>
      </div>

      <table className={styles.scheduleTable}>
        <thead>
          <tr>
            <th>Day</th>
            <th>🌅 Morning Routine</th>
            <th>🌙 Evening Routine</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4].map((day) => (
            <tr
              key={day}
              className={day === currentDay ? styles.currentDay : ''}
              onClick={() => handleDayClick(day)} 
            >
              <td>Day {day}</td>
              <td>
                <ul>
                  {schedule.morning.map((step, index) => (
                    <li key={`morning-${index}`}>{step}</li>
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                  {schedule.evening.map((step, index) => (
                    <li key={`evening-${index}`}>{step}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Email Notification Button */}
      <div className={styles.emailButtonContainer}>
        <button
          className={styles.emailButton}
          onClick={handleEmailNotification}
          disabled={isEmailSent} 
        >
          {isEmailSent ? 'Email Sent!' : 'Send Schedule via Email'}
        </button>
      </div>

      {/* Modal for detailed view */}
      {selectedDay && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Day {selectedDay} Schedule</h3>
            <div className={styles.routineSection}>
              <h4>🌅 Morning Routine</h4>
              <ul>
                {schedule.morning.map((step, index) => (
                  <li key={`morning-${index}`}>{step}</li>
                ))}
              </ul>
            </div>
            <div className={styles.routineSection}>
              <h4>🌙 Evening Routine ({getCyclePhase(selectedDay)})</h4>
              <ul>
                {schedule.evening.map((step, index) => (
                  <li key={`evening-${index}`}>{step}</li>
                ))}
              </ul>
            </div>
            <button className={styles.closeButton} onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}