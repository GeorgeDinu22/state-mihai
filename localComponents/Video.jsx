import styles from './Stats.module.css'

{/* stilurile pentru video se afla in stats.css*
*/}

export default function Video(){
    return(
        <>
        <section className={styles.BodyVideo}>
             <h3>Dacă ai ajuns până <span>aici</span>, știu sigur că vrei să <strong>schimbi</strong> ceva la tine</h3>
            <div className={styles.videoContainer}>
                <video src="/video.mp4" playsInline muted controls loop>
                    Browserul tau nu soporta format Video.
                </video>
            </div>
        </section>
        </>
    )
}