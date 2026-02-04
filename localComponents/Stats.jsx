import { Trophy, CalendarDays, Handshake, UserCheck } from "lucide-react";
import Counter from '../components/Counter';
import styles from './Stats.module.css'

export default function Stats(){
   return (
    <>
    <section className={styles.statsSection}>
      <div className={styles.card}>
        <Trophy className={styles.icon}  color="#009dff" strokeWidth={1.75} />
        <div className={styles.counter}>
            <Counter
                        value={521}
                        places={[100, 10, 1]}
                        fontSize={36}
                        padding={5}
                        gap={1}
                        textColor="white"
                        fontWeight={650}
            />
            <div className={styles.plus}>
                +
            </div>
        </div>
        <h3 className={styles.titleCard}>Transformări reușite</h3>
        
      </div>

      <div className={styles.card}>
        <CalendarDays className={styles.icon}   color="#009dff" strokeWidth={1.75} />
                <div className={styles.counter}>
            <Counter
                        value={12}
                        places={[10, 1]}
                        fontSize={36}
                        padding={5}
                        gap={1}
                        textColor="white"
                        fontWeight={650}
            />
        </div>
        <h3 className={styles.titleCard}>Ani de experiență</h3>
      </div>
        <div className={styles.card}>
        <Handshake className={styles.icon}  color="#009dff" strokeWidth={1.75} />
        <div className={styles.counter}>
            <Counter
                        value={9000}
                        places={[1000,100,10, 1]}
                        fontSize={36}
                        padding={5}
                        gap={1}
                        textColor="white"
                        fontWeight={650}
            />
            <div className={styles.plus}>
                +
            </div>
        </div>
        <h3 className={styles.titleCard}>Sesiuni 1-la-1</h3>
        
      </div>

      <div className={styles.card}>
        <UserCheck className={styles.icon}  color="#009dff" strokeWidth={1.75} />
        <div className={styles.counter}>
            <Counter
                        value={100}
                        places={[100, 10, 1]}
                        fontSize={36}
                        padding={5}
                        gap={1}
                        textColor="white"
                        fontWeight={650}
            />
            <div className={styles.plus}>
                %
            </div>
        </div>
        <h3 className={styles.titleCard}>Încredere clienți</h3>
        
      </div>

    </section>
    </>
  );
}