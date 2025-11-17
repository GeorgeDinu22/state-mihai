import styles from './AboutMe.module.css'
import Image from "next/image";
import Counter from '../components/Counter';


export default function AboutMe() {
  return (
    <>
      <section id="despreMine" className={styles.bodyAboutMe}>
        <h2><strong>Cine</strong> sunt eu?</h2>
          <div className={styles.containerText}>
             <p>Sunt Mihai State, antrenor personal cu peste 12 ani de experiență în domeniul fitnessului și al transformărilor corporale, iar de-a lungul timpului am lucrat cu oameni de toate nivelurile, înțelegând că progresul real pornește din mentalitate, disciplină și echilibru.</p>
            <p>Îmi propun să ghidez fiecare persoană prin programe personalizate, adaptate obiectivelor și stilului lor de viață, punând accent pe consistență, educație și evoluție sustenabilă, nu pe soluții rapide sau extreme.</p>
            
            <div className={styles.containerImg}>
              <Image
                fill
                src="/profile.png"
                alt="Logo Mihai State"
                priority
              />
            </div>
            
            </div>
            
      </section>
    </>
  );
}
