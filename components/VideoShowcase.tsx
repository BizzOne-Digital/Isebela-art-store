'use client';
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Sparkles, Video, MessageCircle, Heart, ChevronRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

interface VideoItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  src: string;
  tag: string;
}

const videos: VideoItem[] = [
  {
    id: 'vid-1',
    title: 'Creación y Detalles en el Taller',
    subtitle: 'El proceso íntimo del trabajo manual',
    description: 'Mira cómo cada lámina de goma eva se transforma en una obra con personalidad y cariño.',
    src: '/images/img/isvid1.mp4',
    tag: 'En el Taller',
  },
  {
    id: 'vid-2',
    title: 'Modelado y Ensamblado Artesanal',
    subtitle: 'Técnicas de precisión y termoformado',
    description: 'El armado milimétrico de las piezas, cuidando proporciones, pliegues y texturas.',
    src: '/images/img/isvid2.mp4',
    tag: 'Técnica',
  },
  {
    id: 'vid-3',
    title: 'Vista 360° de Nuestras Fofuchas',
    subtitle: 'Aprecia cada ángulo y acabado',
    description: 'Detalles minuciosos: calzado, vestimenta, accesorios y rostros pintados a mano.',
    src: '/images/img/isvid3.mp4',
    tag: 'Exhibición',
  },
  {
    id: 'vid-4',
    title: 'Pintura y Toques de Expresión',
    subtitle: 'Dando vida a las miradas y sonrisas',
    description: 'La magia de los ojos, luces, sombras y rubor que otorgan alma a cada creación.',
    src: '/images/img/isvid4.mp4',
    tag: 'Pintura',
  },
  {
    id: 'vid-5',
    title: 'Colección en Movimiento y Presentación',
    subtitle: 'Lista para regalar o coleccionar',
    description: 'El resultado final empacado con amor y listo para emocionar a quien lo reciba.',
    src: '/images/img/isvid5.mp4',
    tag: 'Creaciones',
  },
];

const VideoShowcase: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem>(videos[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleSelectVideo = (video: VideoItem) => {
    setSelectedVideo(video);
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section id="videos" className="px-6 max-w-7xl mx-auto py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-secondary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-16 relative z-10"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary text-xs font-sans uppercase tracking-widest rounded-full mb-4">
          <Video className="w-3.5 h-3.5" />
          El Taller en Vivo
        </span>
        <h2 className="text-4xl md:text-5xl font-serif text-textBase mb-4">
          Magia en <span className="text-primary">Movimiento</span>
        </h2>
        <p className="text-textBase/60 text-lg max-w-2xl mx-auto leading-relaxed">
          Conoce de cerca el proceso artesanal, los acabados en 360° y la dedicación que ponemos en cada detalle.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        {/* Main Video Player */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-8 relative bg-black/90 rounded-2xl overflow-hidden shadow-2xl border border-accent/20"
        >
          <div className="relative aspect-video max-h-[550px] w-full bg-black flex items-center justify-center">
            <video
              ref={videoRef}
              key={selectedVideo.src}
              src={selectedVideo.src}
              className="w-full h-full object-contain"
              autoPlay
              loop
              playsInline
              muted={isMuted}
              onClick={togglePlay}
            />

            {/* Video Overlay Controls */}
            <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-center justify-between text-white">
              <div>
                <span className="px-2.5 py-1 bg-primary text-white text-xs font-sans rounded-full uppercase tracking-wider mb-2 inline-block">
                  {selectedVideo.tag}
                </span>
                <h3 className="text-lg sm:text-xl font-serif text-white font-medium">
                  {selectedVideo.title}
                </h3>
                <p className="text-white/70 text-xs sm:text-sm hidden sm:block">
                  {selectedVideo.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-colors"
                  aria-label={isPlaying ? 'Pausar video' : 'Reproducir video'}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>
                <button
                  onClick={toggleMute}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-colors"
                  aria-label={isMuted ? 'Activar sonido' : 'Silenciar sonido'}
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 bg-surfaceAlt/80 border-t border-accent/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-textBase/80 text-sm leading-relaxed">
                {selectedVideo.description}
              </p>
              <p className="text-xs text-primary font-medium mt-1">
                ¿Te gusta lo que ves? Enviamos videos del avance de tu encargo por WhatsApp.
              </p>
            </div>
            <a
              href={`https://wa.me/5491186371242?text=${encodeURIComponent(`Hola Isabel, vi el video "${selectedVideo.title}" y me encantó su trabajo. Quisiera consultar por una pieza similar.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white rounded-sm hover:bg-primary/90 transition-colors font-sans text-xs sm:text-sm flex-shrink-0"
            >
              <FaWhatsapp className="w-4 h-4" />
              Consultar por esta pieza
            </a>
          </div>
        </motion.div>

        {/* Video Playlist Sidebar */}
        <div className="lg:col-span-4 space-y-3">
          <p className="text-xs font-sans uppercase tracking-widest text-accent font-semibold mb-2">
            Selecciona un video ({videos.length})
          </p>

          {videos.map((vid, index) => {
            const isCurrent = selectedVideo.id === vid.id;
            return (
              <motion.button
                key={vid.id}
                onClick={() => handleSelectVideo(vid)}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-start gap-4 ${
                  isCurrent
                    ? 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(107,33,168,0.15)] ring-1 ring-primary'
                    : 'border-accent/15 bg-surfaceAlt/40 hover:border-primary/40 hover:bg-surfaceAlt/70'
                }`}
              >
                <div className="relative w-16 h-16 rounded-lg bg-black overflow-hidden flex-shrink-0 flex items-center justify-center">
                  <video
                    src={vid.src}
                    className="w-full h-full object-cover opacity-70"
                    muted
                    playsInline
                    preload="metadata"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    {isCurrent && isPlaying ? (
                      <div className="w-3 h-3 bg-primary rounded-full animate-ping" />
                    ) : (
                      <Play className="w-5 h-5 text-white fill-white/80" />
                    )}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-sans px-2 py-0.5 rounded bg-accent/15 text-accent font-medium uppercase">
                      {vid.tag}
                    </span>
                    {isCurrent && (
                      <span className="text-[10px] font-sans text-primary font-bold">
                        • Reproduciendo
                      </span>
                    )}
                  </div>
                  <h4 className="font-serif text-textBase text-sm font-medium line-clamp-1">
                    {vid.title}
                  </h4>
                  <p className="text-textBase/60 text-xs line-clamp-1 mt-0.5">
                    {vid.subtitle}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
