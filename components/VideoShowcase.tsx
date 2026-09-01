'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Video, VideoOff } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import EmptyState from '@/components/ui/EmptyState';
import type { VideoView } from '@/lib/storefront-data';

interface VideoShowcaseProps {
  videos: VideoView[];
}

const VideoShowcase: React.FC<VideoShowcaseProps> = ({ videos }) => {
  const t = useTranslations('video');
  const [selectedId, setSelectedId] = useState<string | null>(videos[0]?._id ?? null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            if (videoRef.current) {
              videoRef.current.pause();
            }
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Derived, so the selection stays valid when the published set changes.
  const selectedVideo = videos.find((video) => video._id === selectedId) ?? videos[0] ?? null;

  const handleSelectVideo = (video: VideoView) => {
    setSelectedId(video._id);
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
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Nothing published yet: keep the section framing and explain the gap, rather
  // than rendering nothing and leaving the page blank.
  if (!selectedVideo) {
    return (
      <section ref={sectionRef} id="videos" className="scroll-mt-24 px-6 max-w-7xl mx-auto py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-secondary/5" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-10 relative z-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary text-xs font-sans uppercase tracking-widest rounded-full mb-4">
            <Video className="w-3.5 h-3.5" />
            {t('eyebrow')}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-textBase mb-4">
            {t('titleStart')} <span className="text-primary">{t('titleAccent')}</span>
          </h2>
        </motion.div>

        <EmptyState
          icon={VideoOff}
          title={t('emptyTitle')}
          message={t('emptyText')}
          action={
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-sm hover:bg-primary/90 transition-colors font-sans"
            >
              {t('emptyCta')}
            </Link>
          }
        />
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="videos" className="scroll-mt-24 px-6 max-w-7xl mx-auto py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-secondary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-16 relative z-10"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary text-xs font-sans uppercase tracking-widest rounded-full mb-4">
          <Video className="w-3.5 h-3.5" />
          {t('eyebrow')}
        </span>
        <h2 className="text-4xl md:text-5xl font-serif text-textBase mb-4">
          {t('titleStart')} <span className="text-primary">{t('titleAccent')}</span>
        </h2>
        <p className="text-textBase/60 text-lg max-w-2xl mx-auto leading-relaxed">
          {t('description')}
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
              key={selectedVideo._id}
              src={selectedVideo.videoUrl}
              poster={selectedVideo.thumbnail || undefined}
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
                  aria-label={isPlaying ? t('pauseVideo') : t('playVideo')}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>
                <button
                  onClick={toggleMute}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-colors"
                  aria-label={isMuted ? t('unmuteVideo') : t('muteVideo')}
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
                {t('watchNote')}
              </p>
            </div>
            <a
              href={`https://wa.me/5491186371242?text=${encodeURIComponent(t('whatsappMessage', { title: selectedVideo.title }))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white rounded-sm hover:bg-primary/90 transition-colors font-sans text-xs sm:text-sm flex-shrink-0"
            >
              <FaWhatsapp className="w-4 h-4" />
              {t('consultPiece')}
            </a>
          </div>
        </motion.div>

        {/* Video Playlist Sidebar */}
        <div className="lg:col-span-4 space-y-3">
          <p className="text-xs font-sans uppercase tracking-widest text-accent font-semibold mb-2">
            {t('selectVideo', { count: videos.length })}
          </p>

          {videos.map((vid, index) => {
            const isCurrent = selectedVideo._id === vid._id;
            return (
              <motion.button
                key={vid._id}
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
                    src={vid.videoUrl}
                    poster={vid.thumbnail || undefined}
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
                        • {t('playing')}
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
