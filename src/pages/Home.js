import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import image1 from '../assets/image1.jpg';


export default function Home() {
  return (
   
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Personalized Skincare Made Simple</h1>
          <p className={styles.subtitle}>
            Discover your perfect routine with skin cycling tailored to your unique needs
          </p>
          <Link to="/profile" className={styles.ctaButton}>
            Get Started
          </Link>
        </div>
        <div className={styles.container}>
      <img 
        src={image1} 
        alt="Skincare products" 
        className={styles.heroImage}
      />
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.featureCard}>
          <h3>🧴 Personalized Routine</h3>
          <p>Customized morning and night regimens based on your skin profile</p>
        </div>
        <div className={styles.featureCard}>
          <h3>📅 Smart Skin Cycling</h3>
          <p>Automated exfoliation, retinol, and recovery night scheduling</p>
        </div>
        <div className={styles.featureCard}>
          <h3>📚 Expert Guidance</h3>
          <p>Access to dermatologist-approved tips and product recommendations</p>
        </div>
      </section>
    </div>
  );
}