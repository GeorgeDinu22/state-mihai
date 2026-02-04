"use client";
import { useRef, useState } from 'react';
import { Play } from 'lucide-react';
import './multumesc.css';

export default function Page() {
    const [playing, setPlaying] = useState(false);
    const videoRef = useRef(null);

    const handleToggleVideo = () => {
        if (videoRef.current) {
            if (playing) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
        }
    };

    return (
        <div className="bodyMultumesc">
            <h1>Îți mulțumesc pentru achiziție!</h1>
            <p>Vizionează videoclipul de mai jos pentru instrucțiuni și urmează să te contactez în cel mai scurt timp!</p>
            
            <div className="containerVideo" onClick={handleToggleVideo}>
                
                <div 
                    style={{
                        opacity: playing ? 0 : 1, 
                        pointerEvents: "none",
                        transition: "opacity 0.4s ease-in-out"
                    }} 
                    className="overlayVideo"
                >
                    
                    <div className="buttonPlay">
                        <Play fill='rgb(0, 157, 255)' color='rgb(0, 157, 255)' size={48}/>
                    </div>
                </div>

                <video 
                ref={videoRef}
                src="https://res.cloudinary.com/dhsrmuqph/video/upload/f_auto,q_auto,vc_h264/multumesc_ud7jwt"
                playsInline
                poster="https://res.cloudinary.com/dhsrmuqph/video/upload/f_auto,q_auto/multumesc_ud7jwt.jpg"
                preload="metadata"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                style={{ width: "100%", display: "block" }}
                >
                    Browserul tau nu suporta format Video.
                </video>
            </div>
        </div>
    );
}