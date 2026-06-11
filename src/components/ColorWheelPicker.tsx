import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Math/Color converters

// Converts HEX (#RRGGBB) to HSL
export function hexToHsl(hex: string): { h: number; s: number; l: number } {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

// Converts HSL to HEX
export function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }

  const rHex = Math.round((r + m) * 255).toString(16).padStart(2, '0');
  const gHex = Math.round((g + m) * 255).toString(16).padStart(2, '0');
  const bHex = Math.round((b + m) * 255).toString(16).padStart(2, '0');

  return `#${rHex}${gHex}${bHex}`;
}

interface ColorWheelPickerProps {
  value: string;
  onChange: (color: string) => void;
  label: string;
  lang?: 'ar' | 'en';
}

const PRESET_CREATIVE_COLORS = [
  '#fbbf24', // Rich warm Amber (Gold)
  '#10b981', // Creative Jade (Emerald)
  '#ef4444', // Hot Crimson
  '#3b82f6', // Aesthetic Blue
  '#8b5cf6', // Cosmic Violet
  '#f97316', // Cyber Orange
  '#ec4899', // Cotton candy Pink
  '#ffffff', // Crisp Snow White
  '#78716c', // Elegant Warm Gray
  '#000000', // Abyss Black
];

export function ColorWheelPicker({ value, onChange, label, lang = 'ar' }: ColorWheelPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDragging = useRef(false);

  // Parse external starting value (handles presets correctly)
  const { h: initialH, s: initialS, l: initialL } = hexToHsl(value);
  const [hsl, setHsl] = useState({ h: initialH, s: initialS, l: initialL });

  // Keep state in sync with external value modifications (presets, random, etc)
  useEffect(() => {
    const { h, s, l } = hexToHsl(value);
    setHsl({ h, s, l });
  }, [value]);

  const updateColor = (newH: number, newS: number, newL: number) => {
    setHsl({ h: newH, s: newS, l: newL });
    const hex = hslToHex(newH, newS, newL);
    onChange(hex);
  };

  // Redraw the canvas wheel + handle indicator point
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;
    const r = cx - 5; // offset slightly for safe pointer display

    ctx.clearRect(0, 0, width, height);

    // 1. Draw 360 slices of colors
    for (let angle = 0; angle < 360; angle += 1) {
      const startAngle = (angle - 0.5) * Math.PI / 180;
      const endAngle = (angle + 1.5) * Math.PI / 180;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, startAngle, endAngle);
      ctx.closePath();
      // Draw standard hue spectrum at full lightness range
      ctx.fillStyle = `hsl(${angle}, 100%, 50%)`;
      ctx.fill();
    }

    // 2. Draw white overlay to simulate HSL Saturation (white in center, pure hue at outer circle edge)
    const satGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    satGrad.addColorStop(0, '#ffffff');
    satGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.fillStyle = satGrad;
    ctx.fill();

    // 3. Draw a thin border to keep the wheel clean
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.strokeStyle = '#292524';
    ctx.lineWidth = 1;
    ctx.stroke();

    // 4. Calculate selection indicator knob coordinates
    const angleRad = (hsl.h * Math.PI) / 180;
    const dist = (hsl.s / 100) * r;
    const indicatorX = cx + dist * Math.cos(angleRad);
    const indicatorY = cy + dist * Math.sin(angleRad);

    // Draw knob circle shadow
    ctx.beginPath();
    ctx.arc(indicatorX, indicatorY, 6, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fill();

    // Draw white selector knob circle
    ctx.beginPath();
    ctx.arc(indicatorX, indicatorY, 5, 0, 2 * Math.PI);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Fill selector knob center with chosen color at standard lightness to be distinct
    ctx.beginPath();
    ctx.arc(indicatorX, indicatorY, 3, 0, 2 * Math.PI);
    ctx.fillStyle = hslToHex(hsl.h, hsl.s, hsl.l);
    ctx.fill();

  }, [isOpen, hsl.h, hsl.s, hsl.l]);

  // Coordinates dragging mapper
  const handlePointerMath = (e: React.PointerEvent<HTMLCanvasElement> | PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const width = canvas.width;
    const cx = width / 2;
    const cy = width / 2;
    const r = cx - 5;

    const dx = x - cx;
    const dy = y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Calculate saturation based on ratio, clamped between 0 and 100
    const nextS = Math.min(100, Math.round((dist / r) * 100));

    // Calculate Hue based on angle
    let angleDeg = Math.round((Math.atan2(dy, dx) * 180) / Math.PI);
    if (angleDeg < 0) angleDeg += 360;
    const nextH = angleDeg;

    updateColor(nextH, nextS, hsl.l);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    handlePointerMath(e);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDragging.current) return;
    handlePointerMath(e);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDragging.current = false;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full text-right" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Label and triggers */}
      <span className="text-[11px] font-black text-stone-400 uppercase tracking-wide block mb-1">
        {label}
      </span>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between bg-stone-950 hover:bg-stone-900 border text-xs p-2 rounded-xl transition-all duration-200 outline-none cursor-pointer ${
          isOpen ? 'border-amber-400 ring-2 ring-amber-500/10' : 'border-stone-800 hover:border-stone-700'
        }`}
      >
        <div className="flex items-center gap-2.5">
          {/* Display circle preview */}
          <div
            className="w-6 h-6 rounded-lg border border-stone-800 shadow-inner shrink-0 relative overflow-hidden"
            style={{ backgroundColor: value }}
          >
            {/* Checkerboard inside opacity cases */}
            {value === 'transparent' && (
              <div className="absolute inset-0 bg-stone-800 flex items-center justify-center font-bold text-[9px] text-stone-500">
                Ø
              </div>
            )}
          </div>
          <span className="text-[11px] font-mono font-bold uppercase text-stone-300">
            {value}
          </span>
        </div>
        <span className="text-[10px] bg-stone-900 text-stone-400 px-2 py-1 rounded border border-stone-800 font-sans font-bold hover:text-amber-400 transition-colors">
          {lang === 'ar' ? 'عجلة الألوان' : 'Color Wheel'}
        </span>
      </button>

      {/* Popover Wheel panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 5, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            className="absolute z-[60] w-[220px] bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl p-3.5 flex flex-col gap-3"
            style={{
              left: lang === 'ar' ? 'auto' : 0,
              right: lang === 'ar' ? 0 : 'auto'
            }}
          >
            {/* Color Wheel Canvas Wrapper */}
            <div className="flex justify-center select-none">
              <canvas
                ref={canvasRef}
                width={160}
                height={160}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                className="cursor-crosshair rounded-full touch-none"
              />
            </div>

            {/* Lightness / Saturation text info */}
            <div className="flex justify-between items-center text-[10px] text-stone-500 font-mono">
              <span className="font-bold text-stone-400">H: {hsl.h}° S: {hsl.s}% L: {hsl.l}%</span>
              <span className="uppercase text-amber-500 font-bold">{value}</span>
            </div>

            {/* Custom Lightness Control Slider */}
            <div className="flex flex-col gap-1 text-right">
              <div className="flex justify-between text-[9.5px] font-bold text-stone-400">
                <span>{lang === 'ar' ? 'السطوع (الإضاءة)' : 'Brightness (Lightness)'}</span>
                <span>{hsl.l}%</span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={hsl.l}
                  onChange={(e) => updateColor(hsl.h, hsl.s, Number(e.target.value))}
                  className="w-full h-2 rounded-lg cursor-pointer accent-amber-500 bg-stone-950 border border-stone-850 appearance-none focus:outline-none"
                  style={{
                    background: `linear-gradient(to right, #000000, ${hslToHex(hsl.h, hsl.s, 50)}, #ffffff)`
                  }}
                />
              </div>
            </div>

            {/* Direct Hex Input */}
            <div className="flex gap-1.5 items-center bg-stone-950 rounded-lg p-1.5 border border-stone-850/80">
              <span className="text-[10px] font-mono text-stone-500 pl-1 font-bold">HEX</span>
              <input
                type="text"
                value={value}
                onChange={(e) => {
                  let maybeHex = e.target.value;
                  if (!maybeHex.startsWith('#')) {
                    maybeHex = '#' + maybeHex;
                  }
                  if (/^#[0-9A-F]{6}$/i.test(maybeHex)) {
                    onChange(maybeHex);
                  }
                }}
                className="w-full bg-transparent text-white text-[11px] font-mono font-bold uppercase focus:outline-none text-left"
                placeholder="#FEFEFE"
              />
            </div>

            {/* Elegant Studio Palette Shortcuts */}
            <div className="flex flex-col gap-1.5 pt-1 border-t border-stone-850">
              <span className="text-[9px] font-bold text-stone-500 uppercase tracking-wider block">
                {lang === 'ar' ? 'ألوان سريعة' : 'Quick Swatches'}
              </span>
              <div className="grid grid-cols-5 gap-1.5">
                {PRESET_CREATIVE_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => onChange(color)}
                    className={`w-6 h-6 rounded-md hover:scale-110 active:scale-95 transition-all cursor-pointer border ${
                      color.toLowerCase() === value.toLowerCase()
                        ? 'border-amber-400 scale-105 shadow-md shadow-amber-500/20'
                        : 'border-stone-850 hover:border-stone-600'
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
