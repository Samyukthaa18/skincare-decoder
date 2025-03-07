import styles from './About.module.css';
import missionImage from '../assets/step3.png'; 

export default function About() {
  return (
    <div className={styles.container}>
      <section className={styles.aboutHeader}>
        <h1>About Skin Decoder</h1>
        <p className={styles.tagline}>Simplifying Skincare Through Science</p>
      </section>

      <section className={styles.mission}>
        <div className={styles.missionContent}>
          <h2>Our Mission</h2>
          <p>
            At Skin Decoder, we believe great skincare shouldn't be complicated. 
            Our algorithm combines dermatological research with user-specific data 
            to create personalized routines that adapt to your skin's changing needs.
          </p>
        </div>
        <div className={styles.missionImage}>
          <img src={missionImage} alt="Our Mission" /> {/* Add the image here */}
        </div>
      </section>

      <section className={styles.team}>
        <h2>Meet the Experts</h2>
        <div className={styles.teamGrid}>
          <div className={styles.memberCard}>
            <div className={styles.avatar}></div>
            <h3>Dr. Known</h3>
            <p>Board-Certified Dermatologist</p>
          </div>
          <div className={styles.memberCard}>
            <div className={styles.avatar}></div>
            <h3>Random</h3>
            <p>Skincare Formulation Expert</p>
          </div>
          <div className={styles.memberCard}>
            <div className={styles.avatar}></div>
            <h3>Prof. Sample</h3>
            <p>AI Skincare Specialist</p>
          </div>
        </div>
      </section>
    </div>
  );
}