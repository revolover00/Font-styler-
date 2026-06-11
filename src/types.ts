export type FontCategory = 'all' | 'serif' | 'sans-serif' | 'script' | 'display' | 'monospace';

export interface FontItem {
  id: string;
  name: string;
  arabicCategory: string;
  category: FontCategory;
  family: string;
  source: string;
  author?: string;
  description: string;
  arabicDescription: string;
  recommendedUse: string;
  arabicRecommendedUse: string;
}

export interface TextStyle {
  text: string;
  fontSize: number; // in px
  fontWeight: number;
  letterSpacing: number; // in em/px
  lineHeight: number;
  uppercase: boolean;
  italic: boolean;
  textShadow: string; // none, glow, subtle, retro
}

export interface SubtitleStyle {
  text: string;
  fontSize: number;
  fontWeight: number;
  letterSpacing: number;
  uppercase: boolean;
  italic: boolean;
  fontFamily: string;
  visible: boolean;
  opacity: number;
}

export interface BackgroundStyle {
  type: 'solid' | 'gradient' | 'grid' | 'radial' | 'noise';
  colorStart: string;
  colorEnd: string;
  gridColor?: string;
  angle: number;
}

export interface LogoPreset {
  id: string;
  title: string;
  arabicTitle: string;
  presetName: string;
  arabicPresetName: string;
  mainText: string;
  subtitleText: string;
  mainFontId: string;
  mainStyle: TextStyle;
  subtitleFontId: string;
  subtitleStyle: SubtitleStyle;
  bgColor: string;
  textColor: string;
  accentColor: string;
  bgConfig: BackgroundStyle;
  borderType: 'none' | 'thin' | 'thick' | 'double' | 'rounded' | 'accent-line';
  category?: 'script' | 'serif' | 'display' | 'sans';
  row?: number;
}
