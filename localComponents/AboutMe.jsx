import styles from './AboutMe.module.css'
import Image from "next/image";
import Video from './Video';
import Stats from "../localComponents/Stats.jsx";  

export default function AboutMe() {
  return (
    <>
      <section id="despreMine" className={styles.bodyAboutMe}>
        <h2>Cu ce ma <strong>ocup?</strong></h2>

        <Video/>  
          
            <div className={styles.containerImg}>
              <Image
                width={400}
                height={400}
                src="/profile.jpg"
                alt="Mihai State - Antrenor Personal"
                priority
              />
            </div>       
          <Stats/>

      </section>

      
    </>
  );
}
