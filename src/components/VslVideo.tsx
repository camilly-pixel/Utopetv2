import { useRef, useState } from 'react';
import { Play } from 'lucide-react';

export function VslVideo({ onContact }: { onContact: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const start = () => {
    setStarted(true);
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.play().catch(() => {
      // Playback can be blocked by the browser; native controls stay visible so the user can retry.
    });
  };

  return (
    <div className="vsl anim-entrada d2">
      <div className="vsl-frame">
        <video
          ref={videoRef}
          src="/utopet-vsl-veterinario.mp4"
          poster="/utopet-vsl-poster.jpg"
          preload="metadata"
          playsInline
          controls={started}
          aria-label="Vídeo de apresentação da Utopet para clínicas veterinárias"
        />
        {!started && (
          <button type="button" className="vsl-cover" onClick={start} aria-label="Assistir ao vídeo">
            <span className="vsl-play"><Play size={34} fill="currentColor" /></span>
            <span className="vsl-badge">Assista em 1min30</span>
          </button>
        )}
      </div>
      <div className="vsl-cta">
        <button className="btn btn-roxo" onClick={onContact}>Agendar demonstração</button>
      </div>
    </div>
  );
}
