import { useState, useEffect, useRef } from 'react';
import { ArrowDown, Layers, Wrench, CheckCircle, SlidersHorizontal, Eye, EyeOff } from 'lucide-react';
import {
  LayerKeycapsSvg,
  LayerSwitchesSvg,
  LayerBrassPlateSvg,
  LayerPoronFoamSvg,
  LayerPcbSvg,
  LayerWalnutCaseSvg,
} from './HeroKeyboard3D';

const KEYBOARD_LAYERS = [
  {
    id: 'keycaps',
    number: 1,
    title: 'PBT Кейкапы',
    subtitle: 'Cherry профиль 1.5мм',
    description: 'Износостойкий PBT пластик с пятисторонней сублимацией. Теплая ретро-палитра, не стирается и не оставляет жирного блеска.',
    badge: 'Толщина 1.5мм',
    material: 'PBT пластик 1.5 мм',
    acoustics: 'Глубокий четкий тон',
    explodedZ: 125,
    assembledZ: 15,
    color: '#C2622D',
    Component: LayerKeycapsSvg,
  },
  {
    id: 'switches',
    number: 2,
    title: 'Свитчи Gateron Oil King',
    subtitle: 'Линейные переключатели 55г',
    description: 'Премиальные переключатели с черным нейлоновым корпусом, POM стемом и заводской консистентной смазкой.',
    badge: 'Заводская смазка',
    material: 'Black Nylon + POM',
    acoustics: 'Плотный мягкий ход',
    explodedZ: 75,
    assembledZ: 11,
    color: '#E2C178',
    Component: LayerSwitchesSvg,
  },
  {
    id: 'plate',
    number: 3,
    title: 'Латунный плейт (Brass)',
    subtitle: 'CNC фрезеровка 1.5мм',
    description: 'Тяжелый латунный плейт с демпферными ушками для крепления Gasket Mount. Обеспечивает плотную посадку свитчей.',
    badge: 'Gasket Mount ушки',
    material: 'Латунь CuZn39Pb3',
    acoustics: 'Собранный благородный звук',
    explodedZ: 25,
    assembledZ: 7,
    color: '#D4AA50',
    Component: LayerBrassPlateSvg,
  },
  {
    id: 'foam',
    number: 4,
    title: 'Шумоизоляция Poron',
    subtitle: 'Японская пена 3.5мм + силикон',
    description: 'Двойной контур виброизоляции: пористый японский Poron между платой и плейтом плюс формованная силиконовая прокладка.',
    badge: 'Виброгашение',
    material: 'Японский Poron 3.5мм',
    acoustics: 'Устранение полых резонансов',
    explodedZ: -25,
    assembledZ: 3,
    color: '#D98A32',
    Component: LayerPoronFoamSvg,
  },
  {
    id: 'pcb',
    number: 5,
    title: 'Плата Hot-Swap PCB',
    subtitle: '5-pin разъемы TTC & Tri-mode',
    description: 'Печатная плата с сокетами быстрой замены без пайки (до 10 000 циклов). Поддержка Bluetooth 5.2, 2.4Ghz и USB-C.',
    badge: 'Hot-Swap 5-pin',
    material: 'FR-4 стеклотекстолит',
    acoustics: 'Гибкие флекс-пропилы',
    explodedZ: -75,
    assembledZ: -1,
    color: '#3A7BC8',
    Component: LayerPcbSvg,
  },
  {
    id: 'case',
    number: 6,
    title: 'Корпус из массива ореха',
    subtitle: 'Американский орех + латунь',
    description: 'Фрезерованный корпус из цельного массива ореха с масляно-восковой пропиткой и встроенным латунным утяжелителем (вес 1.85 кг).',
    badge: 'Массив дерева',
    material: 'Массив ореха + латунь',
    acoustics: 'Теплый монолитный резонанс',
    explodedZ: -125,
    assembledZ: -5,
    color: '#6F462B',
    Component: LayerWalnutCaseSvg,
  },
];

