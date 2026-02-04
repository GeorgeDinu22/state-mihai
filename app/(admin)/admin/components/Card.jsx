import styles from './Card.module.css';
import * as Icons from "lucide-react";

 export default function Card({prod}){
                
    const IconComponent = Icons[prod.icon] || Icons.Ban;

    const includeList = prod.includes?.split("\n").filter(i => i.trim().length > 0) || [];
    const excludeList = prod.exclued?.split("\n").filter(i => i.trim().length > 0) || [];


    return(
       <div
      className={styles.card}
      style={{ "--glow-color": prod.accentColor }}
    >
      {prod.isBestDeal && (
          <div className={styles.bestValue}>
            {prod.textBestDeal}
          </div>
        )}
        
      <div
        className={
          prod.isActive
            ? styles.contentWrapper
            : `${styles.contentWrapper} ${styles.pachetInactiv}`
        }
      >
        <div className={styles.iconCard}>
          <IconComponent
            color={prod.accentColor}
            strokeWidth={1}
            size={32}
          />
        </div>

        <p className={styles.titlu}>{prod.titlu}</p>
        <p className={styles.pret}>{prod.pret} RON</p>

        {prod.durata && (
          <p className={styles.durata}>{prod.durata}</p>
        )}

        <ul className={styles.includes}>
          <p className={styles.includedTitle}>Include</p>
          {includeList.length > 0 ? (
            includeList.map((item, i) => <li key={i}>{item}</li>)
          ) : (
            <li>Nu este setat nicun include</li>
          )}
        </ul>

        <ul className={styles.excludes}>
          <p className={styles.excludedTitle}>Exclude</p>
          {excludeList.length > 0 ? (
            excludeList.map((item, i) => <li key={i}>{item}</li>)
          ) : (
            <li>Nu este setat nicun exclude</li>
          )}
        </ul>

        <a className={styles.cta}>
          {prod.textBtn}
        </a>
      </div>

      {!prod.isActive && (
        <div className={styles.backgroundInactiv}>
          <p>{prod.textInactiv}</p>
        </div>
      )}
    </div>
    )
 }
 