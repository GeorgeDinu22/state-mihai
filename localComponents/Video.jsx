"use client";
import { useRef, useState } from 'react';
import styles from './Stats.module.css';
import { Play } from 'lucide-react';

export default function Video() {
    const [playing, setPlaying] = useState(false);
    const videoRef = useRef(null);

    const handleToggleVideo = () => {
        if (videoRef.current) {
            if (playing) {
                videoRef.current.pause();
                setPlaying(false);
            } else {
               
                videoRef.current.play();
                setPlaying(true);
            }
        }
    };

    return (
        <section className={styles.BodyVideo}>
            
            
            <div className={styles.videoContainer} onClick={handleToggleVideo}>
                
                
                <div 
                    style={{
                        opacity: playing ? 0 : 1, 
                        pointerEvents: "none",
                        transition: "opacity 0.4s ease-in-out"
                    }} 
                    className={styles.overlayVideo}
                >
                    
                    <div className={styles.buttonPlay}>
                        <Play fill='rgb(0, 157, 255)' color='rgb(0, 157, 255)' size={48}/>
                    </div>
                </div>

                <video 
                    ref={videoRef} 
                    src="https://res.cloudinary.com/dhsrmuqph/video/upload/f_auto,q_auto,vc_h264/cine-sunt2_zgu1rs"
                    playsInline
                    preload="metadata" 
                    poster="https://res.cloudinary.com/dhsrmuqph/video/upload/q_90/cine-sunt2_zgu1rs.jpg"
                    className={styles.videoElement}
                    onPlay={() => setPlaying(true)}
                    onPause={() => setPlaying(false)}
                >
                    Browserul tau nu suporta format Video.
                </video>
            </div>
        </section>
    );
}