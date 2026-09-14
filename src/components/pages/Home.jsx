import { useState, useEffect, useMemo } from 'react';
import { designsByCategory, getDesignsByCategory } from '../../data/designs';
import { services } from '../../data/services';
import { useLanguage } from '../../hooks/useLanguage';
import { useAppContext } from '../../hooks/useAppContext';
import { COLORS } from '../../utils/constants';
import { spriteGifs } from '../../data/spriteGifs';
import SpriteAnimation from '../SpriteAnimation';
import { assetPath } from '../../utils/assetPath';

const homeSampleImages = [
  { src: assetPath('assets/home/Nuevos Diseños/pcback6.mp4'), alt: 'pcback6' },
  { src: assetPath('assets/home/Nuevos Diseños/pstyle3.mp4'), alt: 'pstyle3' },
  { src: assetPath('assets/home/Nuevos Diseños/xatspace2.mp4'), alt: 'xatspace2' },
  { src: assetPath('assets/home/Nuevos Diseños/xatspace3.mkv'), alt: 'xatspace3' },
];

export default function Home() {
  const { language } = useLanguage();
  const { setCurrentCategory, setCurrentGroup, openLightbox } = useAppContext();
  
  // Carrusel de diseños recientes de todas las categorías
  const recentDesigns = useMemo(() => {
    const featured = [];
    for (const category of Object.keys(designsByCategory)) {
      featured.push(...designsByCategory[category].filter((design) => design.featured));
    }

    const fallback = featured.length ? featured : Object.values(designsByCategory).flat();

    return fallback.map((design, index) => {
      const sample = homeSampleImages[index % homeSampleImages.length];
      return {
        ...design,
        src: sample?.src ?? design.src,
        image: sample?.src ?? design.image ?? design.src,
        alt: sample?.alt ?? design.alt,
        title: sample?.alt ?? design.title ?? design.alt,
      };
    });
  }, []);
  const gifDesigns = useMemo(() => spriteGifs, []);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [currentRecentSlide, setCurrentRecentSlide] = useState(0);
  const [isRecentAutoPlaying, setIsRecentAutoPlaying] = useState(true);

  // Trabajos recientes (featured designs)
  const recentWorks = useMemo(() => {
    const featured = [];
    for (const category in designsByCategory) {
      featured.push(
        ...designsByCategory[category].filter((d) => d.featured).slice(0, 2)
      );
    }

    return featured.slice(0, homeSampleImages.length).map((design, index) => {
      const sample = homeSampleImages[index] || homeSampleImages[0];

      return {
        ...design,
        src: sample.src,
        image: sample.src,
        alt: sample.alt,
        title: sample.alt,
      };
    });
  }, []);

  // Autoplay del carrusel
  useEffect(() => {
    if (!isAutoPlaying || recentDesigns.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % recentDesigns.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, recentDesigns.length]);

  useEffect(() => {
    if (!isRecentAutoPlaying || recentWorks.length <= 3) return;
    const interval = setInterval(() => {
      setCurrentRecentSlide((prev) => (prev + 1) % recentWorks.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [isRecentAutoPlaying, recentWorks.length]);

  // Funciones del carrusel
  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? recentDesigns.length - 1 : prev - 1));
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % recentDesigns.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const isVideoAsset = (src) => /\.(mp4|webm|mkv|avi)$/i.test(src || '');
  const isXatspaceDesign = (design) => /xatspace/i.test(design?.alt || design?.title || design?.src || '');
  const isXatspace2Design = (design) => /xatspace2/i.test(design?.alt || design?.title || design?.src || '');

  const getDesignBackground = (design) => {
    const color = design.colors?.[0];
    const backgrounds = {
      animated: 'linear-gradient(135deg, rgba(168, 85, 247, 0.28), rgba(17, 24, 39, 0.94))',
      static: 'linear-gradient(135deg, rgba(16, 185, 129, 0.28), rgba(15, 23, 42, 0.94))',
      pstyle: 'linear-gradient(135deg, rgba(249, 115, 22, 0.28), rgba(15, 23, 42, 0.94))',
      reproductor: 'linear-gradient(135deg, rgba(239, 68, 68, 0.28), rgba(15, 23, 42, 0.94))',
      black: 'linear-gradient(135deg, rgba(71, 85, 105, 0.3), rgba(15, 15, 15, 0.94))',
      white: 'linear-gradient(135deg, rgba(226, 232, 240, 0.24), rgba(30, 41, 59, 0.94))',
    };
    return backgrounds[color] || backgrounds[design.category] || backgrounds.static;
  };

  // Calcular índices de los 3 slides visibles
  const visibleSlides = [
    currentSlide,
    (currentSlide + 1) % recentDesigns.length,
    (currentSlide + 2) % recentDesigns.length,
  ];

  const visibleRecentWorks = recentWorks.length > 0
    ? [
        recentWorks[currentRecentSlide % recentWorks.length],
        recentWorks[(currentRecentSlide + 1) % recentWorks.length],
        recentWorks[(currentRecentSlide + 2) % recentWorks.length],
      ]
    : [];

  return (
    <div
      style={{
        width: '100%',
        paddingTop: '72px',
        paddingBottom: '80px',
        paddingLeft: '22px',
        paddingRight: '22px',
      }}
    >
      {/* SECCIÓN SUPERIOR - Galerías */}
      <section
        className="home-gallery-section"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.7fr) 320px',
          gap: '20px',
          alignItems: 'stretch',
          marginBottom: '40px',
        }}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* BLOQUE IZQUIERDO - Carrusel de diseños recientes */}
        <div
          className="carousel-container"
          style={{
            background: 'rgba(15, 15, 15, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '18px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '420px',
          }}
        >
          {/* Header del bloque */}
          <div
            style={{
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <button
              onClick={() => setCurrentCategory('xatspaces')}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '8px',
                padding: '8px 12px',
                color: COLORS.textPrimary,
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 300ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.16)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
              }}
            >
              ← Ver galería
            </button>
          </div>

          {/* Título */}
          <div style={{ padding: '24px 24px 16px', fontSize: '28px', fontWeight: 800, color: COLORS.textPrimary }}>
            NUEVAS <span style={{ color: COLORS.primary }}>MUESTRAS</span>
          </div>

          {/* Carrusel */}
          <div
            style={{
              flex: 1,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: 0,
              paddingTop: '12px',
              paddingBottom: '24px',
              paddingLeft: '12px',
              paddingRight: '12px',
            }}
          >
            {/* Slides del carrusel - 3 visibles */}
            {visibleSlides.map((slideIndex, position) => {
              const design = recentDesigns[slideIndex];
              return (
                <div
                  key={design.id}
                  style={{
                    flex: isXatspace2Design(design) ? 1.45 : isXatspaceDesign(design) ? 1.35 : 1,
                    height: '280px',
                    marginRight: position < 2 ? '10px' : '0',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 300ms ease',
                    background: getDesignBackground(design),
                  }}
                  onClick={() => {
                    if (design.link || design.url) {
                      window.open(design.link || design.url, '_blank', 'noopener,noreferrer');
                      return;
                    }
                    openLightbox(design);
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = COLORS.primary;
                    e.currentTarget.style.boxShadow = `0 0 20px ${COLORS.primaryShadow}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {isVideoAsset(design.src) ? (
                    <video
                      src={design.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        backgroundColor: isXatspaceDesign(design) ? 'transparent' : '#000',
                        transform: isXatspace2Design(design) ? 'scale(1.45)' : isXatspaceDesign(design) ? 'scale(1.35)' : 'none',
                        transformOrigin: 'center',
                        transition: 'transform 300ms ease',
                      }}
                    />
                  ) : (
                    <img
                      src={design.src}
                      alt={design.alt}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transform: isXatspace2Design(design) ? 'scale(1.45)' : isXatspaceDesign(design) ? 'scale(1.35)' : 'none',
                        transformOrigin: 'center',
                        transition: 'transform 300ms ease',
                      }}
                    />
                  )}
                  {/* Overlay con nombre */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent)',
                      padding: '0 0 0',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        gap: '10px',
                        padding: '18px 12px 10px',
                        color: COLORS.textPrimary,
                        fontSize: '12px',
                        fontWeight: 700,
                        textAlign: 'center',
                      }}
                    >
                      <span style={{ textTransform: 'uppercase', letterSpacing: '0.04em' }}>DISEÑOS</span>
                      <span
                        style={{
                          minWidth: '22px',
                          height: '22px',
                          borderRadius: '8px',
                          background: 'rgba(255,255,255,0.12)',
                          border: '1px solid rgba(255,255,255,0.18)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '0 6px',
                          lineHeight: 1,
                        }}
                      >
                        {slideIndex + 1}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Indicadores */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              paddingBottom: '16px',
            }}
          >
            {recentDesigns.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                style={{
                  width: index === currentSlide ? '24px' : '8px',
                  height: '4px',
                  borderRadius: '2px',
                  background: index === currentSlide ? COLORS.primary : 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 300ms ease',
                  boxShadow: index === currentSlide ? `0 0 12px ${COLORS.primaryShadow}` : 'none',
                }}
                onMouseEnter={(e) => {
                  if (index !== currentSlide) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (index !== currentSlide) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  }
                }}
              />
            ))}
          </div>
        </div>

        {/* BLOQUE DERECHO - GIFS nuevos */}
        <aside
          className="recent-works-section"
          style={{
            background: 'rgba(15, 15, 15, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '18px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '420px',
          }}
        >
          <div
            style={{
              fontSize: '18px',
              fontWeight: 800,
              color: COLORS.textPrimary,
              marginBottom: '20px',
            }}
          >
            GIFS <span style={{ color: COLORS.primary }}>NUEVOS</span>
          </div>

          {/* Sprites pequeños */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              flex: 1,
              overflowY: 'auto',
              paddingRight: '8px',
            }}
          >
            {gifDesigns.map((gif, index) => (
              <div
                key={gif.id}
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center',
                  padding: '7px',
                  borderRadius: '10px',
                  transition: 'all 300ms ease',
                  background: 'rgba(255, 255, 255, 0.02)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(168, 85, 247, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                }}
              >
                <div
                  style={{
                    width: '82px',
                    height: '82px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <SpriteAnimation image={gif.image} alt={gif.title} fps={12} />
                </div>
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: COLORS.textPrimary,
                    lineHeight: 1.3,
                  }}
                >
                  GIF {index + 1}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>

      {/* SECCIÓN DE NUEVOS DISEÑOS */}
      <section
        className="gif-home-section recent-designs-home-section"
        onMouseEnter={() => setIsRecentAutoPlaying(false)}
        onMouseLeave={() => setIsRecentAutoPlaying(true)}
        style={{
          marginBottom: '52px',
          padding: '24px',
          borderRadius: '18px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(15, 15, 15, 0.5)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: COLORS.textPrimary, margin: 0 }}>NUEVOS <span style={{ color: COLORS.primary }}>DISEÑOS</span></h2>
            <p style={{ color: COLORS.textSecondary, fontSize: '13px', margin: '4px 0 0' }}>Nuevos diseños realizados</p>
          </div>
          <button
            type="button"
            onClick={() => setCurrentCategory('xatspaces')}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '8px',
              padding: '8px 12px',
              color: COLORS.textPrimary,
              fontSize: '13px',
            }}
          >
            Ver trabajos
          </button>
        </div>

        <div className="home-gif-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '12px', overflow: 'hidden' }}>
          {visibleRecentWorks.map((design, position) => {
            return (
              <div
                key={`${design.id}-${position}`}
                onClick={() => openLightbox(design)}
                className="home-gif-card"
                style={{
                  aspectRatio: '1',
                  height: 'auto',
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  background: getDesignBackground(design),
                  animation: 'homeGifSlideUp 520ms ease both',
                }}
              >
                {isVideoAsset(design.src) ? (
                  <video
                    src={design.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      backgroundColor: isXatspaceDesign(design) ? 'transparent' : '#000',
                      transform: isXatspace2Design(design) ? 'scale(1.45)' : isXatspaceDesign(design) ? 'scale(1.35)' : 'none',
                      transformOrigin: 'center',
                      transition: 'transform 300ms ease',
                    }}
                  />
                ) : (
                  <img
                    src={design.src}
                    alt={design.alt}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transform: isXatspace2Design(design) ? 'scale(1.45)' : isXatspaceDesign(design) ? 'scale(1.35)' : 'none',
                      transformOrigin: 'center',
                      transition: 'transform 300ms ease',
                    }}
                    loading="eager"
                    decoding="async"
                  />
                )}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0, 0, 0, 0.88), transparent 55%)' }} />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '8px',
                    left: '8px',
                    right: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    color: COLORS.textPrimary,
                    textAlign: 'center',
                    fontSize: '12px',
                    fontWeight: 700,
                  }}
                >
                  <span style={{ textTransform: 'uppercase', letterSpacing: '0.04em' }}>DISEÑOS</span>
                  <span
                    style={{
                      minWidth: '22px',
                      height: '22px',
                      borderRadius: '8px',
                      background: 'rgba(255,255,255,0.12)',
                      border: '1px solid rgba(255,255,255,0.18)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0 6px',
                      lineHeight: 1,
                    }}
                  >
                    {position + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
          {recentWorks.map((_, index) => (
            <button
              type="button"
              key={index}
              aria-label={`Ver nuevo diseño ${index + 1}`}
              onClick={() => { setCurrentRecentSlide(index); setIsRecentAutoPlaying(false); }}
              style={{ width: index === currentRecentSlide ? '24px' : '8px', height: '4px', padding: 0, border: 0, borderRadius: '2px', background: index === currentRecentSlide ? COLORS.primary : 'rgba(255,255,255,0.2)' }}
            />
          ))}
        </div>
      </section>

      {/* SECCIÓN DE SERVICIOS */}
      <section>
        <h2
          style={{
            fontSize: '32px',
            fontWeight: 800,
            margin: '0 0 28px',
            color: COLORS.textPrimary,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{ color: COLORS.primary }}>Mis servicios</span>
          <span style={{ fontSize: '18px', color: COLORS.textMuted }}>›</span>
        </h2>

        {/* Grid de servicios */}
        <div
          className="services-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            gap: '20px',
          }}
        >
          {services.map((service, idx) => {
            // Obtener imagen de portada según el servicio desde la carpeta de servicios
            const serviceCoverMap = {
              xatspaces: `${import.meta.env.BASE_URL}assets/home/Nuestros Servicios/Xatspace.png`,
              animated: `${import.meta.env.BASE_URL}assets/home/Nuestros Servicios/GIF.png`,
              static: `${import.meta.env.BASE_URL}assets/home/Nuestros Servicios/Pcback.png`,
              pstyle: `${import.meta.env.BASE_URL}assets/home/Nuestros Servicios/Pstyle.png`,
              sala: `${import.meta.env.BASE_URL}assets/home/Nuestros Servicios/Sala.png`,
              reproductores: `${import.meta.env.BASE_URL}assets/home/Nuestros Servicios/Reproductor.png`,
            };
            const coverImage = serviceCoverMap[service.id] || `${import.meta.env.BASE_URL}assets/placeholder.png`;

            return (
              <div
                key={service.id}
                onClick={() => {
                  setCurrentCategory(service.id);
                  setCurrentGroup(1);
                }}
                style={{
                  background: 'rgba(15, 15, 15, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 300ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = `0 8px 24px ${COLORS.primaryShadow}`;
                  e.currentTarget.style.borderColor = 'rgba(43, 127, 252, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                }}
              >
                {/* Imagen superior */}
                <div
                  style={{
                    height: '110px',
                    width: '100%',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <img
                    src={coverImage}
                    alt={language === 'es' ? service.name : service.nameEn}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 300ms ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  />
                  {/* Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.6))',
                    }}
                  />
                </div>

                {/* Contenido inferior */}
                <div style={{ padding: '16px' }}>
                  <h3
                    style={{
                      fontSize: '18px',
                      fontWeight: 800,
                      margin: '0 0 8px',
                      color: COLORS.textPrimary,
                    }}
                  >
                    {language === 'es' ? service.name : service.nameEn}
                  </h3>

                  <p
                    style={{
                      fontSize: '13px',
                      color: COLORS.textSecondary,
                      margin: '0 0 12px',
                      lineHeight: 1.4,
                    }}
                  >
                    {language === 'es' ? service.description : service.descriptionEn}
                  </p>

                  {/* Precio y nota */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                    }}
                  >
                    <div
                      style={{
                        color: COLORS.primary,
                        fontWeight: 800,
                        fontSize: '14px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      Ver más
                      <span aria-hidden="true" style={{ fontSize: '16px', lineHeight: 1 }}>→</span>
                    </div>

                    {service.note && language === 'es' && (
                      <div
                        style={{
                          fontSize: '11px',
                          color: COLORS.gold,
                          fontStyle: 'italic',
                        }}
                      >
                        {service.note}
                      </div>
                    )}

                    {service.noteEn && language === 'en' && (
                      <div
                        style={{
                          fontSize: '11px',
                          color: COLORS.gold,
                          fontStyle: 'italic',
                        }}
                      >
                        {service.noteEn}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