const PRESETS = [
  { value: 0, label: 'В сборе (0%)', isActive: (e) => e < 0.1 },
  { value: 0.5, label: '50%', isActive: (e) => e >= 0.4 && e <= 0.6 },
  { value: 1, label: 'По слоям (100%)', isActive: (e) => e > 0.9 },
];

const FEATURES = ['Gasket Mount', 'Латунный плейт 1.5мм', 'Массив ореха', 'PBT пластик'];
const CORNERS = ['left-1 top-1', 'right-1 top-1', 'left-1 bottom-1', 'right-1 bottom-1'];
const PRESERVE_3D = { transformStyle: 'preserve-3d', WebkitTransformStyle: 'preserve-3d' };

export function HeroExplodedParallax({ onExploreCatalog, onOpenChatBot }) {
  const [explosion, setExplosion] = useState(1);
  const [activeLayerId, setActiveLayerId] = useState('keycaps');
  const [isolateActiveLayer, setIsolateActiveLayer] = useState(false);

  const heroRef = useRef(null);
  const stage3dRef = useRef(null);
  const bgGlowRef = useRef(null);

  const target = useRef({ x: 0, y: 0, scrollY: 0 });
  const current = useRef({ x: 0, y: 0, scrollY: 0 });

  useEffect(() => {
    let animId;

    const resetTilt = () => {
      target.current.x = 0;
      target.current.y = 0;
    };

    // Наклон стенда следует за курсором, пока он внутри секции
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const r = heroRef.current.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) return resetTilt();
      target.current.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      target.current.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };

    const handleScroll = () => {
      target.current.scrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mouseleave', resetTilt);

    const animate = () => {
      const ease = 0.08;
      current.current.x += (target.current.x - current.current.x) * ease;
      current.current.y += (target.current.y - current.current.y) * ease;
      current.current.scrollY += (target.current.scrollY - current.current.scrollY) * 0.1;

      const { x, y, scrollY: sy } = current.current;

      if (stage3dRef.current) {
        const rotX = 50 + y * 7;
        const rotZ = -26 + x * 8;
        const rotY = x * 5;
        stage3dRef.current.style.transform = `rotateX(${rotX.toFixed(2)}deg) rotateZ(${rotZ.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
      }

      if (bgGlowRef.current) {
        bgGlowRef.current.style.transform = `translate3d(0, ${(sy * 0.15).toFixed(2)}px, 0)`;
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', resetTilt);
    };
  }, []);

  const activeLayer = KEYBOARD_LAYERS.find(l => l.id === activeLayerId) || KEYBOARD_LAYERS[0];

  return (
    <section 
      ref={heroRef}
      className="relative overflow-hidden py-8 md:py-12 border-b border-stone-200 bg-cream-50 select-none"
    >
      <div 
        ref={bgGlowRef}
        className="absolute inset-0 pointer-events-none"
        style={{ willChange: 'transform' }}
      >
        <div className="absolute top-8 right-1/4 w-96 h-96 rounded-full bg-amber-200/25 blur-3xl" />
        <div className="absolute bottom-4 left-1/3 w-96 h-96 rounded-full bg-stone-300/20 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left Column: Information and Controls */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream-200 text-stone-700 text-xs font-mono font-medium border border-stone-300">
              <span className="w-2 h-2 rounded-full bg-vintage-accent"></span>
              <span>Мастерская кастомных механических клавиатур</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-retro tracking-tight text-stone-900 leading-tight">
              Качественный кастом. <br />
              <span className="text-vintage-accent">Послойная сборка</span> кастома.
            </h1>

            <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed max-w-lg">
              Интерактивная архитектура флагмана KeyCraft Retro 75. Выберите любой компонент, чтобы приподнять его для детального изучения.
            </p>

            <div className="p-4 rounded-xl border border-stone-300 bg-white shadow-sm space-y-3 max-w-lg">
              
              {/* Layer Separation Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-semibold text-stone-700 flex items-center gap-1.5">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-vintage-accent" />
                    Разнесение компонентов:
                  </span>
                  <span className="font-bold text-vintage-accent">
                    {Math.round(explosion * 100)}%
                  </span>
                </div>
                
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={explosion}
                  onChange={(e) => setExplosion(parseFloat(e.target.value))}
                  className="w-full accent-vintage-accent cursor-pointer h-1.5 bg-stone-200 rounded-lg"
                />

                <div className="flex items-center justify-between pt-1 text-[11px] font-mono">
                  {PRESETS.map(({ value, label, isActive }) => (
                    <button
                      key={label}
                      onClick={() => setExplosion(value)}
                      className={`px-2.5 py-1 rounded border transition-all ${
                        isActive(explosion)
                          ? 'bg-vintage-accent text-white border-vintage-accent font-semibold'
                          : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Layer Selection Buttons + Isolation Toggle */}
              <div className="pt-1">
                <div className="flex items-center justify-between pb-1.5 text-xs font-mono">
                  <span className="text-stone-500 font-semibold">Компоненты сборки:</span>
                  <button
                    onClick={() => setIsolateActiveLayer(!isolateActiveLayer)}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                      isolateActiveLayer
                        ? 'bg-amber-100 text-amber-800 border border-amber-300 font-semibold'
                        : 'bg-stone-100 text-stone-600 border border-stone-200 hover:bg-stone-200'
                    }`}
                  >
                    {isolateActiveLayer ? <Eye className="w-3 h-3 text-vintage-accent" /> : <EyeOff className="w-3 h-3 text-stone-400" />}
                    <span>{isolateActiveLayer ? 'Изоляция вкл' : 'Изолировать'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-1">
                  {KEYBOARD_LAYERS.map((layer) => {
                    const isSelected = activeLayerId === layer.id;
                    return (
                      <button
                        key={layer.id}
                        onClick={() => setActiveLayerId(layer.id)}
                        className={`p-1.5 rounded text-left text-[11px] font-mono transition-all border flex flex-col justify-between ${
                          isSelected
                            ? 'bg-stone-900 text-white border-stone-900 font-medium ring-1 ring-stone-900'
                            : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        <span className="text-[10px] opacity-70">Слой {layer.number}</span>
                        <span className="truncate font-semibold">{layer.title.split(' ')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected Layer Details Card */}
              <div className="p-3 rounded-lg bg-cream-100/70 border border-stone-200 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-stone-900">
                    Слой {activeLayer.number}: {activeLayer.title}
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-white text-vintage-accent font-semibold border border-stone-200">
                    {activeLayer.badge}
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {activeLayer.description}
                </p>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-1 border-t border-stone-200/80">
                  <div className="text-stone-500">
                    Материал: <strong className="text-stone-700">{activeLayer.material}</strong>
                  </div>
                  <div className="text-stone-500 text-right">
                    Акустика: <strong className="text-stone-700">{activeLayer.acoustics}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-1 flex-wrap">
              <button
                onClick={onExploreCatalog}
                className="btn-retro-primary px-5 py-2.5 flex items-center gap-2"
              >
                <span>Перейти в каталог</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenChatBot}
                className="btn-retro px-4 py-2.5 flex items-center gap-2 bg-white"
              >
                <Wrench className="w-4 h-4 text-vintage-accent" />
                <span>Подобрать комплектующие</span>
              </button>
            </div>

            <div className="flex items-center gap-4 pt-2 text-xs font-mono text-stone-500 flex-wrap">
              {FEATURES.map((f) => (
                <span key={f} className="flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-vintage-accent" />
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: 3D Perspective Stage */}
          <div 
            className="lg:col-span-7 relative flex justify-center items-center py-2"
            style={{ 
              perspective: '1400px',
              WebkitPerspective: '1400px',
            }}
          >
            <div 
              className="relative w-full max-w-[580px] bg-white/95 backdrop-blur rounded-2xl border border-stone-300 p-4 sm:p-5 shadow-clean select-none"
            >
              
              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-stone-200 pb-2.5 mb-1">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-stone-800">
                  <Layers className="w-4 h-4 text-vintage-accent" />
                  <span>Архитектура кастома</span>
                </div>
                <div className="text-[11px] font-mono font-bold text-vintage-accent tracking-wider uppercase">
                  KeyCraft Retro 75
                </div>
              </div>

              {/* Compact 3D Stage Viewport (390px height, harmonious balanced spacing) */}
              <div className="relative w-full h-[380px] sm:h-[410px] flex items-center justify-center overflow-visible">
                
                <div 
                  ref={stage3dRef}
                  className="relative w-[340px] sm:w-[410px] h-[92px] sm:h-[110px] transition-transform duration-75 ease-out"
                  style={{
                    ...PRESERVE_3D,
                    transform: 'rotateX(50deg) rotateZ(-26deg)',
                    willChange: 'transform',
                  }}
                >
                  {/* Subtle 4-Corner Assembly Alignment Guide Lines */}
                  {explosion > 0.3 && (
                    <div 
                      className="absolute inset-0 pointer-events-none opacity-35"
                      style={PRESERVE_3D}
                    >
                      {CORNERS.map((pos) => (
                        <div
                          key={pos}
                          className={`absolute ${pos} w-[1px] bg-stone-400 border-l border-dashed border-stone-500`}
                          style={{
                            height: `${250 * explosion}px`,
                            transform: `translate3d(0, 0, ${(-125 * explosion).toFixed(1)}px) rotateX(-90deg)`,
                            transformOrigin: 'top center',
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* 6 Perspective Layers - Clicking pops the layer UPWARDS for full inspection */}
                  {KEYBOARD_LAYERS.map((layer) => {
                    const isSelected = activeLayerId === layer.id;
                    // Выбранный слой приподнимается (+50px по Z, -8px по Y)
                    const z = layer.assembledZ + (layer.explodedZ - layer.assembledZ) * explosion + (isSelected ? 50 : 0);
                    const liftY = isSelected ? -8 : 0;
                    const opacity = isolateActiveLayer && !isSelected ? 0.22 : 1;
                    const { Component } = layer;

                    return (
                      <div
                        key={layer.id}
                        onClick={() => setActiveLayerId(layer.id)}
                        className="absolute inset-0 cursor-pointer transition-all duration-300 ease-out"
                        style={{
                          ...PRESERVE_3D,
                          transform: `translate3d(0, ${liftY}px, ${z.toFixed(1)}px)`,
                          zIndex: isSelected ? 35 : 10,
                          opacity,
                          filter: isSelected
                            ? 'drop-shadow(0 22px 30px rgba(194, 98, 45, 0.55))'
                            : 'drop-shadow(0 6px 12px rgba(25, 18, 12, 0.14))',
                          willChange: 'transform, opacity',
                        }}
                      >
                        <Component isHighlighted={isSelected} />

                        {/* Floating Label on Right */}
                        {explosion > 0.35 && (
                          <div
                            className={`absolute -right-2 top-1/2 -translate-y-1/2 translate-x-full hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-mono whitespace-nowrap shadow-sm border transition-all ${
                              isSelected
                                ? 'bg-stone-900 text-white border-stone-900 scale-105 ring-2 ring-vintage-accent/40 font-bold'
                                : 'bg-white/95 text-stone-700 border-stone-300 hover:bg-white'
                            }`}
                            style={{
                              transform: 'rotateZ(26deg) rotateX(-50deg)',
                              transformOrigin: 'left center',
                            }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: layer.color }}></span>
                            <span>{layer.number}. {layer.title.split(' ')[0]}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

              </div>

              {/* Bottom Footer Info - Clean and uncluttered */}
              <div className="flex items-center justify-between text-xs font-mono text-stone-600 pt-2 border-t border-stone-200">
                <span className="font-semibold text-stone-800">
                  Слой {activeLayer.number}: {activeLayer.title}
                </span>
                <span className="text-[11px] font-mono text-vintage-accent font-medium">
                  {activeLayer.badge}
                </span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
