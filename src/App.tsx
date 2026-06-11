import { useState, useMemo, useEffect, useRef, CSSProperties } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  RotateCcw, Sparkles, Download, Copy, Search, Sliders, Palette, 
  Grid, HelpCircle, Check, Languages, Maximize2, RefreshCw, 
  Plus, Undo, FileText, ChevronRight, Eye, Info,
  Zap, Shield, Cpu, Compass, PenTool, Layout, Type, Coffee, Flame, Cookie, GlassWater, Globe, Mail, Phone, User, Award, Lock, Unlock
} from 'lucide-react';
import { FONTS_CATALOG, PRESETS_CATALOG } from './fonts';
import { IMAGE_PRESETS_CATALOG } from './imagePresets';
import { FontItem, LogoPreset, FontCategory, TextStyle, SubtitleStyle, BackgroundStyle } from './types';
import { CustomSelect, CustomCheckbox } from './components/CustomControls';
import { ColorWheelPicker } from './components/ColorWheelPicker';

const TRANSLATIONS = {
  ar: {
    appTitle: 'بيان للخطوط والشعارات الأنيقة',
    appSubtitle: 'لوحة تفاعلية لتصميم الكتابات البصرية وتجربة أرقى الخطوط وتعديلها وتحميلها بصيغ شعارات متكاملة.',
    navStudio: 'الأستوديو الرئيسي',
    navPresets: 'التصاميم الجاهزة من الصورة',
    navAllFonts: 'مستكشف الخطوط الكلي',
    textSection: 'الكتابة والمحتوى',
    mainTextInput: 'النص الأساسي (أو اسم شعارك)',
    subtitleTextInput: 'النص الفرعي / الشعار المساعد',
    showSubLabel: 'تفعيل النص المساعد السفلي',
    uppercaseLabel: 'تحويل الحروف الكبيرة (للإنجليزية)',
    italicLabel: 'تمييز بشكل مائل (Italic)',
    fontFamilyLabel: 'اختر خط التصميم',
    fontCategoryLabel: 'فئة الخطوط',
    presetsLabel: 'تصاميم شعارات الصورة',
    presetsSub: 'تحتوي هاته القائمة على الشعارات المستخرجة التي ركبتها بدقة لتلبي طلبك وتحاكي خطوط الصورة و هويتها البصرية فورا بنقرة زر واحدة.',
    presetsToggleImage: 'شعارات الصورة المرفقة (٣٢)',
    presetsToggleGeneral: 'الأنماط العامة المدمجة',
    presetBadge: 'شعار معتمد',
    sizeLabel: 'مقاس الخط الرئيسي',
    weightLabel: 'سماكة ووزن الحرف',
    spacingLabel: 'تباعد الحروف الممتد (Tracking)',
    lineHeightLabel: 'التباعد والمسافة الرأسية',
    subFontFamilyLabel: 'خط الشعار المساعد',
    stylingControl: 'التناسق والحجم والمسافات',
    colorsAndThemes: 'هوية الألوان والخلفيات',
    presetPalette: 'لوحات الألوان الجاهزة',
    textColorLabel: 'لون النص الرئيسي',
    subColorLabel: 'لون النص المساعد',
    bgColorLabel: 'لون الخلفية أو البداية',
    bgEndColorLabel: 'نهاية التدرج اللوني',
    bgTypeLabel: 'شكل وملمس الخلفية',
    solidBg: 'لون مصمت ساده',
    gradientBg: 'تدرج لوني خطي',
    radialBg: 'تدرج لوني دائري مجسم',
    gridBg: 'شبكة هندسية ناصعة',
    noiseBg: 'تدرج ناعم مع لمس فني',
    borderTypeLabel: 'إطار وشكل الهيكل الجمالي',
    effectLabel: 'ظل وتوهج النص',
    canvasTitle: 'لوحة العرض التفاعلية للعنصر المنسق',
    canvasSubtitle: 'صمم هويتك، قارن، واحصل على كود المطورين الفوري أو ملفات المتجهات',
    contrastTitle: 'فاحص نقاوة القراءة والتباين (WCAG)',
    contrastExcellent: 'درجة تباين مذهلة وعالية الوضوح ونقية (AAA)',
    contrastGood: 'وضوح وتباين رائع وقابل للقراءة بنجاح (AA)',
    contrastPoor: 'التباين ضعيف جداً! قد لا تظهر الكتابة بوضوح للمستخدمين',
    previewText: 'أدخل كلماتك لتشاهد السحر هنا',
    compareTitle: 'المقارنة الفورية عبر كل الفئات والخطوط',
    compareSub: 'اكتب نصك وشاهد كيف يظهر في ٢٢ عائلة خط احترافية بشكل تفاعلي موحد',
    searchFontsPlace: 'ابحث عن خط بالاسم...',
    resetBtn: 'إعادة ضبط الإعدادات',
    randomBtn: 'توليد عشوائي غامر',
    copyCss: 'نسخ كود CSS المخصص',
    copiedLabel: 'تم النسخ!',
    downloadSvgLabel: 'تحميل كشعار فكتور SVG',
    exportSuccess: 'تم تحميل ملف التصميم بنجاح! جاهز للإستخدام في Figma والويب',
    exportDesc: 'ملف SVG منتج مدمج فيه كود استدعاء الخط والمسافات بدقة.',
    customTextPH: 'اكتب اسم شعارك هنا...',
    taglinePH: 'شعار أو نص مكمل هادئ للشركة...',
    mainHeading: 'مُصمم الخطوط والشعارات',
    allFontTitle: 'خطوط Google والخطوط المتناسقة في الصورة المرفقة',
    allFontSubtitle: 'تفاصيل الخطوط والترشيحات لجميع الأغراض مع المعايير الفنية',
    recommendedUse: 'الاستخدام الأمثل المقترح:',
    fontCardCategory: 'التصنيف:',
    fontCardAuthor: 'المصمم:',
    detailsLabel: 'معلومات ومواصفات عائلة الخط الفنية',
    borderNone: 'بدون إطار',
    borderThin: 'إطار نحيف وعصري (Minimal)',
    borderThick: 'إطار عريض كلاسيكي (Gothic)',
    borderDouble: 'إطار كلاسيكي مزدوج (Heritage)',
    borderRounded: 'كبسولة دائرية ناعمة',
    borderAccentLine: 'خط لافت سفلي متزن',
    shadowNone: 'بدون ظلال',
    shadowGlow: 'توهج نيون مستقبلي',
    shadowSubtle: 'ظل رقيق وعميق للأبعاد',
    shadowRetro: 'ظل ريترو عتيق مزودج',
    viewModeLabel: 'نمط تمثيل الشعار الفعلي',
    viewModePoster: 'لوحة الملصق المجردة',
    viewModeWebsite: 'قسم الهيرو التفاعلي للويب',
    websiteTemplateLabel: 'تصميم قسم الهيرو الرئيسي',
    websiteTemplateSub: 'شاهد تجسيد الشعار كعلامة تجارية بارزة داخل قسم الهيرو لموقع حقيقي مع إمكانية تعديل النصوص مباشرة!',
    editTip: '💡 تلميح: انقر على أي عنوان أو نص أو كنب لتغييره مباشرة داخل قسم الهيرو!',
    multiFontToggleLabel: 'تفعيل التخصيص المتعدد للخطوط',
    multiFontExplain: 'هذا الخيار يسمح لك بتعيين خطوط مخصصة ومستقلة لكل جزء داخل صفحات الموقع والشعار.',
    logoFontSelectorLabel: 'خط الشعار وعلامة البراند',
    heroFontSelectorLabel: 'خط العنوان الرئيسي للهيرو',
    bodyFontSelectorLabel: 'خط الفقرات والنصوص الفرعية',
    buttonFontSelectorLabel: 'خط أزرار الإجراء والـ CTA',
  },
  en: {
    appTitle: 'Bayan Premium Font Studio',
    appSubtitle: 'An interactive bilingual playground to customize designer font families, tweak parameters, test sizes, and export production-ready vector SVG logos.',
    navStudio: 'Main Studio',
    navPresets: 'Picture-Inspired Presets',
    navAllFonts: 'Font Catalog explorer',
    textSection: 'Content & Copywriting',
    mainTextInput: 'Primary Text (Your Brand Name)',
    subtitleTextInput: 'Subtitle / Tagline Text',
    showSubLabel: 'Enable Tagline Subtitle',
    uppercaseLabel: 'Transform to UPPERCASE',
    italicLabel: 'Italic Stylization',
    fontFamilyLabel: 'Choose Font Family',
    fontCategoryLabel: 'Font Classification',
    presetsLabel: 'Studio Presets from Image',
    presetsSub: 'Hand-crafted configurations mimicking the exact colors, geometry, and styling of the logotypes from your uploaded design sheet.',
    presetsToggleImage: 'Attached Image Logos (32)',
    presetsToggleGeneral: 'General Brand Presets',
    presetBadge: 'Designer Spec',
    sizeLabel: 'Main Font Size',
    weightLabel: 'Font Weight Thickness',
    spacingLabel: 'Letter Spacing (Tracking)',
    lineHeightLabel: 'Line Height & Verticality',
    subFontFamilyLabel: 'Tagline Font Family',
    stylingControl: 'Typographic Layout Control',
    colorsAndThemes: 'Palette and Visual Atmosphere',
    presetPalette: 'Color Palette Presets',
    textColorLabel: 'Primary Text Color',
    subColorLabel: 'Tagline Text Color',
    bgColorLabel: 'Background Start Color',
    bgEndColorLabel: 'Background End Color',
    bgTypeLabel: 'Canvas Background Style',
    solidBg: 'Solid Color',
    gradientBg: 'Linear Gradient',
    radialBg: 'Radial Spotlight Gradient',
    gridBg: 'Aesthetic Reticular Grid',
    noiseBg: 'Rich Textured Gradient',
    borderTypeLabel: 'Structural Frame Identity',
    effectLabel: 'Text Glow & Glow Effects',
    canvasTitle: 'Dynamic Live Canvas Rendering',
    canvasSubtitle: 'Tweak parameters, inspect WCAG, download vector code instantly',
    contrastTitle: 'WCAG Contrast Inspector',
    contrastExcellent: 'Excellent readability compliance (AAA)',
    contrastGood: 'Good standard readability compliance (AA)',
    contrastPoor: 'Extremely poor contrast! Not accessible for regular readers.',
    previewText: 'Watch your creative letters ignite here',
    compareTitle: 'Simultaneous Multi-Font Playground',
    compareSub: 'Write your logo once and watch it render instantly through all 22+ professional Google Font weights.',
    searchFontsPlace: 'Search font family...',
    resetBtn: 'Restore Defaults',
    randomBtn: 'Cosmic Randomization',
    copyCss: 'Copy Tailwind/CSS Settings',
    copiedLabel: 'Copied to Clipboard!',
    downloadSvgLabel: 'Download Vector SVG Logo',
    exportSuccess: 'Exported Vector SVG file successfully! Ready for web, Figma or printing.',
    exportDesc: 'SVG encapsulates high-quality styling metadata and Google Fonts link embeds for cross-platform render integrity.',
    customTextPH: 'Enter your brand name here...',
    taglinePH: 'Premium luxury tagline or studio year...',
    mainHeading: 'Bayan Typography',
    allFontTitle: 'Interactive Font Taxonomy Catalog',
    allFontSubtitle: 'Extensive attributes, design recommendations, and history for premium custom layouts.',
    recommendedUse: 'Recommended For:',
    fontCardCategory: 'Category:',
    fontCardAuthor: 'Designed By:',
    detailsLabel: 'Technical Specifications & Design Persona',
    borderNone: 'Clean (No border Frame)',
    borderThin: 'Sleek Minimalist Border',
    borderThick: 'Gothic Bold Border Frame',
    borderDouble: 'Classic Retrospective Double-Line',
    borderRounded: 'Soft Capsule Pill Border',
    borderAccentLine: 'Grounded Accent Divider Ribbon',
    shadowNone: 'Flat Design (No Shadow)',
    shadowGlow: 'Futuristic Cyber Neon Glow',
    shadowSubtle: 'Deep Velvet Drop Shadow',
    shadowRetro: 'Vintage Retro Duotone Offset Shadow',
    viewModeLabel: 'Representation View Mode',
    viewModePoster: 'Abstract Logo / Poster',
    viewModeWebsite: 'Interactive Web Hero Section',
    websiteTemplateLabel: 'Hero Section Design Style',
    websiteTemplateSub: 'Visualize your brand identity as a live brand logo inside a real premium web Hero Section with inline-editable copy!',
    editTip: '💡 Pro-tip: Click directly on any heading or text details to edit them instantly inside the hero section!',
    multiFontToggleLabel: 'Enable Independent Multi-Font Customization',
    multiFontExplain: 'This option allows you to set customized, independent fonts for each visual asset or webpage element.',
    logoFontSelectorLabel: 'Logo & Brand Font',
    heroFontSelectorLabel: 'Hero Main Headline Font',
    bodyFontSelectorLabel: 'Body Copy & Paragraphs Font',
    buttonFontSelectorLabel: 'Buttons & CTA Actions Font',
  }
};

const COLOR_PALETTES = [
  { name: 'Classic Noir', bg: '#0c0a09', text: '#fafaf9', subText: '#d6d3d1', accent: '#f59e0b', bgEnd: '#1c1917', type: 'gradient' as const },
  { name: 'Emerald Velvet', bg: '#022c22', text: '#fbbf24', subText: '#a7f3d0', accent: '#34d399', bgEnd: '#064e3b', type: 'radial' as const },
  { name: 'Crimson Cyber', bg: '#0f0505', text: '#ef4444', subText: '#fca5a5', accent: '#f43f5e', bgEnd: '#1b0c0c', type: 'grid' as const },
  { name: 'Royal Opal', bg: '#1e3a8a', text: '#fbfbfe', subText: '#bfdbfe', accent: '#60a5fa', bgEnd: '#172554', type: 'gradient' as const },
  { name: 'Warm Cream & Sand', bg: '#f5f5f4', text: '#2d2d2a', subText: '#57534e', accent: '#b45309', bgEnd: '#e7e5e4', type: 'solid' as const },
  { name: 'Cacao Reserve', bg: '#451a03', text: '#fef3c7', subText: '#fde68a', accent: '#b45309', bgEnd: '#290f01', type: 'radial' as const },
  { name: 'Bespoke Lavender', bg: '#2e1065', text: '#faf5ff', subText: '#e9d5ff', accent: '#c084fc', bgEnd: '#1e1b4b', type: 'gradient' as const },
  { name: 'Tangerine Dream', bg: '#7c2d12', text: '#ffedd5', subText: '#fed7aa', accent: '#ea580c', bgEnd: '#431407', type: 'grid' as const },
];

export default function App() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [activeTab, setActiveTab] = useState<'studio' | 'compare' | 'catalog'>('studio');

  // Dynamic font preloader ref and utility
  const loadedFontsRef = useRef<Set<string>>(new Set());

  // Preload all unique main fonts from our preset catalogs in a single batch
  useEffect(() => {
    const uniqueFontNames = new Set<string>();
    
    // Scan both catalogs for mainFontId
    [...IMAGE_PRESETS_CATALOG, ...PRESETS_CATALOG].forEach((preset) => {
      const match = FONTS_CATALOG.find((f) => f.id === preset.mainFontId);
      if (match) {
        const fontName = match.family.split(',')[0].replace(/"/g, '').trim();
        if (fontName) {
          uniqueFontNames.add(fontName);
          loadedFontsRef.current.add(fontName); // Mark as loaded so single-preload calls skip them
        }
      }
    });

    if (uniqueFontNames.size > 0) {
      const chunkedNames = Array.from(uniqueFontNames);
      // Construct a unified, speedy Google Fonts request
      const familiesQuery = chunkedNames.map(name => `family=${name.replace(/ /g, '+')}`).join('&');
      const href = `https://fonts.googleapis.com/css2?${familiesQuery}&display=swap`;
      
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    }
  }, []);

  const preloadFontFamily = (familyString: string) => {
    if (!familyString) return;
    const fontName = familyString.split(',')[0].replace(/"/g, '').trim();
    if (!fontName || loadedFontsRef.current.has(fontName)) return;

    loadedFontsRef.current.add(fontName);

    // Create and append a dynamic stylesheet link tag to head for Google Fonts
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/ /g, '+')}&display=swap`;
    document.head.appendChild(link);
  };

  // Input states
  const [presetSource, setPresetSource] = useState<'image' | 'general'>('image');
  const [mainText, setMainText] = useState('AUDIO');
  const [subtitleText, setSubtitleText] = useState('LIMITED APPAREL — EST. 2026');
  const [subtitleVisible, setSubtitleVisible] = useState(true);
  const [isTextLocked, setIsTextLocked] = useState(false);

  // Website live presentation and content state
  const [canvasViewMode, setCanvasViewMode] = useState<'poster' | 'website'>('poster');
  const [webTemplate, setWebTemplate] = useState<'saas' | 'boutique' | 'portfolio' | 'restaurant'>('saas');
  const [activeWebPage, setActiveWebPage] = useState<'home' | 'features' | 'about' | 'contact'>('home');

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactStatus, setContactStatus] = useState<'idle' | 'success'>('idle');

  const [saasHeroTitle, setSaasHeroTitle] = useState('انطلق بأفكارك التقنية إلى آفاق جديدة كلياً');
  const [saasHeroSub, setSaasHeroSub] = useState('منصة سحابية متطورة تمنح أعمالك السرعة والأمان والتكامل الذكي الذي تستحقه لمضاعفة كفاءتك الإنتاجية.');
  const [saasCtaText, setSaasCtaText] = useState('ابدأ الآن مجاناً');
  
  const [boutiqueHeroTitle, setBoutiqueHeroTitle] = useState('التناغم المطلق في قطع فنية عصرية مذهلة');
  const [boutiqueHeroSub, setBoutiqueHeroSub] = useState('مجموعتنا الصيفية الخاصة مصممة بعناية فائقة وتطريز فاخر لتلائم ذوقك الرفيع والفريد من أجود المواد الطبيعية.');
  const [boutiqueCtaText, setBoutiqueCtaText] = useState('تسوق التشكيلة الجديدة');

  const [portfolioHeroTitle, setPortfolioHeroTitle] = useState('نصنع تجارب بصرية فريدة تأسر القلوب وتلهم الأجيال');
  const [portfolioHeroSub, setPortfolioHeroSub] = useState('أستوديو إبداعي عالمي لتصميم الهويات المعمارية، تجارب الويب الغامرة، وصياغة الخطوط للمشاريع الطموحة والممتازة.');
  const [portfolioCtaText, setPortfolioCtaText] = useState('شاهد أعمالنا المكتبية');

  const [cafeHeroTitle, setCafeHeroTitle] = useState('حبوب بن نادرة ومذاق يروي حكاية الشغف');
  const [cafeHeroSub, setCafeHeroSub] = useState('مزيج استثنائي من نكهات القهوة المختصة والمحمصة بحب لترافق أولى ساعات صباحك بتجربة لا تُنسى.');
  const [cafeCtaText, setCafeCtaText] = useState('احجز طاولتك الآن');

  // Additional website customization states
  const [navLink1, setNavLink1] = useState('المنتجات');
  const [navLink2, setNavLink2] = useState('التكامل');
  const [navLink3, setNavLink3] = useState('الأسعار');
  const [navCtaText, setNavCtaText] = useState('تفعيل الخدمة');

  // SaaS extras
  const [saasHeroPill, setSaasHeroPill] = useState('تحديث: لوحة تحكم ذكية جديدة تم تفعيلها');
  const [saasSecondaryCta, setSaasSecondaryCta] = useState('ملفات الـ API للمطورين');
  const [saasPerformanceTitle, setSaasPerformanceTitle] = useState('سرعة الأداء والمراقبة المفتوحة');
  const [saasLatLabel, setSaasLatLabel] = useState('سرعة الاستجابة الهيدروليكية');
  const [saasLatVal, setSaasLatVal] = useState('0.02 ms');
  const [saasRouteLabel, setSaasRouteLabel] = useState('جاهزية خوادم الشعار الجديد');
  const [saasRouteVal, setSaasRouteVal] = useState('99.99%');

  // Boutique extras
  const [boutiquePillText, setBoutiquePillText] = useState('المجموعة الحصرية المحدودة');
  const [boutiqueSecondaryCta, setBoutiqueSecondaryCta] = useState('معاينة كتالوج الهوية');

  // Portfolio extras
  const [portfolioPillText, setPortfolioPillText] = useState('أثر إبداعي غير تقليدي');
  const [portfolioSecondaryCta, setPortfolioSecondaryCta] = useState('تواصل معنا مباشرة');
  const [portfolioCase1Tag, setPortfolioCase1Tag] = useState('مشروع 01 / الهوية البصرية');
  const [portfolioCase1Title, setPortfolioCase1Title] = useState('صياغة هوية شركة صوفيا العالمية');
  const [portfolioCase2Tag, setPortfolioCase2Tag] = useState('مشروع 02 / هندسة الفراغ');
  const [portfolioCase2Title, setPortfolioCase2Title] = useState('التصميم المعماري للمعارض الكونية');

  // Cafe extras
  const [cafePillText, setCafePillText] = useState('بنّ خاص محمص بدقة فائقة');
  const [cafeSecondaryCta, setCafeSecondaryCta] = useState('تذوق المذاق المتزن');
  const [cafeSpecialLabel, setCafeSpecialLabel] = useState('توصيات كبير الطهاة لليوم');
  const [cafeItem1Name, setCafeItem1Name] = useState('إسبريسو غيشا الكولومبي المقطر');
  const [cafeItem1Sub, setCafeItem1Sub] = useState('مستخلص من حبوب الكاتشوا ذات المذاق الزهري');
  const [cafeItem1Price, setCafeItem1Price] = useState('$12');
  const [cafeItem2Name, setCafeItem2Name] = useState('كرواسون اللوز والزعفران المقرمش');
  const [cafeItem2Sub, setCafeItem2Sub] = useState('مخبوز طازجاً على طبقات رقيقة من الزبدة');
  const [cafeItem2Price, setCafeItem2Price] = useState('$18');

  // Footer links
  const [footerTerm1, setFooterTerm1] = useState('السياسات العامة');
  const [footerTerm2, setFooterTerm2] = useState('الرخصة الإبداعية');

  // Sync localized website mockup content when language changes
  useEffect(() => {
    if (lang === 'ar') {
      setSaasHeroTitle('انطلق بأفكارك التقنية إلى آفاق جديدة كلياً');
      setSaasHeroSub('منصة سحابية متطورة تمنح أعمالك السرعة والأمان والتكامل الذكي الذي تستحقه لمضاعفة كفاءتك الإنتاجية.');
      setSaasCtaText('ابدأ الآن مجاناً');
      
      setBoutiqueHeroTitle('التناغم المطلق في قطع فنية عصرية مذهلة');
      setBoutiqueHeroSub('مجموعتنا الصيفية الخاصة مصممة بعناية فائقة وتطريز فاخر لتلائم ذوقك الرفيع والفريد من أجود المواد الطبيعية.');
      setBoutiqueCtaText('تسوق التشكيلة الجديدة');

      setPortfolioHeroTitle('نصنع تجارب بصرية فريدة تأسر القلوب وتلهم الأجيال');
      setPortfolioHeroSub('أستوديو إبداعي عالمي لتصميم الهويات المعمارية، تجارب الويب الغامرة، وصياغة الخطوط للمشاريع الطموحة والممتازة.');
      setPortfolioCtaText('شاهد أعمالنا المكتبية');

      setCafeHeroTitle('حبوب بن نادرة ومذاق يروي حكاية الشغف');
      setCafeHeroSub('مزيج استثنائي من نكهات القهوة المختصة والمحمصة بحب لترافق أولى ساعات صباحك بتجربة لا تُنسى.');
      setCafeCtaText('احجز طاولتك الآن');

      // Sync custom states
      setNavLink1('المنتجات');
      setNavLink2('التكامل');
      setNavLink3('الأسعار');
      setNavCtaText('تفعيل الخدمة');

      setSaasHeroPill('تحديث: لوحة تحكم ذكية جديدة تم تفعيلها');
      setSaasSecondaryCta('ملفات الـ API للمطورين');
      setSaasPerformanceTitle('سرعة الأداء والمراقبة المفتوحة');
      setSaasLatLabel('سرعة الاستجابة الهيدروليكية');
      setSaasLatVal('0.02 ms');
      setSaasRouteLabel('جاهزية خوادم الشعار الجديد');
      setSaasRouteVal('99.99%');

      setBoutiquePillText('المجموعة الحصرية المحدودة');
      setBoutiqueSecondaryCta('معاينة كتالوج الهوية');

      setPortfolioPillText('أثر إبداعي غير تقليدي');
      setPortfolioSecondaryCta('تواصل معنا مباشرة');
      setPortfolioCase1Tag('مشروع 01 / الهوية البصرية');
      setPortfolioCase1Title('صياغة هوية شركة صوفيا العالمية');
      setPortfolioCase2Tag('مشروع 02 / هندسة الفراغ');
      setPortfolioCase2Title('التصميم المعماري للمعارض الكونية');

      setCafePillText('بنّ خاص محمص بدقة فائقة');
      setCafeSecondaryCta('تذوق المذاق المتزن');
      setCafeSpecialLabel('توصيات كبير الطهاة لليوم');
      setCafeItem1Name('إسبريسو غيشا الكولومبي المقطر');
      setCafeItem1Sub('مستخلص من حبوب الكاتشوا ذات المذاق الزهري');
      setCafeItem1Price('$12');
      setCafeItem2Name('كرواسون اللوز والزعفران المقرمش');
      setCafeItem2Sub('مخبوز طازجاً على طبقات رقيقة من الزبدة');
      setCafeItem2Price('$18');

      setFooterTerm1('السياسات العامة');
      setFooterTerm2('الرخصة الإبداعية');
    } else {
      setSaasHeroTitle('Scale your tech concepts to new absolute heights');
      setSaasHeroSub('Experience the next generation cloud ecosystem engineered for agility, sub-millisecond execution speeds, and enterprise-grade security.');
      setSaasCtaText('Get Started Free');
      
      setBoutiqueHeroTitle('Absolute aesthetics in hand-crafted modern pieces');
      setBoutiqueHeroSub('Our bespoke capsule collection is woven meticulously from luxury organic canvases to match high-status personal profiles.');
      setBoutiqueCtaText('Explore Collection');

      setPortfolioHeroTitle('Engineering digital interfaces that inspire and endure');
      setPortfolioHeroSub('An award-winning bespoke design agency helping ambitious brands conceptualize and build elite creative software products.');
      setPortfolioCtaText('View Agency Work');

      setCafeHeroTitle('Single-origin reserves roasted for pure clarity');
      setCafeHeroSub('Sourcing rare coffee microlots and artisanal bakery assets to deliver and define the absolute benchmark of modern morning rituals.');
      setCafeCtaText('Reserve Culinary Table');

      // Sync custom states
      setNavLink1('Products');
      setNavLink2('Integrations');
      setNavLink3('Pricing');
      setNavCtaText('Request Access');

      setSaasHeroPill('Beta Update: Intelligent Dashboard active');
      setSaasSecondaryCta('Explore API Docs');
      setSaasPerformanceTitle('MONITORING SYSTEM LATENCY');
      setSaasLatLabel('Elastic Request Latency');
      setSaasLatVal('0.02 ms');
      setSaasRouteLabel('New Logo Asset Live Routing');
      setSaasRouteVal('99.99%');

      setBoutiquePillText('ESTABLISHED CAPSULE LUXURY');
      setBoutiqueSecondaryCta('View Core Collection Draft');

      setPortfolioPillText('BESPOKE DESIGN AGENCY WORK');
      setPortfolioSecondaryCta('Get in Touch Directly');
      setPortfolioCase1Tag('CASE WORK 01 / BRANDING');
      setPortfolioCase1Title('Sofia Identity Formulation System');
      setPortfolioCase2Tag('CASE WORK 02 / SPATIAL DESIGN');
      setPortfolioCase2Title('Cosmic Spatial Architecture pavilions');

      setCafePillText('ARTISANAL MICROLOT SPECIALTY RESERVE');
      setCafeSecondaryCta('Guaranteed Sourcing');
      setCafeSpecialLabel('CHEF\'S SPECIAL SELECTIONS');
      setCafeItem1Name('Single-Origin Geisha Espresso');
      setCafeItem1Sub('Naturally dried with sweet jasmine accents');
      setCafeItem1Price('$12');
      setCafeItem2Name('Artisanal Almond Croissant');
      setCafeItem2Sub('Twice-baked with key premium honey saffron');
      setCafeItem2Price('$18');

      setFooterTerm1('Core Terms');
      setFooterTerm2('Creative License');
    }
  }, [lang]);

  // Font Selection
  const [mainFontId, setMainFontId] = useState('archivo-black');
  const [subtitleFontId, setSubtitleFontId] = useState('space-mono');
  const [selectedCategory, setSelectedCategory] = useState<FontCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Independent font elements state (Requested: customizable different fonts for different texts)
  const [isMultiFontEnabled, setIsMultiFontEnabled] = useState(false);
  const [logoFontId, setLogoFontId] = useState('archivo-black');
  const [heroFontId, setHeroFontId] = useState('space-grotesk');
  const [bodyFontId, setBodyFontId] = useState('plus-jakarta-sans');
  const [buttonFontId, setButtonFontId] = useState('plus-jakarta-sans');

  // Sizing and Spacing states
  const [mainStyle, setMainStyle] = useState<TextStyle>({
    text: 'AUDIO',
    fontSize: 85,
    fontWeight: 900,
    letterSpacing: 0.1,
    lineHeight: 1,
    uppercase: true,
    italic: false,
    textShadow: 'none'
  });

  const [subtitleStyle, setSubtitleStyle] = useState<SubtitleStyle>({
    text: 'LIMITED APPAREL — EST. 2026',
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: 0.3,
    uppercase: true,
    italic: true,
    fontFamily: '"Space Mono", monospace',
    visible: true,
    opacity: 0.7
  });

  // Background and framing states
  const [bgColor, setBgColor] = useState('#09090b');
  const [bgEndColor, setBgEndColor] = useState('#18181b');
  const [bgType, setBgType] = useState<'solid' | 'gradient' | 'grid' | 'radial'>('solid');
  const [borderType, setBorderType] = useState<'none' | 'thin' | 'thick' | 'double' | 'rounded' | 'accent-line'>('accent-line');
  const [textColor, setTextColor] = useState('#f4f4f5');
  const [subtitleColor, setSubtitleColor] = useState('#d6d3d1');
  const [accentColor, setAccentColor] = useState('#fbbf24');

  // Feedback notifications
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState('');

  // Active font objects
  const f = TRANSLATIONS[lang];

  const currentFont = useMemo(() => {
    return FONTS_CATALOG.find(item => item.id === mainFontId) || FONTS_CATALOG[0];
  }, [mainFontId]);

  const currentSubFont = useMemo(() => {
    return FONTS_CATALOG.find(item => item.id === subtitleFontId) || FONTS_CATALOG[0];
  }, [subtitleFontId]);

  const currentLogoFont = useMemo(() => {
    const fId = isMultiFontEnabled ? logoFontId : mainFontId;
    return FONTS_CATALOG.find(item => item.id === fId) || currentFont;
  }, [isMultiFontEnabled, logoFontId, mainFontId, currentFont]);

  const currentHeroFont = useMemo(() => {
    const fId = isMultiFontEnabled ? heroFontId : mainFontId;
    return FONTS_CATALOG.find(item => item.id === fId) || currentFont;
  }, [isMultiFontEnabled, heroFontId, mainFontId, currentFont]);

  const currentBodyFont = useMemo(() => {
    const fId = isMultiFontEnabled ? bodyFontId : (subtitleVisible ? subtitleFontId : 'plus-jakarta-sans');
    return FONTS_CATALOG.find(item => item.id === fId) || currentSubFont;
  }, [isMultiFontEnabled, bodyFontId, subtitleFontId, subtitleVisible, currentSubFont]);

  const currentButtonFont = useMemo(() => {
    const fId = isMultiFontEnabled ? buttonFontId : mainFontId;
    return FONTS_CATALOG.find(item => item.id === fId) || currentFont;
  }, [isMultiFontEnabled, buttonFontId, mainFontId, currentFont]);

  // Load selected fonts dynamically on selection
  useEffect(() => {
    if (currentFont) preloadFontFamily(currentFont.family);
    if (currentSubFont) preloadFontFamily(currentSubFont.family);
    if (currentLogoFont) preloadFontFamily(currentLogoFont.family);
    if (currentHeroFont) preloadFontFamily(currentHeroFont.family);
    if (currentBodyFont) preloadFontFamily(currentBodyFont.family);
    if (currentButtonFont) preloadFontFamily(currentButtonFont.family);
  }, [currentFont, currentSubFont, currentLogoFont, currentHeroFont, currentBodyFont, currentButtonFont]);

  // Handle Preset trigger
  const applyPreset = (preset: LogoPreset) => {
    if (!isTextLocked) {
      setMainText(preset.mainText);
      setSubtitleText(preset.subtitleText);
    }
    setSubtitleVisible(preset.subtitleStyle.visible);
    setMainFontId(preset.mainFontId);
    setSubtitleFontId(preset.subtitleFontId);
    
    // Sync independent fonts to preserve styling matching the selected preset
    setLogoFontId(preset.mainFontId);
    setHeroFontId(preset.mainFontId);
    setBodyFontId(preset.subtitleFontId || 'plus-jakarta-sans');
    setButtonFontId(preset.mainFontId);

    setMainStyle(preset.mainStyle);
    setSubtitleStyle(preset.subtitleStyle);
    setBgColor(preset.bgColor);
    setBgEndColor(preset.bgConfig.colorEnd);
    setBgType(preset.bgConfig.type);
    setBorderType(preset.borderType);
    setTextColor(preset.textColor);
    setSubtitleColor(preset.textColor); // defaults to unify with primary label or sub color
    setAccentColor(preset.accentColor);

    triggerToast(lang === 'ar' ? `تم تطبيق ${preset.arabicPresetName} بنجاح !` : `Applied ${preset.presetName} preset!`);
  };

  // Generate random creative design
  const randomizeDesign = () => {
    // Select styling category
    const stylePaths = ['script', 'serif', 'display', 'monospace', 'sans-serif'];
    const randomMainFont = FONTS_CATALOG[Math.floor(Math.random() * FONTS_CATALOG.length)];
    const randomSubFont = FONTS_CATALOG[Math.floor(Math.random() * FONTS_CATALOG.length)];

    // Preset color palettes
    const palette = COLOR_PALETTES[Math.floor(Math.random() * COLOR_PALETTES.length)];
    
    setMainFontId(randomMainFont.id);
    setSubtitleFontId(randomSubFont.id);
    setBgColor(palette.bg);
    setBgEndColor(palette.bgEnd);
    setBgType(palette.type);
    setTextColor(palette.text);
    setSubtitleColor(palette.subText);
    setAccentColor(palette.accent);

    // Randomize dimension settings
    const randomFontSize = Math.floor(Math.random() * 50) + 50; // 50 to 100
    const randomSpacing = parseFloat((Math.random() * 0.4 - 0.05).toFixed(3)); // -0.05 to 0.35
    const randomWeight = [100, 300, 400, 500, 700, 900][Math.floor(Math.random() * 6)];
    const randomItalic = Math.random() > 0.5;
    const randomUppercase = Math.random() > 0.3;
    const randomBorder = (['none', 'thin', 'thick', 'double', 'rounded', 'accent-line'] as const)[Math.floor(Math.random() * 6)];
    const randomShadow = (['none', 'subtle', 'glow', 'retro'] as const)[Math.floor(Math.random() * 4)];

    setMainStyle(prev => ({
      ...prev,
      fontSize: randomFontSize,
      fontWeight: randomWeight,
      letterSpacing: randomSpacing,
      lineHeight: 1.1,
      italic: randomItalic,
      uppercase: randomUppercase,
      textShadow: randomShadow
    }));

    setBorderType(randomBorder);

    triggerToast(lang === 'ar' ? 'تم المزج العشوائي بنجاح!' : 'Cosmic styles blended successfully!');
  };

  const triggerToast = (text: string) => {
    setNotificationText(text);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 4000);
  };

  const applyColorPalette = (palette: typeof COLOR_PALETTES[0]) => {
    setBgColor(palette.bg);
    setBgEndColor(palette.bgEnd);
    setBgType(palette.type);
    setTextColor(palette.text);
    setSubtitleColor(palette.subText);
    setAccentColor(palette.accent);
    triggerToast(lang === 'ar' ? `تم تطبيق باليتة ${palette.name}` : `Applied ${palette.name} palette`);
  };

  // Contrast Ratio (WCAG) Calculation
  const contrastRatio = useMemo(() => {
    // Relative luminance calculation helper
    const getLuminance = (hex: string) => {
      const cleanHex = hex.replace(/^#/, '');
      if (cleanHex.length !== 6 && cleanHex.length !== 3) return 0.5;
      let r = 0, g = 0, b = 0;
      if (cleanHex.length === 6) {
        r = parseInt(cleanHex.substring(0, 2), 16) / 255;
        g = parseInt(cleanHex.substring(2, 4), 16) / 255;
        b = parseInt(cleanHex.substring(4, 6), 16) / 255;
      } else {
        r = parseInt(cleanHex[0] + cleanHex[0], 16) / 255;
        g = parseInt(cleanHex[1] + cleanHex[1], 16) / 255;
        b = parseInt(cleanHex[2] + cleanHex[2], 16) / 255;
      }
      
      const a = [r, g, b].map(v => {
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    };

    const lum1 = getLuminance(textColor);
    const lum2 = getLuminance(bgColor);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    const ratio = (brightest + 0.05) / (darkest + 0.05);
    return Math.round(ratio * 10) / 10;
  }, [textColor, bgColor]);

  // Render font filter selection
  const filteredFonts = useMemo(() => {
    return FONTS_CATALOG.filter(font => {
      const matchesCategory = selectedCategory === 'all' || font.category === selectedCategory;
      const matchesSearch = font.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            font.arabicCategory.includes(searchQuery);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // CSS and Tailwind code builders
  const generatedCode = useMemo(() => {
    const mainFontClean = currentFont.family.split(',')[0].replace(/"/g, '');
    const trackingClass = mainStyle.letterSpacing > 0.1 ? 'tracking-widest' : mainStyle.letterSpacing < -0.01 ? 'tracking-tighter' : 'tracking-normal';
    
    return {
      tailwind: `<!-- Container Code -->
<div class="flex flex-col items-center justify-center p-12 text-center rounded-xl bg-gradient-to-br from-[${bgColor}] to-[${bgEndColor}]">
  <!-- Brand Label -->
  <h1 class="font-bold text-[${textColor}] font-[${mainFontClean}] ${mainStyle.italic ? 'italic' : ''} ${mainStyle.uppercase ? 'uppercase' : ''}" 
      style="font-size: ${mainStyle.fontSize}px; font-weight: ${mainStyle.fontWeight}; letter-spacing: ${mainStyle.letterSpacing}em; line-height: ${mainStyle.lineHeight}; text-shadow: ${mainStyle.textShadow === 'glow' ? `0 0 15px ${accentColor}` : 'none'}">
    ${mainText}
  </h1>
  ${subtitleVisible ? `\n  <!-- Subtitle Tagline -->
  <p class="text-[${subtitleColor}] font-medium opacity-80" 
     style="font-family: ${currentSubFont.family}; font-size: ${subtitleStyle.fontSize}px; letter-spacing: ${subtitleStyle.letterSpacing}em">
    ${subtitleText}
  </p>` : ''}
</div>`,
      css: `/* Custom Typography Elements */
.logo-container {
  background: ${bgType === 'linear-gradient' || bgType === 'gradient' ? `linear-gradient(135deg, ${bgColor}, ${bgEndColor})` : bgColor};
  padding: 3rem;
  display: flex;
  flex-col: column;
  align-items: center;
  border-radius: 12px;
}

.logo-main-title {
  font-family: ${currentFont.family};
  font-size: ${mainStyle.fontSize}px;
  font-weight: ${mainStyle.fontWeight};
  color: ${textColor};
  letter-spacing: ${mainStyle.letterSpacing}em;
  line-height: ${mainStyle.lineHeight};
  text-transform: ${mainStyle.uppercase ? 'uppercase' : 'none'};
  font-style: ${mainStyle.italic ? 'italic' : 'normal'};
  ${mainStyle.textShadow === 'glow' ? `text-shadow: 0 0 18px ${accentColor};` : ''}
}

.logo-sub-title {
  font-family: ${currentSubFont.family};
  font-size: ${subtitleStyle.fontSize}px;
  color: ${subtitleColor};
  letter-spacing: ${subtitleStyle.letterSpacing}em;
  opacity: ${subtitleStyle.opacity};
  text-transform: ${subtitleStyle.uppercase ? 'uppercase' : 'none'};
  font-style: ${subtitleStyle.italic ? 'italic' : 'normal'};
}`
    };
  }, [currentFont, currentSubFont, mainStyle, subtitleStyle, mainText, subtitleText, subtitleVisible, bgColor, bgEndColor, textColor, subtitleColor, bgType, accentColor]);

  // Copy CSS Action
  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    triggerToast(lang === 'ar' ? 'تم نسخ الـ Code للمقطع البرمجي بنجاح!' : 'Code snippet copied to clipboard!');
  };

  // Clean trigger to export vector SVG
  const triggerSvgDownload = () => {
    const mainFontClean = currentFont.family.split(',')[0].replace(/"/g, '');
    const subFontClean = currentSubFont.family.split(',')[0].replace(/"/g, '');
    
    // Create external dynamic import styles so font renders standalone on target device
    const fontURL = `https://fonts.googleapis.com/css2?family=${mainFontClean.replace(/ /g, '+')}:wght@${mainStyle.fontWeight}&family=${subFontClean.replace(/ /g, '+')}:wght@${subtitleStyle.fontWeight}&display=swap`;
    
    // Build border geometry SVG wraps if requested
    let borderSvg = '';
    const w = 800;
    const h = 450;
    const padding = 40;

    if (borderType === 'thin') {
      borderSvg = `<rect x="${padding}" y="${padding}" width="${w - padding * 2}" height="${h - padding * 2}" fill="none" stroke="${accentColor}" stroke-width="2" rx="8" />`;
    } else if (borderType === 'thick') {
      borderSvg = `<rect x="${padding}" y="${padding}" width="${w - padding * 2}" height="${h - padding * 2}" fill="none" stroke="${accentColor}" stroke-width="8" rx="4" />`;
    } else if (borderType === 'double') {
      borderSvg = `
        <rect x="${padding}" y="${padding}" width="${w - padding * 2}" height="${h - padding * 2}" fill="none" stroke="${accentColor}" stroke-width="2" rx="6" />
        <rect x="${padding + 6}" y="${padding + 6}" width="${w - (padding + 6) * 2}" height="${h - (padding + 6) * 2}" fill="none" stroke="${accentColor}" stroke-width="1" rx="4" opacity="0.7" />
      `;
    } else if (borderType === 'rounded') {
      borderSvg = `<rect x="${w / 2 - 320}" y="${h / 2 - 120}" width="640" height="240" fill="none" stroke="${accentColor}" stroke-width="3" rx="120" />`;
    } else if (borderType === 'accent-line') {
      borderSvg = `<line x1="${w / 2 - 100}" y1="${h / 2 + 55}" x2="${w / 2 + 100}" y2="${h / 2 + 55}" stroke="${accentColor}" stroke-width="4" stroke-linecap="round" />`;
    }

    let bgMarkup = `<rect width="${w}" height="${h}" fill="${bgColor}" />`;
    if (bgType === 'gradient' || bgType === 'radial') {
      bgMarkup = `
        <defs>
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${bgColor}" />
            <stop offset="100%" stop-color="${bgEndColor}" />
          </linearGradient>
        </defs>
        <rect width="${w}" height="${h}" fill="url(#bgGrad)" />
      `;
    } else if (bgType === 'grid') {
      bgMarkup = `
        <defs>
          <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="${accentColor}" stroke-width="1" opacity="0.1" />
          </pattern>
        </defs>
        <rect width="${w}" height="${h}" fill="${bgColor}" />
        <rect width="${w}" height="${h}" fill="url(#gridPattern)" />
      `;
    }

    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <style>
    @import url("${fontURL}");
    .main-text-title {
      font-family: "${mainFontClean}", sans-serif;
      font-size: ${mainStyle.fontSize}px;
      font-weight: ${mainStyle.fontWeight};
      fill: ${textColor};
      text-anchor: middle;
      dominant-baseline: middle;
      letter-spacing: ${mainStyle.letterSpacing}em;
      ${mainStyle.italic ? 'font-style: italic;' : ''}
      ${mainStyle.uppercase ? 'text-transform: uppercase;' : ''}
      ${mainStyle.textShadow === 'glow' ? `filter: drop-shadow(0px 0px 10px ${accentColor});` : ''}
    }
    .secondary-tagline {
      font-family: "${subFontClean}", monospace;
      font-size: ${subtitleStyle.fontSize}px;
      font-weight: ${subtitleStyle.fontWeight};
      fill: ${subtitleColor};
      opacity: ${subtitleStyle.opacity};
      text-anchor: middle;
      dominant-baseline: middle;
      letter-spacing: ${subtitleStyle.letterSpacing}em;
      ${subtitleStyle.italic ? 'font-style: italic;' : ''}
      ${subtitleStyle.uppercase ? 'text-transform: uppercase;' : ''}
    }
  </style>
  ${bgMarkup}
  ${borderSvg}
  <text x="${w / 2}" y="${subtitleVisible ? h / 2 - 10 : h / 2}" class="main-text-title">${mainText}</text>
  ${subtitleVisible ? `<text x="${w / 2}" y="${h / 2 + 75}" class="secondary-tagline">${subtitleText}</text>` : ''}
</svg>`;

    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${mainText.toLowerCase().replace(/[^a-z0-9]/g, '_')}_logo.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    triggerToast(f.exportSuccess);
  };

  // Restore baseline
  const resetToFactoryDef = () => {
    applyPreset(PRESETS_CATALOG[0]);
    triggerToast(lang === 'ar' ? 'تمت إعادة ضبط الاستوديو بنجاح.' : 'Studio parameters restored successfully.');
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Dynamic Toast System */}
      <AnimatePresence>
        {showNotification && (
          <motion.div 
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-xl border border-stone-800 shadow-2xl backdrop-blur-xl ${
              lang === 'ar' ? 'flex-row-reverse' : 'flex-row'
            } bg-stone-900/95`}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <p className="text-sm font-medium font-sans text-stone-200">{notificationText}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern High-End Top Header */}
      <header className="border-b border-stone-900 bg-stone-950/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-amber-600 to-amber-400 rounded-xl text-stone-950 shadow-lg shadow-amber-500/10">
              <Sparkles className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black font-sans tracking-tight text-white">{f.appTitle}</h1>
                <span className="text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20 uppercase tracking-widest">
                  v2.0 PRO
                </span>
              </div>
              <p className="text-[11px] text-stone-400 line-clamp-1 mt-0.5">{f.appSubtitle}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Quick Actions (Random & Reset) */}
            <button
              onClick={randomizeDesign}
              className="px-4 py-2 bg-gradient-to-tr from-amber-500 to-amber-300 hover:from-amber-600 hover:to-amber-400 text-stone-950 text-xs font-black rounded-lg transition-all duration-300 shadow-lg shadow-amber-500/10 flex items-center gap-1.5 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
              {f.randomBtn}
            </button>

            <button
              onClick={resetToFactoryDef}
              className="px-3.5 py-2 bg-stone-900 border border-stone-800 hover:bg-stone-850 text-stone-300 hover:text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {f.resetBtn}
            </button>

            {/* Language Toggle with unique Arabic layout feedback */}
            <button
              onClick={() => {
                setLang(l => l === 'ar' ? 'en' : 'ar');
                triggerToast(lang === 'ar' ? 'Switched to English interface!' : 'تم تفعيل واجهة الاستخدام العربية!');
              }}
              className="p-2 bg-stone-900 hover:bg-stone-800 border border-stone-805 rounded-lg text-stone-300 hover:text-amber-400 transition-colors flex items-center gap-1.5 text-xs font-mono font-bold cursor-pointer"
              title="تغيير اللغة | Switch Language"
            >
              <Languages className="w-4 h-4 text-amber-500" />
              <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
            </button>
          </div>
        </div>

        {/* Global Hub Tab Manager */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex border-t border-stone-900/60 overflow-x-auto whitespace-nowrap scrollbar-none gap-8">
            <button
              onClick={() => setActiveTab('studio')}
              className={`py-3.5 px-2 text-xs font-black tracking-wider uppercase transition-all duration-200 border-b-2 flex items-center gap-2 cursor-pointer ${
                activeTab === 'studio' 
                  ? 'border-amber-500 text-white font-bold' 
                  : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              <Sliders className="w-4 h-4 text-amber-500" />
              {f.navStudio}
            </button>

            <button
              onClick={() => setActiveTab('compare')}
              className={`py-3.5 px-2 text-xs font-black tracking-wider uppercase transition-all duration-200 border-b-2 flex items-center gap-2 cursor-pointer ${
                activeTab === 'compare' 
                  ? 'border-amber-500 text-white font-bold' 
                  : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              <Grid className="w-4 h-4 text-amber-500" />
              {f.compareTitle}
            </button>

            <button
              onClick={() => setActiveTab('catalog')}
              className={`py-3.5 px-2 text-xs font-black tracking-wider uppercase transition-all duration-200 border-b-2 flex items-center gap-2 cursor-pointer ${
                activeTab === 'catalog' 
                  ? 'border-amber-500 text-white font-bold' 
                  : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              <FileText className="w-4 h-4 text-amber-500" />
              {f.navAllFonts}
            </button>
          </div>
        </div>
      </header>

      {/* Primary Application Workspace */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-9">
        <AnimatePresence mode="wait">
          {activeTab === 'studio' && (
            <motion.div
              key="studio-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              
              {/* Left Column: Interactive Parametric Drawer */}
              <div className="lg:col-span-5 flex flex-col gap-6">

                {/* Picture-Inspired Layout Presets Card */}
                <div className="bg-stone-900 border border-stone-850 rounded-2xl p-5 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-black text-amber-400 tracking-wider flex items-center gap-2">
                      <Palette className="w-4 h-4" />
                      {f.presetsLabel}
                    </h3>
                    <span className="text-[10px] bg-stone-850 px-2 py-0.5 rounded text-stone-300 font-bold">
                      {presetSource === 'image' ? IMAGE_PRESETS_CATALOG.length : PRESETS_CATALOG.length} {lang === 'ar' ? 'أنماط' : 'presets'}
                    </span>
                  </div>

                  {/* Toggle Segmented Buttons */}
                  <div className="grid grid-cols-2 gap-1.5 p-1 bg-stone-950 rounded-xl mb-3 border border-stone-850">
                    <button
                      onClick={() => setPresetSource('image')}
                      className={`py-2 px-1 text-[10.5px] font-black tracking-wide rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        presetSource === 'image'
                          ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                          : 'text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      {f.presetsToggleImage || 'شعارات الصورة (٣٢)'}
                    </button>
                    <button
                      onClick={() => setPresetSource('general')}
                      className={`py-2 px-1 text-[10.5px] font-black tracking-wide rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        presetSource === 'general'
                          ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                          : 'text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      <Palette className="w-3.5 h-3.5" />
                      {f.presetsToggleGeneral || 'أنماط مدمجة أخرى'}
                    </button>
                  </div>

                  <p className="text-[11px] text-stone-400 mb-4 leading-relaxed">
                    {presetSource === 'image' 
                      ? (lang === 'ar' 
                          ? 'شعارات وتصاميم تم استخلاصها ومحاكاة خطوطها وألوانها وتنسيقها بدقة متناهية من أقسام ومحاور الصورة المرفقة لتصميم هويتك فورا بنقرة زر.' 
                          : 'Designs matched and simulated from your uploaded reference image with highly precise typography and matching contrasts.')
                      : f.presetsSub}
                  </p>

                  <div className="grid grid-cols-2 gap-3.5 max-h-[460px] overflow-y-auto pr-1 scrollbar-thin">
                    {(presetSource === 'image' ? IMAGE_PRESETS_CATALOG : PRESETS_CATALOG).map((p) => {
                      const isSelected = mainFontId === p.mainFontId && bgColor === p.bgColor && accentColor === p.accentColor;
                      const fontObj = FONTS_CATALOG.find(f => f.id === p.mainFontId) || FONTS_CATALOG[0];
                      
                      // Style the background preview card
                      let bgStyle: CSSProperties = {};
                      if (p.bgConfig) {
                        if (p.bgConfig.type === 'solid') {
                          bgStyle = { backgroundColor: p.bgConfig.colorStart || p.bgColor };
                        } else if (p.bgConfig.type === 'gradient' || p.bgConfig.type === 'radial') {
                          bgStyle = { 
                            background: `linear-gradient(${p.bgConfig.angle || 135}deg, ${p.bgConfig.colorStart}, ${p.bgConfig.colorEnd || '#000050'})`
                          };
                        } else {
                          bgStyle = { backgroundColor: p.bgColor };
                        }
                      } else {
                        bgStyle = { backgroundColor: p.bgColor };
                      }

                      return (
                        <div
                          key={p.id}
                          className={`rounded-xl border text-center font-sans overflow-hidden transition-all flex flex-col justify-between ${
                            isSelected 
                              ? 'border-amber-400 bg-stone-900 shadow-xl shadow-amber-500/10 scale-[1.01]' 
                              : 'border-stone-800 bg-stone-950/40 hover:bg-stone-950 hover:border-stone-700'
                          }`}
                        >
                          {/* Mini Layout Canvas of the Font Design itself */}
                          <div 
                            style={bgStyle}
                            className="h-[105px] w-full flex flex-col items-center justify-center p-3 relative select-none border-b border-stone-850/60 overflow-hidden"
                          >
                            {/* Visual outlines or lines matching the style layout */}
                            {p.borderType === 'accent-line' && (
                              <div className="absolute inset-x-3 h-[1px] top-2.5 opacity-60" style={{ backgroundColor: p.accentColor }} />
                            )}
                            {p.borderType === 'thick' && (
                              <div className="absolute inset-1.5 border" style={{ borderColor: p.textColor }} />
                            )}
                            {p.borderType === 'thin' && (
                              <div className="absolute inset-1.5 border border-dashed" style={{ borderColor: p.textColor + '25' }} />
                            )}

                            {/* Main Styled Font Showcase */}
                            <span 
                              style={{ 
                                fontFamily: fontObj.family,
                                color: p.textColor,
                              }}
                              className="text-xl md:text-2xl font-bold tracking-tight block max-w-full truncate px-1 text-center"
                            >
                              {p.mainText}
                            </span>

                            {/* Subtitle if active and visible */}
                            {p.subtitleStyle?.visible && (
                              <span 
                                style={{ 
                                  color: p.accentColor || '#c5a88a',
                                  fontFamily: p.subtitleStyle.fontFamily || 'monospace',
                                  opacity: p.subtitleStyle.opacity || 0.8
                                }}
                                className="text-[7.5px] uppercase font-bold mt-1 tracking-widest line-clamp-1 max-w-full text-center"
                              >
                                {p.subtitleText}
                              </span>
                            )}
                          </div>

                          {/* Interactive Unified CTA Button */}
                          <button
                            onClick={() => applyPreset(p)}
                            className={`w-full py-2.5 px-3 text-[11px] font-black tracking-wide transition-all flex items-center justify-center gap-1 cursor-pointer ${
                              isSelected
                                ? 'bg-amber-500 text-stone-950 font-black'
                                : 'bg-stone-900 text-stone-300 hover:bg-stone-850 hover:text-white'
                            }`}
                          >
                            <Sparkles className="w-3 h-3 shrink-0" />
                            <span>
                              {lang === 'ar' ? 'تصميم الهوية بهذا' : 'Design Identity with This'}
                            </span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Section A: Text & Inputs */}
                <div className="bg-stone-900 border border-stone-850 rounded-2xl p-5 shadow-xl flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-stone-800 pb-3 flex-wrap gap-2">
                    <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                      <span className="w-1.5 h-3 bg-amber-500 rounded-sm" />
                      {f.textSection}
                    </h3>
                    
                    {/* Compact Interactive Lock Toggle */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsTextLocked(!isTextLocked);
                        triggerToast(
                          !isTextLocked 
                            ? (lang === 'ar' ? '🔒 تم قفل ثبات النصوص! تعديل الشكل فقط متاح.' : '🔒 Text inputs locked!')
                            : (lang === 'ar' ? '🔓 تم إلغاء القفل، تعديل النصوص متاح.' : '🔓 Text inputs unlocked!')
                        );
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 bg-stone-950 border transition-all cursor-pointer select-none active:scale-95 ${
                        isTextLocked 
                          ? 'text-rose-400 border-rose-500/30' 
                          : 'text-stone-400 border-stone-800 hover:text-stone-300'
                      }`}
                    >
                      {isTextLocked ? (
                        <>
                          <Lock className="w-3 h-3 text-rose-500" />
                          <span>{lang === 'ar' ? 'النصوص مغلقة' : 'Texts Locked'}</span>
                        </>
                      ) : (
                        <>
                          <Unlock className="w-3 h-3 text-stone-500" />
                          <span>{lang === 'ar' ? 'النصوص مفتوحة' : 'Texts Unlocked'}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Context-aware lock explanation message */}
                  <div className={`p-2.5 rounded-xl border text-[9.5px] leading-relaxed transition-all duration-300 ${
                    isTextLocked 
                      ? 'bg-rose-500/5 border-rose-500/10 text-rose-300/80' 
                      : 'bg-stone-950/40 border-stone-850 text-stone-500'
                  }`}>
                    {isTextLocked 
                      ? (lang === 'ar' 
                        ? '🔒 تم قفل محتوى العبارات والأسماء لمنع تعديلها! جرب تصفح وتوليد الأنماط والألوان والخطوط بحرية مع الحفاظ على نصوصك ثابتة.' 
                        : '🔒 Text content is locked! Browse presets, change fonts, and mix colors freely while keeping your custom words completely secure.')
                      : (lang === 'ar' 
                        ? '💡 اضغط على الزر لتثبيت وتجميد الكلمات، مما يتيح لك تعديل الأشكال الجمالية والخطوط والمقاسات دون تغيير عباراتك الحالية.'
                        : '💡 Toggle lock to freeze current words, letting you modify designs, sizes, fonts, or colors without overwriting your specific brand wording.')}
                  </div>

                  {/* Main text input field */}
                  <div className="flex flex-col gap-1.5 grayscale-0">
                    <label className="text-xs font-semibold text-stone-300 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        {f.mainTextInput}
                        {isTextLocked && <Lock className="w-2.5 h-2.5 text-rose-500" />}
                      </span>
                      <span className="text-[10.5px] font-mono text-stone-500">{mainText.length}/25</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        maxLength={25}
                        value={mainText}
                        disabled={isTextLocked}
                        onChange={(e) => setMainText(e.target.value)}
                        placeholder={f.customTextPH}
                        className={`w-full text-white rounded-xl border p-3.5 text-sm font-sans focus:outline-none transition-all font-semibold ${
                          isTextLocked 
                            ? 'bg-stone-950/20 text-stone-500 border-stone-850/60 cursor-not-allowed opacity-60' 
                            : 'bg-stone-950 border-stone-800 focus:ring-1 focus:ring-amber-500 hover:border-stone-700'
                        }`}
                      />
                      {isTextLocked && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 select-none pointer-events-none bg-stone-900 border border-stone-800 px-2 py-0.5 rounded text-[8px] text-rose-400 font-bold uppercase tracking-widest">
                          {lang === 'ar' ? 'مغلق' : 'LOCKED'}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Subtitle text input field */}
                  <div className="flex flex-col gap-2 pt-1">
                    <div className="flex items-center justify-between">
                      <CustomCheckbox
                        checked={subtitleVisible}
                        onChange={setSubtitleVisible}
                        label={f.showSubLabel}
                        lang={lang}
                      />
                    </div>

                    {subtitleVisible && (
                      <div className="relative">
                        <input
                          type="text"
                          maxLength={50}
                          value={subtitleText}
                          disabled={isTextLocked}
                          onChange={(e) => setSubtitleText(e.target.value)}
                          placeholder={f.taglinePH}
                          className={`w-full text-white rounded-xl border p-3.5 text-sm font-semibold focus:outline-none transition-all ${
                            isTextLocked 
                              ? 'bg-stone-950/20 text-stone-500 border-stone-850/60 cursor-not-allowed opacity-60' 
                              : 'bg-stone-950 border-stone-800 focus:ring-1 focus:ring-amber-500 focus:border-amber-500'
                          }`}
                        />
                        {isTextLocked && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 select-none pointer-events-none bg-stone-900 border border-stone-800 px-2 py-0.5 rounded text-[8px] text-rose-400 font-bold uppercase tracking-widest">
                            {lang === 'ar' ? 'مغلق' : 'LOCKED'}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Section B: Typography Selector */}
                <div className="bg-stone-900 border border-stone-850 rounded-2xl p-5 shadow-xl flex flex-col gap-4">
                  <h3 className="text-xs font-black text-white uppercase tracking-widest border-b border-stone-800 pb-3 flex items-center gap-2">
                    <span className="w-1.5 h-3 bg-amber-500 rounded-sm" />
                    {f.fontFamilyLabel}
                  </h3>

                  {/* Taxonomy Filter list */}
                  <div className="flex flex-wrap gap-1.5">
                    {(['all', 'serif', 'sans-serif', 'script', 'display', 'monospace'] as const).map((cat) => {
                      const label = {
                        all: lang === 'ar' ? 'الكل' : 'All',
                        serif: lang === 'ar' ? 'كلاسيك (Serif)' : 'Serif',
                        'sans-serif': lang === 'ar' ? 'مودرن (Sans)' : 'Sans',
                        script: lang === 'ar' ? 'يدوي (Script)' : 'Script',
                        display: lang === 'ar' ? 'عريض (Display)' : 'Display',
                        monospace: lang === 'ar' ? 'مونو (Mono)' : 'Mono'
                      }[cat];
                      return (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                            selectedCategory === cat 
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' 
                              : 'bg-stone-950 text-stone-400 hover:text-white border border-transparent'
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Quick Dynamic Font Picker with Scroll area */}
                  <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto pr-1 border border-stone-800 rounded-xl bg-stone-950 p-2">
                    {filteredFonts.map((font) => {
                      const isSelected = mainFontId === font.id;
                      return (
                        <button
                          key={font.id}
                          onClick={() => setMainFontId(font.id)}
                          onMouseEnter={() => preloadFontFamily(font.family)}
                          className={`w-full p-2.5 rounded-lg text-right transition-all flex items-center justify-between cursor-pointer ${
                            isSelected 
                              ? 'bg-stone-900 text-white border border-stone-800' 
                              : 'hover:bg-stone-900/40 text-stone-300'
                          }`}
                        >
                          <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                            <p className="text-xs font-mono font-semibold" style={{ fontFamily: font.family }}>
                              {font.name}
                            </p>
                            <span className="text-[9.5px] text-stone-500 block">
                              {lang === 'ar' ? font.arabicCategory : font.category}
                            </span>
                          </div>

                          {/* Tiny visual sample in the font itself for lightning quick judgment */}
                          <span 
                            className="text-lg font-bold p-1 max-w-[100px] hover:scale-105 transition-transform" 
                            style={{ fontFamily: font.family, color: isSelected ? '#f59e0b' : '#a8a29e' }}
                          >
                            Abc
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Subtitle Font Selection if subtitle is visible */}
                  {subtitleVisible && (
                    <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-stone-850">
                      <label className="text-xs font-black text-stone-300">{f.subFontFamilyLabel}</label>
                      <CustomSelect
                        value={subtitleFontId}
                        onChange={(val) => {
                          setSubtitleFontId(val);
                          setSubtitleStyle(prev => ({
                            ...prev,
                            fontFamily: FONTS_CATALOG.find(cur => cur.id === val)?.family || 'sans-serif'
                          }));
                        }}
                        onHoverOption={(val) => preloadFontFamily(FONTS_CATALOG.find(f => f.id === val)?.family || '')}
                        options={FONTS_CATALOG.filter(font => font.id !== mainFontId).map(font => ({
                          value: font.id,
                          label: font.name,
                          subLabel: lang === 'ar' ? font.arabicCategory : font.category,
                          fontFamily: font.family
                        }))}
                        lang={lang}
                      />
                    </div>
                  )}

                  {/* Independent Multi-font toggle option */}
                  <div className="flex flex-col gap-2 mt-4 pt-3 border-t border-stone-850">
                    <CustomCheckbox
                      checked={isMultiFontEnabled}
                      onChange={setIsMultiFontEnabled}
                      label={f.multiFontToggleLabel}
                      lang={lang}
                    />
                    <p className="text-[10px] text-stone-500 leading-normal">
                      {f.multiFontExplain}
                    </p>

                    {isMultiFontEnabled && (
                      <div className="flex flex-col gap-3 mt-3 p-3 rounded-xl bg-stone-950/80 border border-stone-850/60 relative">
                        {/* Logo / Brand Name Font Selector */}
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-bold text-stone-400">
                            {f.logoFontSelectorLabel}
                          </label>
                          <CustomSelect
                            value={logoFontId}
                            onChange={(val) => {
                              setLogoFontId(val);
                            }}
                            onHoverOption={(val) => preloadFontFamily(FONTS_CATALOG.find(f => f.id === val)?.family || '')}
                            options={FONTS_CATALOG.map(font => ({
                              value: font.id,
                              label: font.name,
                              subLabel: lang === 'ar' ? font.arabicCategory : font.category,
                              fontFamily: font.family
                            }))}
                            lang={lang}
                          />
                        </div>

                        {/* Hero Title Heading Font Selector */}
                        <div className="flex flex-col gap-1 mt-2">
                          <label className="text-[10px] font-bold text-stone-400">
                            {f.heroFontSelectorLabel}
                          </label>
                          <CustomSelect
                            value={heroFontId}
                            onChange={(val) => {
                              setHeroFontId(val);
                            }}
                            onHoverOption={(val) => preloadFontFamily(FONTS_CATALOG.find(f => f.id === val)?.family || '')}
                            options={FONTS_CATALOG.map(font => ({
                              value: font.id,
                              label: font.name,
                              subLabel: lang === 'ar' ? font.arabicCategory : font.category,
                              fontFamily: font.family
                            }))}
                            lang={lang}
                          />
                        </div>

                        {/* Body / Description Text Font Selector */}
                        <div className="flex flex-col gap-1 mt-2">
                          <label className="text-[10px] font-bold text-stone-400">
                            {f.bodyFontSelectorLabel}
                          </label>
                          <CustomSelect
                            value={bodyFontId}
                            onChange={(val) => {
                              setBodyFontId(val);
                            }}
                            onHoverOption={(val) => preloadFontFamily(FONTS_CATALOG.find(f => f.id === val)?.family || '')}
                            options={FONTS_CATALOG.map(font => ({
                              value: font.id,
                              label: font.name,
                              subLabel: lang === 'ar' ? font.arabicCategory : font.category,
                              fontFamily: font.family
                            }))}
                            lang={lang}
                          />
                        </div>

                        {/* Buttons / CTA Font Selector */}
                        <div className="flex flex-col gap-1 mt-2">
                          <label className="text-[10px] font-bold text-stone-400">
                            {f.buttonFontSelectorLabel}
                          </label>
                          <CustomSelect
                            value={buttonFontId}
                            onChange={(val) => {
                              setButtonFontId(val);
                            }}
                            onHoverOption={(val) => preloadFontFamily(FONTS_CATALOG.find(f => f.id === val)?.family || '')}
                            options={FONTS_CATALOG.map(font => ({
                              value: font.id,
                              label: font.name,
                              subLabel: lang === 'ar' ? font.arabicCategory : font.category,
                              fontFamily: font.family
                            }))}
                            lang={lang}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Section C: Sliders for Dimensional control */}
                <div className="bg-stone-900 border border-stone-850 rounded-2xl p-5 shadow-xl flex flex-col gap-4">
                  <h3 className="text-xs font-black text-white uppercase tracking-widest border-b border-stone-800 pb-3 flex items-center gap-2">
                    <span className="w-1.5 h-3 bg-amber-500 rounded-sm" />
                    {f.stylingControl}
                  </h3>

                  {/* Font Size slider */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs text-stone-300">
                      <span>{f.sizeLabel}</span>
                      <span className="font-mono font-bold text-amber-400">{mainStyle.fontSize}px</span>
                    </div>
                    <input
                      type="range"
                      min={24}
                      max={140}
                      step={1}
                      value={mainStyle.fontSize}
                      onChange={(e) => setMainStyle(prev => ({ ...prev, fontSize: parseInt(e.target.value) }))}
                      className="w-full accent-amber-500"
                    />
                  </div>

                  {/* Letter Spacing with safe em boundaries */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs text-stone-300">
                      <span>{f.spacingLabel}</span>
                      <span className="font-mono font-bold text-amber-400">{mainStyle.letterSpacing}em</span>
                    </div>
                    <input
                      type="range"
                      min={-0.08}
                      max={0.6}
                      step={0.01}
                      value={mainStyle.letterSpacing}
                      onChange={(e) => setMainStyle(prev => ({ ...prev, letterSpacing: parseFloat(e.target.value) }))}
                      className="w-full accent-amber-500"
                    />
                  </div>

                  {/* Font Weight */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs text-stone-300">
                      <span>{f.weightLabel}</span>
                      <span className="font-mono font-bold text-amber-400">{mainStyle.fontWeight}</span>
                    </div>
                    <input
                      type="range"
                      min={100}
                      max={900}
                      step={100}
                      value={mainStyle.fontWeight}
                      onChange={(e) => setMainStyle(prev => ({ ...prev, fontWeight: parseInt(e.target.value) }))}
                      className="w-full accent-amber-500"
                    />
                  </div>

                  {/* Subtitle font size if visible */}
                  {subtitleVisible && (
                    <div className="flex flex-col gap-2 pt-2 border-t border-stone-850">
                      <div className="flex items-center justify-between text-xs text-stone-300">
                        <span>{lang === 'ar' ? 'مقاس النص المساعد' : 'Tagline Size'}</span>
                        <span className="font-mono font-bold text-amber-400">{subtitleStyle.fontSize}px</span>
                      </div>
                      <input
                        type="range"
                        min={9}
                        max={32}
                        step={1}
                        value={subtitleStyle.fontSize}
                        onChange={(e) => setSubtitleStyle(prev => ({ ...prev, fontSize: parseInt(e.target.value) }))}
                        className="w-full accent-amber-500"
                      />
                    </div>
                  )}

                  {/* Switches */}
                  <div className="flex gap-4 pt-2 justify-between">
                    <button
                      onClick={() => setMainStyle(prev => ({ ...prev, italic: !prev.italic }))}
                      className={`flex-1 py-2 px-3 rounded-xl border text-xs font-black text-center transition-all cursor-pointer ${
                        mainStyle.italic 
                          ? 'border-amber-500/40 bg-amber-500/10 text-amber-400 font-bold' 
                          : 'border-stone-800 bg-stone-950 text-stone-400 hover:text-white'
                      }`}
                    >
                      {f.italicLabel}
                    </button>

                    <button
                      onClick={() => setMainStyle(prev => ({ ...prev, uppercase: !prev.uppercase }))}
                      className={`flex-1 py-2 px-3 rounded-xl border text-xs font-black text-center transition-all cursor-pointer ${
                        mainStyle.uppercase 
                          ? 'border-amber-500/40 bg-amber-500/10 text-amber-400 font-bold' 
                          : 'border-stone-800 bg-stone-950 text-stone-400 hover:text-white'
                      }`}
                    >
                      {f.uppercaseLabel}
                    </button>
                  </div>
                </div>

                {/* Section D: Colors and Canvas Customizer */}
                <div className="bg-stone-900 border border-stone-850 rounded-2xl p-5 shadow-xl flex flex-col gap-4">
                  <h3 className="text-xs font-black text-white uppercase tracking-widest border-b border-stone-800 pb-3 flex items-center gap-2">
                    <span className="w-1.5 h-3 bg-amber-500 rounded-sm" />
                    {f.colorsAndThemes}
                  </h3>

                  {/* Palette Presets area */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[11px] font-black text-stone-400 uppercase tracking-widest block mb-1">
                      {f.presetPalette}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {COLOR_PALETTES.map((palette) => {
                        return (
                          <button
                            key={palette.name}
                            onClick={() => applyColorPalette(palette)}
                            className="bg-stone-950 hover:bg-stone-850 border border-stone-800/80 rounded-xl p-1.5 flex items-center gap-1.5 text-[10.5px] text-stone-200 transition-all cursor-pointer hover:border-stone-700"
                          >
                            {/* Color circles */}
                            <span className="flex">
                              <span className="w-2.5 h-2.5 rounded-full inline-block border border-black/30" style={{ backgroundColor: palette.text }} />
                              <span className="w-2.5 h-2.5 rounded-full inline-block border border-black/30 -ml-1" style={{ backgroundColor: palette.accent }} />
                              <span className="w-2.5 h-2.5 rounded-full inline-block border border-black/30 -ml-1" style={{ backgroundColor: palette.bg }} />
                            </span>
                            <span className="font-sans font-bold">{palette.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Custom color Pickers */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <ColorWheelPicker
                      value={textColor}
                      onChange={setTextColor}
                      label={f.textColorLabel}
                      lang={lang}
                    />

                    <ColorWheelPicker
                      value={subtitleColor}
                      onChange={setSubtitleColor}
                      label={f.subColorLabel}
                      lang={lang}
                    />

                    <ColorWheelPicker
                      value={bgColor}
                      onChange={setBgColor}
                      label={f.bgColorLabel}
                      lang={lang}
                    />

                    <ColorWheelPicker
                      value={accentColor}
                      onChange={setAccentColor}
                      label={lang === 'ar' ? 'اللون التدرجي للتصميم' : 'Color Accent Gradient'}
                      lang={lang}
                    />
                  </div>

                  {/* Background Type selector */}
                  <div className="flex flex-col gap-1.5 pt-2">
                    <label className="text-[11px] font-black text-stone-400 uppercase">{f.bgTypeLabel}</label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {(['solid', 'gradient', 'grid', 'radial'] as const).map((type) => {
                        const labels = {
                          solid: f.solidBg,
                          gradient: f.gradientBg,
                          grid: f.gridBg,
                          radial: f.radialBg
                        }[type];
                        return (
                          <button
                            key={type}
                            onClick={() => {
                              setBgType(type);
                              if (type === 'gradient' || type === 'radial') {
                                // Default end color if flat black
                                if (bgEndColor === '#18181b') setBgEndColor('#1c1917');
                              }
                            }}
                            className={`p-1.5 rounded-lg text-[10px] font-black font-sans text-center transition-all cursor-pointer ${
                              bgType === type 
                                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' 
                                : 'bg-stone-950 text-stone-400 border border-transparent'
                            }`}
                          >
                            {labels}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Linear/Radial auxiliary end color */}
                  {(bgType === 'gradient' || bgType === 'radial') && (
                    <div className="flex flex-col gap-1.5 bg-stone-900 p-3 rounded-2xl border border-stone-850 animate-fade-in">
                      <ColorWheelPicker
                        value={bgEndColor}
                        onChange={setBgEndColor}
                        label={f.bgEndColorLabel}
                        lang={lang}
                      />
                    </div>
                  )}

                  {/* Border and Framer Shape Selection */}
                  <div className="flex flex-col gap-1.5 pt-2">
                    <label className="text-[11px] font-black text-stone-400 uppercase">{f.borderTypeLabel}</label>
                    <CustomSelect
                      value={borderType}
                      onChange={(val) => setBorderType(val as any)}
                      options={[
                        { value: 'none', label: f.borderNone },
                        { value: 'thin', label: f.borderThin },
                        { value: 'thick', label: f.borderThick },
                        { value: 'double', label: f.borderDouble },
                        { value: 'rounded', label: f.borderRounded },
                        { value: 'accent-line', label: f.borderAccentLine }
                      ]}
                      lang={lang}
                    />
                  </div>

                  {/* Text Effects (Shadow Preset) */}
                  <div className="flex flex-col gap-1.5 pt-2">
                    <label className="text-[11px] font-black text-stone-400 uppercase">{f.effectLabel}</label>
                    <CustomSelect
                      value={mainStyle.textShadow}
                      onChange={(val) => setMainStyle(prev => ({ ...prev, textShadow: val }))}
                      options={[
                        { value: 'none', label: f.shadowNone },
                        { value: 'glow', label: f.shadowGlow },
                        { value: 'subtle', label: f.shadowSubtle },
                        { value: 'retro', label: f.shadowRetro }
                      ]}
                      lang={lang}
                    />
                  </div>
                </div>

              </div>
              
              {/* Right Column: Premium Presentation Theatre Canvas */}
              <div className="lg:col-span-7 flex flex-col gap-6 sticky top-24">
                
                {/* Visual Canvas Panel */}
                <div className="bg-stone-900 border border-stone-850 rounded-2xl overflow-hidden shadow-2xl">
                  {/* Canvas Header info with WCAG checker */}
                  <div className="p-4 bg-stone-900/90 border-b border-stone-850 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Eye className="w-4 h-4 text-amber-500" />
                        {f.canvasTitle}
                      </h3>
                      <p className="text-[10px] text-stone-400">{f.canvasSubtitle}</p>
                    </div>

                    {/* WCAG compliant visual tagger */}
                    <div className="flex items-center gap-2 bg-stone-950 px-2.5 py-1.5 rounded-xl border border-stone-800">
                      <span className="text-[10px] font-mono text-stone-400">{f.contrastTitle}:</span>
                      <span className={`text-[10.5px] font-black px-2 py-0.5 rounded ${
                        contrastRatio >= 7 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : contrastRatio >= 4.5 
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' 
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}>
                        {contrastRatio}:1
                      </span>
                      <Info className="w-3.5 h-3.5 text-stone-400 cursor-help" title={
                        contrastRatio >= 4.5 ? f.contrastGood : f.contrastPoor
                      } />
                    </div>
                  </div>

                  {/* View Mode Segment Switcher */}
                  <div className="p-3 bg-stone-950 border-b border-stone-850 flex flex-col md:flex-row items-center justify-between gap-3 shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-stone-400 uppercase tracking-wider">{f.viewModeLabel}:</span>
                      <div className="flex bg-stone-900 p-0.5 rounded-xl border border-stone-800">
                        <button
                          onClick={() => setCanvasViewMode('poster')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            canvasViewMode === 'poster' 
                              ? 'bg-amber-500 text-stone-950 shadow-md font-black' 
                              : 'text-stone-400 hover:text-white'
                          }`}
                        >
                          {f.viewModePoster}
                        </button>
                        <button
                          onClick={() => setCanvasViewMode('website')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            canvasViewMode === 'website' 
                              ? 'bg-amber-500 text-stone-950 shadow-md font-black' 
                              : 'text-stone-400 hover:text-white'
                          }`}
                        >
                          {f.viewModeWebsite}
                        </button>
                      </div>
                    </div>

                    {/* Website Mockup Style Switcher - only show if viewMode is website */}
                    {canvasViewMode === 'website' && (
                      <div className="flex items-center gap-1.5 overflow-x-auto max-w-full">
                        <span className="text-[10px] font-black text-stone-400 hidden xl:inline uppercase">{f.websiteTemplateLabel}:</span>
                        <div className="flex bg-stone-900 p-0.5 rounded-xl border border-stone-800 shrink-0">
                          {[
                            { id: 'saas', label: lang === 'ar' ? '🚀 منصة سحابية' : '🚀 SaaS Cloud' },
                            { id: 'boutique', label: lang === 'ar' ? '🛍️ بوتيك فاخر' : '🛍️ Boutique' },
                            { id: 'portfolio', label: lang === 'ar' ? '💻 أستوديو عمل' : '💻 Studio' },
                            { id: 'restaurant', label: lang === 'ar' ? '☕ مقهى ومطعم' : '☕ Culinary Cafe' }
                          ].map(t => (
                            <button
                              key={t.id}
                              onClick={() => {
                                setWebTemplate(t.id as any);
                                triggerToast(lang === 'ar' ? `تم تفعيل قالب ${t.label.split(' ')[1]}` : `Activated ${t.label.split(' ')[1]} style`);
                              }}
                              className={`px-2.5 py-1.5 rounded-lg text-[10.5px] font-bold transition-all cursor-pointer ${
                                webTemplate === t.id 
                                  ? 'bg-stone-850 text-amber-400 font-extrabold border border-stone-750' 
                                  : 'text-stone-400 hover:text-stone-200'
                              }`}
                            >
                              {t.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Render content based on active view mode */}
                  {canvasViewMode === 'poster' ? (
                    /* Presentation Frame viewport wrapper - Abstract Poster Layout */
                    <div 
                      className="aspect-[16/10] sm:aspect-[16/9] w-full flex items-center justify-center p-6 sm:p-12 relative overflow-hidden transition-all duration-300"
                      style={{
                        backgroundColor: bgColor,
                        backgroundImage: bgType === 'gradient' 
                          ? `linear-gradient(135deg, ${bgColor}, ${bgEndColor})` 
                          : bgType === 'radial' 
                          ? `radial-gradient(circle, ${bgEndColor} 0%, ${bgColor} 100%)` 
                          : 'none'
                      }}
                    >
                      {/* Retro Math Grid design elements inspired by architecture spec */}
                      {bgType === 'grid' && (
                        <div className="absolute inset-0 opacity-10 pointer-events-none" 
                          style={{
                            backgroundImage: `
                              linear-gradient(to right, ${accentColor} 1px, transparent 1px),
                              linear-gradient(to bottom, ${accentColor} 1px, transparent 1px)
                            `,
                            backgroundSize: '32px 32px'
                          }}
                        />
                      )}

                      {/* Designer border frames requested in selector */}
                      {borderType === 'thin' && (
                        <div className="absolute inset-5 rounded-xl border-2 pointer-events-none transition-all duration-300" style={{ borderColor: accentColor }} />
                      )}
                      {borderType === 'thick' && (
                        <div className="absolute inset-6 rounded-lg border-8 pointer-events-none transition-all duration-300" style={{ borderColor: accentColor }} />
                      )}
                      {borderType === 'double' && (
                        <div className="absolute inset-5 rounded-xl border-4 p-1.5 pointer-events-none transition-all duration-300" style={{ borderColor: accentColor }}>
                          <div className="w-full h-full rounded border pointer-events-none opacity-60" style={{ borderColor: accentColor }} />
                        </div>
                      )}
                      {borderType === 'rounded' && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[140px] px-14 py-8 pointer-events-none border-[3px] w-[90%] max-w-[620px] h-[75%] max-h-[260px] flex items-center justify-center transition-all duration-300" style={{ borderColor: accentColor }} />
                      )}

                      {/* Main Creative Container holding dynamic state tags */}
                      <div className="flex flex-col items-center text-center max-w-[90%] z-10 select-none">
                        
                        {/* Typographic Heading Title */}
                        <motion.h2
                          key={`${mainFontId}-${mainStyle.fontSize}-${textColor}`}
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.15 }}
                          className="transition-all whitespace-normal break-all select-all font-sans"
                          style={{
                            fontFamily: currentFont.family,
                            fontSize: `${mainStyle.fontSize}px`,
                            fontWeight: mainStyle.fontWeight,
                            letterSpacing: `${mainStyle.letterSpacing}em`,
                            lineHeight: mainStyle.lineHeight,
                            color: textColor,
                            textTransform: mainStyle.uppercase ? 'uppercase' : 'none',
                            fontStyle: mainStyle.italic ? 'italic' : 'normal',
                            textShadow: mainStyle.textShadow === 'glow' 
                              ? `0 0 25px ${accentColor}, 0 0 5px ${textColor}` 
                              : mainStyle.textShadow === 'subtle'
                              ? `3px 3px 10px rgba(0,0,0,0.4)`
                              : mainStyle.textShadow === 'retro'
                              ? `3px 3px 0 ${accentColor}, 6px 6px 0 rgba(0,0,0,0.15)`
                              : 'none'
                          }}
                        >
                          {mainText || f.previewText}
                        </motion.h2>

                        {/* Graphic Accent underline ribbon if chosen */}
                        {borderType === 'accent-line' && (
                          <div 
                            className="w-2.5/4 h-1.5 rounded bg-amber-500 my-4 shadow-sm transition-all duration-300" 
                            style={{ backgroundColor: accentColor, width: '130px', marginTop: '20px' }} 
                          />
                        )}

                        {/* Subtitle / Tagline Block representation */}
                        {subtitleVisible && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: subtitleStyle.opacity }}
                            className="mt-4 break-normal font-mono"
                            style={{
                              fontFamily: currentSubFont.family,
                              fontSize: `${subtitleStyle.fontSize}px`,
                              fontWeight: subtitleStyle.fontWeight,
                              letterSpacing: `${subtitleStyle.letterSpacing}em`,
                              color: subtitleColor,
                              textTransform: subtitleStyle.uppercase ? 'uppercase' : 'none',
                              fontStyle: subtitleStyle.italic ? 'italic' : 'normal',
                            }}
                          >
                            {subtitleText || 'PREMIUM EST. 2026'}
                          </motion.p>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* Interactive Live Web Hero Section Mockup */
                    <div className="p-4 sm:p-6 bg-stone-900 border-b border-stone-850/40 w-full relative overflow-hidden transition-all duration-300 animate-fade-in">
                      <div className="w-full bg-stone-950/40 rounded-xl border border-stone-800 overflow-hidden flex flex-col shadow-2xl relative">
                        {/* Browser Mock Chrome Window top toolbar */}
                        <div className="px-4 py-2 bg-stone-900/95 border-b border-stone-850 flex items-center justify-between text-xs shrink-0 select-none">
                          <div className="flex items-center gap-1.55 md:gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                          </div>
                          
                          {/* URL Bar containing simulated secure address */}
                          <div className="flex items-center gap-1.5 bg-stone-950 px-4 py-1 rounded-md border border-stone-800 w-[60%] max-w-[340px] justify-center mx-auto text-[10px] text-stone-400">
                            <span className="text-emerald-500 font-bold">https://</span>
                            <span className="font-mono truncate">
                              {mainText ? mainText.toLowerCase().replace(/[^a-z0-9]/g, '-') : 'brand'}.com/
                              <span className="text-amber-500 font-bold">
                                {activeWebPage === 'home' ? 'home' : activeWebPage}
                              </span>
                            </span>
                          </div>

                          <div className="w-12 text-left ltr:text-right rtl:text-left">
                            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" title="Interactive Full Website Multi-Page Live Preview" />
                          </div>
                        </div>

                        {/* Interactive Page / Section Navigation Selector */}
                        <div className="bg-stone-900/80 border-b border-stone-850 px-4 py-2 flex items-center justify-between gap-3 select-none flex-wrap">
                          <div className="flex items-center gap-1.5 shrink-0">
                            <Globe className="w-3.5 h-3.5 text-stone-400" />
                            <span className="text-[10px] text-stone-300 font-black tracking-wide uppercase">
                              {lang === 'ar' ? 'صفحات الموقع المتاح:' : 'Interactive Site Pages:'}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            {[
                              { id: 'home', labelAr: 'الرئيسية 🏠', labelEn: 'Home 🏠' },
                              { id: 'features', labelAr: 'المميزات ✨', labelEn: 'Features ✨' },
                              { id: 'about', labelAr: 'عن العلامة 📖', labelEn: 'About 📖' },
                              { id: 'contact', labelAr: 'اتصل بنا ✉️', labelEn: 'Contact ✉️' }
                            ].map((tab) => (
                              <button
                                key={tab.id}
                                onClick={() => {
                                  setActiveWebPage(tab.id as any);
                                  triggerToast(lang === 'ar' ? `تصفح صفحة: ${tab.labelAr.split(' ')[0]}` : `Navigated to ${tab.labelEn}`);
                                }}
                                className={`px-2.5 py-1 rounded-md text-[10px] font-black tracking-wide transition-all cursor-pointer ${
                                  activeWebPage === tab.id
                                    ? 'bg-amber-500 text-stone-950 font-black shadow-md'
                                    : 'bg-stone-950/40 text-stone-400 hover:text-stone-200 border border-stone-850 hover:bg-stone-900'
                                }`}
                              >
                                {lang === 'ar' ? tab.labelAr : tab.labelEn}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Interactive tip informing them they can live edit texts */}
                        <div className={`border-b px-3 py-1.5 text-center text-[10.5px] font-semibold shrink-0 flex items-center justify-center gap-1.5 transition-colors duration-300 ${
                          isTextLocked 
                            ? 'bg-rose-500/10 border-rose-500/20 text-rose-300' 
                            : 'bg-amber-500/10 border-amber-500/20 text-amber-300'
                        }`}>
                          {isTextLocked ? (
                            <>
                              <Lock className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                              <span>{lang === 'ar' ? 'نمط قفل المحتوى مفعل! يمكنك تعديل وتجربة الخطوط وتناسق الألوان والارتفاعات فقط.' : 'Text content locked! Only styles, weights, fonts, and colors are adjustable now.'}</span>
                            </>
                          ) : (
                            <>
                              <span>{f.editTip} {lang === 'ar' ? '- انقر فوق الروابط والأقسام لتعديلها فورا' : '- Click any text directly to edit it!'}</span>
                            </>
                          )}
                        </div>

                        {/* Complete Web Hero Section Container */}
                        <div 
                          title={isTextLocked ? (lang === 'ar' ? 'تم قفل تعديل النصوص - اضغط لتعديل المظهر والخط فقط' : 'Text modification is locked - click to edit styles & font only') : undefined}
                          className={`p-5 sm:p-8 bg-stone-950 text-stone-100 flex flex-col min-h-[360px] justify-between relative text-right transition-all border-none outline-none ${
                            isTextLocked ? 'bg-stone-950/95' : ''
                          }`} 
                          style={{ direction: lang === 'ar' ? 'rtl' : 'ltr' }}
                        >
                          
                          {/* Suttle atmosphere light glowing background nodes inside the Hero Section */}
                          <div className="absolute top-0 left-1/4 w-48 h-48 rounded-full opacity-10 pointer-events-none blur-3xl" style={{ backgroundColor: accentColor }} />
                          <div className="absolute bottom-1/4 right-1/4 w-36 h-36 rounded-full opacity-10 pointer-events-none blur-3xl bg-amber-500" />
                          
                          {/* 1. Integrated Hero Responsive Navigation Bar */}
                          <header className="flex items-center justify-between border-b border-stone-900 pb-4 mb-6 z-10 shrink-0">
                            {/* Brand Embedded Logo showcasing customized font parameters */}
                            <div className="flex items-center gap-2 group">
                              {/* Sleek Fundora-inspired 3D metallic icon */}
                              <div className="flex items-center justify-center w-6.5 h-6.5 rounded-lg bg-gradient-to-br from-stone-600 via-stone-800 to-stone-950 border border-stone-700 shadow-[inset_1px_1px_3px_rgba(255,255,255,0.25),_0_2px_4px_rgba(0,0,0,0.6)] shrink-0 select-none relative overflow-hidden group-hover:rotate-[360deg] transition-transform duration-700">
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                <Sparkles className="w-3.5 h-3.5 text-stone-200" />
                              </div>

                              <div className="transition-transform group-hover:scale-105 flex flex-col justify-center">
                                <input
                                  type="text"
                                  value={mainText}
                                  readOnly={isTextLocked}
                                  onFocus={() => setActiveWebPage('home')}
                                  onChange={(e) => setMainText(e.target.value)}
                                  className={`w-28 font-black bg-transparent border border-dashed rounded py-0.5 px-1 outline-none text-xs transition-all tracking-wide text-left cursor-pointer ${
                                    activeWebPage === 'home' ? 'border-amber-500/30 text-amber-300 bg-stone-900/10' : 'border-transparent'
                                  }`}
                                  style={{
                                    fontFamily: currentLogoFont.family,
                                    fontWeight: mainStyle.fontWeight || 800,
                                    color: textColor,
                                    textTransform: mainStyle.uppercase ? 'uppercase' : 'none',
                                    fontStyle: mainStyle.italic ? 'italic' : 'normal',
                                    textShadow: mainStyle.textShadow === 'glow' ? `0 0 10px ${accentColor}` : 'none',
                                  }}
                                />
                              </div>
                              
                              {subtitleVisible && (
                                <input
                                  type="text"
                                  value={subtitleText}
                                  readOnly={isTextLocked}
                                  onFocus={() => setActiveWebPage('home')}
                                  onChange={(e) => setSubtitleText(e.target.value)}
                                  className="text-[8px] font-mono opacity-50 bg-transparent border border-dashed border-transparent hover:border-amber-500/40 focus:border-amber-500 focus:bg-stone-900/40 rounded py-0.5 px-0.5 outline-none transition-all w-20 text-center cursor-pointer"
                                  style={{
                                    fontFamily: currentBodyFont.family,
                                    fontWeight: subtitleStyle.fontWeight,
                                    color: subtitleColor,
                                    fontStyle: subtitleStyle.italic ? 'italic' : 'normal'
                                  }}
                                />
                              )}
                            </div>

                            {/* Center interactive menu simulation */}
                            <nav className="hidden md:flex items-center gap-3 text-[10.5px] font-medium" style={{ fontFamily: currentBodyFont.family }}>
                              <input
                                type="text"
                                value={navLink1}
                                readOnly={isTextLocked}
                                onFocus={() => setActiveWebPage('features')}
                                onChange={(e) => setNavLink1(e.target.value)}
                                className={`bg-transparent border border-dashed rounded px-1.5 py-0.5 outline-none transition-all w-20 text-center text-[10.5px] font-semibold tracking-wide cursor-pointer ${
                                  activeWebPage === 'features' ? 'border-amber-500/50 text-amber-300 bg-stone-900/30 font-bold' : 'border-transparent text-stone-400 hover:text-stone-100'
                                }`}
                              />
                              <input
                                type="text"
                                value={navLink2}
                                readOnly={isTextLocked}
                                onFocus={() => setActiveWebPage('about')}
                                onChange={(e) => setNavLink2(e.target.value)}
                                className={`bg-transparent border border-dashed rounded px-1.5 py-0.5 outline-none transition-all w-24 text-center text-[10.5px] font-semibold tracking-wide cursor-pointer ${
                                  activeWebPage === 'about' ? 'border-amber-500/50 text-amber-300 bg-stone-900/30 font-bold' : 'border-transparent text-stone-400 hover:text-stone-100'
                                }`}
                              />
                              <input
                                type="text"
                                value={navLink3}
                                readOnly={isTextLocked}
                                onFocus={() => setActiveWebPage('contact')}
                                onChange={(e) => setNavLink3(e.target.value)}
                                className={`bg-transparent border border-dashed rounded px-1.5 py-0.5 outline-none transition-all w-20 text-center text-[10.5px] font-semibold tracking-wide cursor-pointer ${
                                  activeWebPage === 'contact' ? 'border-amber-500/50 text-amber-300 bg-stone-900/30 font-bold' : 'border-transparent text-stone-400 hover:text-stone-100'
                                }`}
                              />
                            </nav>

                            {/* Header primary navigation action CTA (Sleek Glass Look from screenshot) */}
                            <div>
                              <input
                                type="text"
                                value={navCtaText}
                                readOnly={isTextLocked}
                                onChange={(e) => setNavCtaText(e.target.value)}
                                className="px-3.5 py-1.5 rounded-xl text-[9px] font-black transition-all hover:bg-stone-900 hover:border-stone-700 bg-stone-950 border border-stone-850 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),_0_2px_4px_rgba(0,0,0,0.5)] hover:scale-102 outline-none text-center cursor-pointer text-stone-200 w-24 border-dashed hover:border-dashed active:scale-95"
                                style={{ fontFamily: currentButtonFont.family }}
                              />
                            </div>
                          </header>

                          {/* 2. Interactive Styled Hero Section Viewports */}
                          <div className="flex-1 flex flex-col justify-center py-2 z-10">
                            
                            {activeWebPage === 'home' && (
                              <>
                                 {/* SaaS Concept Hero Layout */}
                                 {webTemplate === 'saas' && (
                               <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-center text-right ltr:text-left pt-2 pb-6">
                                 <div className="lg:col-span-6 flex flex-col gap-4 text-left">
                                   {/* Pill badge detail */}
                                   <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900/90 text-amber-400 text-[10px] font-bold w-fit border border-stone-850 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] select-none">
                                     <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shrink-0" />
                                     <input
                                       type="text"
                                       value={saasHeroPill}
                                       readOnly={isTextLocked}
                                       onChange={(e) => setSaasHeroPill(e.target.value)}
                                       className="bg-transparent text-amber-400 text-[10px] tracking-wider font-extrabold uppercase outline-none border-b border-dashed border-transparent hover:border-amber-500/30 focus:border-amber-500 w-52 px-0.5"
                                       style={{ fontFamily: currentBodyFont.family }}
                                     />
                                   </div>
                                   
                                   {/* Live Editable Title */}
                                   <div className="relative group/title">
                                     <textarea
                                       value={saasHeroTitle}
                                       rows={2}
                                       readOnly={isTextLocked}
                                       onChange={(e) => setSaasHeroTitle(e.target.value)}
                                       className="w-full text-xl sm:text-2xl lg:text-3.5xl font-black bg-transparent border border-dashed border-transparent hover:border-amber-500/40 focus:border-amber-500 focus:bg-stone-900/40 rounded-lg py-1 px-1 text-white outline-none transition-all select-all leading-tight resize-none"
                                       placeholder={lang === 'ar' ? 'عنوان الهيرو التقني...' : 'SaaS Title...'}
                                       style={{ fontFamily: currentHeroFont.family }}
                                     />
                                     <div className="absolute right-2 bottom-1 opacity-0 group-hover/title:opacity-100 transition-opacity pointer-events-none text-[8px] text-amber-500 font-mono bg-stone-950 px-1.5 py-0.5 rounded border border-stone-800">
                                       {lang === 'ar' ? 'انقر للتعديل' : 'CLICK TO EDIT'}
                                     </div>
                                   </div>
                                   
                                   {/* Live Editable Subtitle */}
                                   <div className="relative group/sub">
                                     <textarea
                                       value={saasHeroSub}
                                       rows={3}
                                       readOnly={isTextLocked}
                                       onChange={(e) => setSaasHeroSub(e.target.value)}
                                       className="w-full text-[11px] sm:text-xs leading-relaxed text-stone-400 bg-transparent border border-dashed border-transparent hover:border-amber-500/40 focus:border-amber-500 focus:bg-stone-900/40 rounded-lg py-1 px-1 outline-none transition-all resize-none"
                                       placeholder={lang === 'ar' ? 'تفاصيل السطر الفرعي...' : 'SaaS subtext...'}
                                       style={{ fontFamily: currentBodyFont.family }}
                                     />
                                     <div className="absolute right-2 bottom-1 opacity-0 group-hover/sub:opacity-100 transition-opacity pointer-events-none text-[8px] text-amber-500 font-mono bg-stone-950 px-1.5 py-0.5 rounded border border-stone-800">
                                       {lang === 'ar' ? 'انقر للتعديل' : 'CLICK TO EDIT'}
                                     </div>
                                   </div>

                                   {/* Custom input controls */}
                                   <div className="flex items-center gap-3 mt-2 flex-wrap">
                                     <div className="relative">
                                       <input 
                                         type="text" 
                                         value={saasCtaText}
                                         readOnly={isTextLocked}
                                         onChange={(e) => setSaasCtaText(e.target.value)}
                                         className="px-5 py-3 text-[10.5px] font-black rounded-xl text-stone-950 border border-transparent hover:scale-103 transition-transform outline-none text-center cursor-pointer select-all w-44 shadow-[0_8px_20px_rgba(245,158,11,0.2),_inset_0_1px_1px_rgba(255,255,255,0.4)]"
                                         style={{ backgroundColor: accentColor, fontFamily: currentButtonFont.family }}
                                       />
                                     </div>
                                     <div className="relative">
                                       <input
                                         type="text"
                                         value={saasSecondaryCta}
                                         readOnly={isTextLocked}
                                         onChange={(e) => setSaasSecondaryCta(e.target.value)}
                                         className="px-5 py-3 text-[10.5px] font-bold text-stone-200 hover:text-white transition-all cursor-pointer bg-stone-950/80 hover:bg-stone-900 rounded-xl border border-stone-850 hover:border-stone-700 outline-none w-44 text-center select-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]"
                                         style={{ fontFamily: currentButtonFont.family }}
                                       />
                                     </div>
                                   </div>
                                 </div>

                                 {/* High-tech Custom Prop Trading Simulator Console with orbiting interactive metallic badges */}
                                 <div className="lg:col-span-6 w-full relative py-6 flex items-center justify-center">
                                   
                                   {/* Cosmic background glow rings */}
                                   <div className="absolute w-72 h-72 rounded-full border border-stone-850/50 pointer-events-none animate-[spin_40s_linear_infinite] opacity-30" />
                                   <div className="absolute w-52 h-52 rounded-full border border-dashed border-stone-800/40 pointer-events-none animate-[spin_25s_linear_reverse_infinite] opacity-30" />

                                   {/* Card Console itself */}
                                   <div className="w-[88%] bg-gradient-to-b from-stone-900/95 to-stone-950/98 border border-stone-800/80 p-5 rounded-2xl flex flex-col gap-4 relative overflow-hidden backdrop-blur-md shadow-[0_24px_50px_rgba(0,0,0,0.8),_inset_0_1px_2px_rgba(255,255,255,0.06)] z-10 group/console">
                                     <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
                                     
                                     {/* Console Topbar */}
                                     <div className="flex items-center justify-between border-b border-stone-850 pb-2.5">
                                       <div className="flex items-center gap-1.5">
                                         <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                                         <input
                                           type="text"
                                           value={saasPerformanceTitle}
                                           readOnly={isTextLocked}
                                           onChange={(e) => setSaasPerformanceTitle(e.target.value)}
                                           className="text-[9px] font-mono text-stone-400 tracking-wider uppercase bg-transparent border border-dashed border-transparent hover:border-amber-500/40 focus:border-amber-500 rounded py-0.5 px-1 outline-none w-48 text-left"
                                           style={{ fontFamily: currentBodyFont.family }}
                                         />
                                       </div>
                                       <span className="text-[8.5px] font-mono text-emerald-500 font-black tracking-widest bg-emerald-950/60 border border-emerald-900/50 px-2 py-0.5 rounded-md">
                                         LIVE SIM
                                       </span>
                                     </div>
                                     
                                     {/* Simulated Prop-firm Stats Row */}
                                     <div className="flex flex-col gap-1 py-1">
                                       <div className="text-[10px] uppercase tracking-wider text-stone-500 font-bold" style={{ fontFamily: currentBodyFont.family }}>
                                         {lang === 'ar' ? 'الرصيد المحاكي الممول' : 'Simulated Capital Active'}
                                       </div>
                                       <div className="text-3xl font-black text-white tracking-tight flex items-baseline gap-1.5" style={{ fontFamily: currentHeroFont.family }}>
                                         $200,000 <span className="text-amber-500 text-xs font-mono font-bold">USD</span>
                                       </div>
                                     </div>

                                     {/* Dynamic visual parameters graphs */}
                                     <div className="flex flex-col gap-3 pt-2 border-t border-stone-850/40">
                                       {/* Param 1 (Latency / Simulated Drawdown) */}
                                       <div className="flex flex-col gap-1.5">
                                         <div className="flex items-center justify-between text-[10px]">
                                           <input
                                             type="text"
                                             value={saasLatLabel}
                                             readOnly={isTextLocked}
                                             onChange={(e) => setSaasLatLabel(e.target.value)}
                                             className="text-stone-400 bg-transparent border border-dashed border-transparent hover:border-amber-500/40 focus:border-amber-500 rounded py-0.5 px-0.5 outline-none w-36 text-left"
                                             style={{ fontFamily: currentBodyFont.family }}
                                           />
                                           <input
                                             type="text"
                                             value={saasLatVal}
                                             readOnly={isTextLocked}
                                             onChange={(e) => setSaasLatVal(e.target.value)}
                                             className="font-mono font-bold text-amber-400 bg-transparent border border-dashed border-transparent hover:border-amber-500/40 focus:border-amber-500 rounded py-0.5 px-0.5 outline-none w-16 text-right"
                                           />
                                         </div>
                                         <div className="h-1.5 bg-stone-950 rounded-full overflow-hidden">
                                           <div className="h-full rounded-full transition-all duration-1000" style={{ width: '84%', backgroundColor: accentColor }} />
                                         </div>
                                       </div>
                                       
                                       {/* Param 2 (Servers uptime / Simulated profit target status) */}
                                       <div className="flex flex-col gap-1.5">
                                         <div className="flex items-center justify-between text-[10px]">
                                           <input
                                             type="text"
                                             value={saasRouteLabel}
                                             readOnly={isTextLocked}
                                             onChange={(e) => setSaasRouteLabel(e.target.value)}
                                             className="text-stone-400 bg-transparent border border-dashed border-transparent hover:border-amber-500/40 focus:border-amber-500 rounded py-0.5 px-0.5 outline-none w-36 text-left"
                                             style={{ fontFamily: currentBodyFont.family }}
                                           />
                                           <input
                                             type="text"
                                             value={saasRouteVal}
                                             readOnly={isTextLocked}
                                             onChange={(e) => setSaasRouteVal(e.target.value)}
                                             className="font-mono font-bold text-emerald-400 bg-transparent border border-dashed border-transparent hover:border-amber-500/40 focus:border-amber-500 rounded py-0.5 px-0.5 outline-none w-16 text-right"
                                           />
                                         </div>
                                         <div className="h-1.5 bg-stone-950 rounded-full overflow-hidden">
                                           <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000 animate-pulse" style={{ width: '99.9%' }} />
                                         </div>
                                       </div>
                                     </div>
                                   </div>

                                   {/* Orbiting badges: Floating metallic cards matching the layout in image */}
                                   
                                   {/* Card 1: Top Left Connection badge */}
                                   <div 
                                     onClick={() => triggerToast(lang === 'ar' ? 'خادم التداول النشط متصل بنجاح 🟢' : 'Prop trading servers optimized!')}
                                     className="absolute -top-1 -left-1 sm:-left-3 bg-stone-900/90 hover:bg-stone-850 border border-stone-750 p-2 rounded-xl flex items-center gap-2 shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer select-none z-20 rotate-[-12deg] max-w-[130px] group/subcard"
                                   >
                                     <div className="w-5 h-5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                                       <Zap className="w-3 h-3 text-emerald-400" />
                                     </div>
                                     <div className="text-right">
                                       <div className="text-[7.5px] font-black text-stone-200 uppercase tracking-wider">MT5 SECURE</div>
                                       <div className="text-[6.5px] text-emerald-400 font-mono font-bold">CONNECTED</div>
                                     </div>
                                   </div>

                                   {/* Card 2: Bottom Right simulated Profit badge */}
                                   <div 
                                     onClick={() => triggerToast(lang === 'ar' ? 'نسبة توزيع الأرباح: 100٪ 🏆' : 'Profit target matching verified!')}
                                     className="absolute -bottom-2 -right-1 sm:-right-3 bg-stone-900/90 hover:bg-stone-850 border border-stone-750 p-2 rounded-xl flex items-center gap-2 shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer select-none z-20 rotate-[14deg] max-w-[130px]"
                                   >
                                     <div className="w-5 h-5 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                                       <Sparkles className="w-3 h-3 text-amber-400" />
                                     </div>
                                     <div className="text-right">
                                       <div className="text-[7.5px] font-black text-stone-200 uppercase tracking-wider">{lang === 'ar' ? 'توزيع الأرباح' : 'PROFIT SPLIT'}</div>
                                       <div className="text-[6.5px] text-amber-400 font-mono font-bold">UP TO 100%</div>
                                     </div>
                                   </div>

                                   {/* Card 3: Top Right Risk control badge */}
                                   <div 
                                     onClick={() => triggerToast(lang === 'ar' ? 'بروتوكول حماية رأس المال مفعل 🛡️' : 'Capital preservation rules active.')}
                                     className="absolute top-8 -right-3 bg-stone-900/90 hover:bg-stone-850 border border-stone-750 p-2 rounded-xl flex items-center gap-2 shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer select-none z-20 rotate-[-8deg] max-w-[130px]"
                                   >
                                     <div className="w-5 h-5 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center animate-pulse">
                                       <Shield className="w-3 h-3 text-blue-400" />
                                     </div>
                                     <div className="text-right">
                                       <div className="text-[7.5px] font-black text-stone-200 uppercase tracking-wider">RISK ENGINE</div>
                                       <div className="text-[6.5px] text-blue-400 font-mono font-semibold">ALIGNED</div>
                                     </div>
                                   </div>
                                 </div>
                               </div>
                             )}

                            {/* Luxury Boutique Hero Layout */}
                            {webTemplate === 'boutique' && (
                              <div className="flex flex-col gap-5 text-center items-center py-4 relative">
                                {/* Elegant Luxury framing decorative lines */}
                                <div className="absolute top-0 left-6 bottom-0 w-[1px] bg-stone-900/40 pointer-events-none" />
                                <div className="absolute top-0 right-6 bottom-0 w-[1px] bg-stone-900/40 pointer-events-none" />
                                
                                <div className="flex flex-col items-center gap-3.5 max-w-[85%] mx-auto relative z-10">
                                  <input
                                    type="text"
                                    value={boutiquePillText}
                                    readOnly={isTextLocked}
                                    onChange={(e) => setBoutiquePillText(e.target.value)}
                                    className="text-[8.5px] uppercase tracking-[0.3em] font-mono text-stone-400 text-center bg-transparent border border-dashed border-transparent hover:border-amber-500/40 focus:border-amber-500 rounded py-0.5 px-1 outline-none w-64"
                                  />
                                  
                                  {/* Live Editable Luxury Heading */}
                                  <input
                                    type="text"
                                    value={boutiqueHeroTitle}
                                    readOnly={isTextLocked}
                                    onChange={(e) => setBoutiqueHeroTitle(e.target.value)}
                                    className="w-full text-base sm:text-lg font-bold bg-transparent border border-dashed border-transparent hover:border-amber-500/30 focus:border-amber-500 focus:bg-stone-900/40 rounded-lg py-1 px-1.5 text-white outline-none text-center transition-all select-all font-sans"
                                  />

                                  {/* Live Editable Luxury subtitle */}
                                  <textarea
                                    value={boutiqueHeroSub}
                                    rows={2}
                                    readOnly={isTextLocked}
                                    onChange={(e) => setBoutiqueHeroSub(e.target.value)}
                                    className="w-full text-[11px] leading-relaxed text-stone-400 bg-transparent border border-dashed border-transparent hover:border-amber-500/30 focus:border-amber-500 focus:bg-stone-900/40 rounded-lg py-1 px-1.5 outline-none text-center transition-all resize-none font-sans"
                                  />

                                  {/* Fine centered decorative dividers */}
                                  <div className="flex items-center gap-1.5 my-1">
                                    <div className="w-8 h-[1px] bg-stone-850" />
                                    <span className="text-[10px] text-amber-500">◆</span>
                                    <div className="w-8 h-[1px] bg-stone-850" />
                                  </div>

                                  {/* Dual Premium CTA controls */}
                                  <div className="flex flex-col sm:flex-row items-center gap-3 justify-center mt-1">
                                    <input 
                                      type="text" 
                                      value={boutiqueCtaText}
                                      readOnly={isTextLocked}
                                      onChange={(e) => setBoutiqueCtaText(e.target.value)}
                                      className="px-6 py-2.5 text-[10.5px] font-bold tracking-widest text-stone-950 font-sans cursor-pointer outline-none transition-all shadow-md text-center select-all w-48 rounded border border-dashed border-transparent hover:border-stone-950/40 focus:border-stone-950"
                                      style={{ backgroundColor: accentColor }}
                                    />
                                    <input
                                      type="text"
                                      value={boutiqueSecondaryCta}
                                      readOnly={isTextLocked}
                                      onChange={(e) => setBoutiqueSecondaryCta(e.target.value)}
                                      className="px-6 py-2.5 text-[10px] font-bold tracking-widest text-stone-300 hover:text-white bg-transparent border border-dashed border-transparent hover:border-amber-500/40 focus:border-amber-500 focus:bg-stone-900/40 rounded text-center select-all w-48 outline-none"
                                    />
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Creative Studio Portfolio Hero Layout */}
                            {webTemplate === 'portfolio' && (
                              <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 items-center text-right ltr:text-left py-2">
                                <div className="lg:col-span-6 flex flex-col gap-3.5">
                                  <div className="text-[8px] uppercase tracking-widest font-mono text-stone-400 bg-stone-900 border border-stone-850 px-2 py-0.5 rounded-md w-fit flex items-center">
                                    <input
                                      type="text"
                                      value={portfolioPillText}
                                      readOnly={isTextLocked}
                                      onChange={(e) => setPortfolioPillText(e.target.value)}
                                      className="bg-transparent border border-none outline-none text-[8px] font-mono text-stone-400 w-36 text-center ltr:text-left"
                                    />
                                  </div>
                                  
                                  {/* Live Editable Studio Input */}
                                  <input
                                    type="text"
                                    value={portfolioHeroTitle}
                                    readOnly={isTextLocked}
                                    onChange={(e) => setPortfolioHeroTitle(e.target.value)}
                                    className="w-full text-base sm:text-lg font-black bg-transparent border border-dashed border-transparent hover:border-amber-500/40 focus:border-amber-500 focus:bg-stone-900/40 rounded-lg py-1 px-1 text-white outline-none transition-all select-all font-sans text-right ltr:text-left"
                                  />

                                  {/* Live Editable Studio Description */}
                                  <textarea
                                    value={portfolioHeroSub}
                                    rows={2}
                                    readOnly={isTextLocked}
                                    onChange={(e) => setPortfolioHeroSub(e.target.value)}
                                    className="w-full text-[11px] leading-relaxed text-stone-400 bg-transparent border border-dashed border-transparent hover:border-amber-500/40 focus:border-amber-500 focus:bg-stone-900/40 rounded-lg py-1 px-1 outline-none transition-all resize-none font-sans text-right ltr:text-left"
                                  />

                                  {/* Actions */}
                                  <div className="flex items-center gap-3 mt-1.5">
                                    <input 
                                      type="text"
                                      value={portfolioCtaText}
                                      readOnly={isTextLocked}
                                      onChange={(e) => setPortfolioCtaText(e.target.value)}
                                      className="px-5 py-2 text-xs font-black rounded-lg text-stone-950 font-sans cursor-pointer outline-none transition-all text-center select-all w-44 border border-dashed border-transparent hover:border-stone-950/40 focus:border-stone-950"
                                      style={{ backgroundColor: accentColor }}
                                    />
                                    <input
                                      type="text"
                                      value={portfolioSecondaryCta}
                                      readOnly={isTextLocked}
                                      onChange={(e) => setPortfolioSecondaryCta(e.target.value)}
                                      className="text-[10.5px] font-bold text-stone-400 hover:text-white bg-transparent border border-dashed border-transparent hover:border-amber-500/40 focus:border-amber-500 focus:bg-stone-900/40 rounded px-1.5 py-0.5 transition-colors cursor-pointer outline-none w-32 text-center"
                                    />
                                  </div>
                                </div>

                                {/* Creative bento display on the other side of the Hero Grid */}
                                <div className="lg:col-span-6 w-full grid grid-cols-2 gap-3 shrink-0 self-center">
                                  <div className="p-3 bg-stone-900 hover:bg-stone-850/80 border border-stone-800 rounded-xl relative group overflow-hidden transition-all duration-300 text-right ltr:text-left flex flex-col gap-1">
                                    <input
                                      type="text"
                                      value={portfolioCase1Tag}
                                      readOnly={isTextLocked}
                                      onChange={(e) => setPortfolioCase1Tag(e.target.value)}
                                      className="text-[7.5px] font-mono text-amber-500 uppercase tracking-wider bg-transparent border border-dashed border-transparent hover:border-amber-500/40 focus:border-amber-500 outline-none w-full text-right ltr:text-left"
                                    />
                                    <input
                                      type="text"
                                      value={portfolioCase1Title}
                                      readOnly={isTextLocked}
                                      onChange={(e) => setPortfolioCase1Title(e.target.value)}
                                      className="text-[11px] font-extrabold text-[#ECE6E0] bg-transparent border border-dashed border-transparent hover:border-amber-500/40 focus:border-amber-500 outline-none w-full text-right ltr:text-left"
                                    />
                                    <div className="mt-2 text-[8px] text-stone-400 flex items-center gap-1.5 cursor-pointer">
                                      <span>{lang === 'ar' ? 'عرض دراسة الحالة ←' : 'Explore Case Study →'}</span>
                                    </div>
                                  </div>

                                  <div className="p-3 bg-stone-900 hover:bg-stone-850/80 border border-stone-800 rounded-xl relative group overflow-hidden transition-all duration-300 text-right ltr:text-left flex flex-col gap-1">
                                    <input
                                      type="text"
                                      value={portfolioCase2Tag}
                                      readOnly={isTextLocked}
                                      onChange={(e) => setPortfolioCase2Tag(e.target.value)}
                                      className="text-[7.5px] font-mono text-amber-500 uppercase tracking-wider bg-transparent border border-dashed border-transparent hover:border-amber-500/40 focus:border-amber-500 outline-none w-full text-right ltr:text-left"
                                    />
                                    <input
                                      type="text"
                                      value={portfolioCase2Title}
                                      readOnly={isTextLocked}
                                      onChange={(e) => setPortfolioCase2Title(e.target.value)}
                                      className="text-[11px] font-extrabold text-[#ECE6E0] bg-transparent border border-dashed border-transparent hover:border-amber-500/40 focus:border-amber-500 outline-none w-full text-right ltr:text-left"
                                    />
                                    <div className="mt-2 text-[8px] text-stone-400 flex items-center gap-1.5 cursor-pointer">
                                      <span>{lang === 'ar' ? 'عرض دراسة الحالة ←' : 'Explore Case Study →'}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Fine Cafe Rustic Hero Layout */}
                            {webTemplate === 'restaurant' && (
                              <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 items-center text-right ltr:text-left py-2">
                                <div className="lg:col-span-7 flex flex-col gap-3.5 text-right ltr:text-left">
                                  <div className="text-[8px] uppercase tracking-widest font-mono text-amber-500 font-bold border-b border-amber-500/20 pb-1.5 w-fit flex items-center">
                                    <input
                                      type="text"
                                      value={cafePillText}
                                      readOnly={isTextLocked}
                                      onChange={(e) => setCafePillText(e.target.value)}
                                      className="bg-transparent border border-none outline-none text-[8px] font-mono text-amber-500 font-bold w-52 text-right ltr:text-left"
                                    />
                                  </div>
                                  
                                  {/* Live Editable Cafe title */}
                                  <input
                                    type="text"
                                    value={cafeHeroTitle}
                                    readOnly={isTextLocked}
                                    onChange={(e) => setCafeHeroTitle(e.target.value)}
                                    className="w-full text-base sm:text-lg font-bold bg-transparent border border-dashed border-transparent hover:border-amber-500/40 focus:border-amber-500 focus:bg-stone-900/40 rounded-lg py-1 px-1.5 text-white outline-none transition-all select-all font-sans text-right ltr:text-left"
                                  />

                                  {/* Live Editable Cafe description */}
                                  <textarea
                                    value={cafeHeroSub}
                                    rows={2}
                                    readOnly={isTextLocked}
                                    onChange={(e) => setCafeHeroSub(e.target.value)}
                                    className="w-full text-[11px] leading-relaxed text-stone-400 bg-transparent border border-dashed border-transparent hover:border-amber-500/40 focus:border-amber-500 focus:bg-stone-900/40 rounded-lg py-1 px-1.5 outline-none transition-all resize-none font-sans text-right ltr:text-left"
                                  />

                                  {/* Actions */}
                                  <div className="flex items-center gap-3.5 mt-1">
                                    <input 
                                      type="text" 
                                      value={cafeCtaText}
                                      readOnly={isTextLocked}
                                      onChange={(e) => setCafeCtaText(e.target.value)}
                                      className="px-5 py-2 text-xs font-black rounded-lg text-stone-950 font-sans cursor-pointer outline-none transition-all text-center select-all w-44 border border-dashed border-transparent hover:border-stone-950/40 focus:border-stone-950"
                                      style={{ backgroundColor: accentColor }}
                                    />
                                    <input
                                      type="text"
                                      value={cafeSecondaryCta}
                                      readOnly={isTextLocked}
                                      onChange={(e) => setCafeSecondaryCta(e.target.value)}
                                      className="text-[10px] text-stone-400 font-mono bg-transparent border border-dashed border-transparent hover:border-amber-500/40 focus:border-amber-500 focus:bg-stone-900/40 rounded px-1.5 py-0.5 outline-none transition-all w-48 text-right ltr:text-left"
                                    />
                                  </div>
                                </div>

                                {/* Chef Specialty Card block on right of Cafe Hero */}
                                <div className="lg:col-span-5 w-full bg-stone-900/90 border border-stone-800 p-4 rounded-xl flex flex-col gap-3 shrink-0 self-center">
                                  <input
                                    type="text"
                                    value={cafeSpecialLabel}
                                    readOnly={isTextLocked}
                                    onChange={(e) => setCafeSpecialLabel(e.target.value)}
                                    className="text-[8.5px] uppercase tracking-wider font-mono text-amber-500 font-bold bg-transparent border border-dashed border-transparent hover:border-amber-500/40 focus:border-amber-500 outline-none w-full text-right ltr:text-left"
                                  />
                                  
                                  <div className="flex justify-between items-start text-xs pb-2 border-b border-stone-800/80 gap-1.5">
                                    <div className="flex-1 flex flex-col gap-0.5 text-right ltr:text-left">
                                      <input
                                        type="text"
                                        value={cafeItem1Name}
                                        readOnly={isTextLocked}
                                        onChange={(e) => setCafeItem1Name(e.target.value)}
                                        className="font-extrabold text-[#ECE6E0] bg-transparent border border-dashed border-transparent hover:border-amber-500/40 focus:border-amber-500 outline-none w-full text-xs text-right ltr:text-left"
                                      />
                                      <input
                                        type="text"
                                        value={cafeItem1Sub}
                                        readOnly={isTextLocked}
                                        onChange={(e) => setCafeItem1Sub(e.target.value)}
                                        className="text-[9px] text-stone-400 bg-transparent border border-dashed border-transparent hover:border-amber-500/40 focus:border-amber-500 outline-none w-full text-right ltr:text-left"
                                      />
                                    </div>
                                    <input
                                      type="text"
                                      value={cafeItem1Price}
                                      readOnly={isTextLocked}
                                      onChange={(e) => setCafeItem1Price(e.target.value)}
                                      className="font-mono text-amber-400 font-black text-[11px] shrink-0 bg-transparent border border-dashed border-transparent hover:border-amber-500/40 focus:border-amber-500 outline-none w-10 text-right"
                                    />
                                  </div>

                                  <div className="flex justify-between items-start text-xs pb-1 gap-1.5">
                                    <div className="flex-1 flex flex-col gap-0.5 text-right ltr:text-left">
                                      <input
                                        type="text"
                                        value={cafeItem2Name}
                                        readOnly={isTextLocked}
                                        onChange={(e) => setCafeItem2Name(e.target.value)}
                                        className="font-extrabold text-[#ECE6E0] bg-transparent border border-dashed border-transparent hover:border-amber-500/40 focus:border-amber-500 outline-none w-full text-xs text-right ltr:text-left"
                                      />
                                      <input
                                        type="text"
                                        value={cafeItem2Sub}
                                        readOnly={isTextLocked}
                                        onChange={(e) => setCafeItem2Sub(e.target.value)}
                                        className="text-[9px] text-stone-405 bg-transparent border border-dashed border-transparent hover:border-amber-500/40 focus:border-amber-500 outline-none w-full text-right ltr:text-left"
                                      />
                                    </div>
                                    <input
                                      type="text"
                                      value={cafeItem2Price}
                                      readOnly={isTextLocked}
                                      onChange={(e) => setCafeItem2Price(e.target.value)}
                                      className="font-mono text-amber-400 font-black text-[11px] shrink-0 bg-transparent border border-dashed border-transparent hover:border-amber-500/40 focus:border-amber-500 outline-none w-10 text-right"
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                              </>
                            )}

                            {/* Features Page */}
                            {activeWebPage === 'features' && (
                              <div className="py-6 px-2 text-right ltr:text-left z-10 animate-fade-in">
                                <div className="text-center mb-8">
                                  <h3 className="text-sm sm:text-base font-black tracking-wider mb-2 select-all text-white" style={{ fontFamily: currentHeroFont.family }}>
                                    {webTemplate === 'saas' && (lang === 'ar' ? 'حلول سحابية متقدمة لشركتك' : 'Advanced Cloud Solutions')}
                                    {webTemplate === 'boutique' && (lang === 'ar' ? 'أناقة التفاصيل وهدوء الخطوط' : 'Aesthetic Tailored Luxury')}
                                    {webTemplate === 'portfolio' && (lang === 'ar' ? 'سجل القدرات والحلول الإبداعية' : 'Signature Studio Capabilities')}
                                    {webTemplate === 'restaurant' && (lang === 'ar' ? 'مطبخنا الاستثنائي ونكهاتنا المختصة' : 'Artisanal Roastery Offerings')}
                                  </h3>
                                  <div className="w-12 h-1 mx-auto rounded" style={{ backgroundColor: accentColor }} />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  {webTemplate === 'saas' && [
                                    { icon: <Zap className="w-5 h-5" />, title: 'تتبع بالزمن الفعلي', sub: 'راقب تحركات خوادمك وشعارك الجديد ثانية بثانية بموثوقية فائقة.' },
                                    { icon: <Shield className="w-5 h-5" />, title: 'أمان وثقة مشفرة', sub: 'تأمين بنسبة 99.9% مدعوم بأنظمة حماية ذكية تعزل هجمات القرصنة.' },
                                    { icon: <Cpu className="w-5 h-5" />, title: 'ذكاء موازنة تباين الهوية', sub: 'خوارزمية ذكية لمطابقة أبعاد الخط مع راحة الأعين في المتصفح.' },
                                    { icon: <Grid className="w-5 h-5" />, title: 'كود جاهز للـ API', sub: 'قم بالربط البرمجي الفوري واستدعاء البيانات في أقل من 5 ثوان.' }
                                  ].map((feat, i) => (
                                    <div key={i} className="p-4 bg-stone-900 border border-stone-850 rounded-xl hover:border-stone-700 transition-colors text-right ltr:text-left">
                                      <div className="flex items-center gap-3 mb-2">
                                        <div className="p-1.5 rounded-lg bg-stone-950" style={{ color: accentColor }}>{feat.icon}</div>
                                        <h4 className="text-xs font-black text-white" style={{ fontFamily: currentHeroFont.family }}>{lang === 'ar' ? feat.title : ['Real-time Metrics', 'Enterprise Grade Shield', 'AI Color Adaptivity', 'Instant SDK Integration'][i]}</h4>
                                      </div>
                                      <p className="text-[10px] text-stone-400 leading-relaxed" style={{ fontFamily: currentBodyFont.family }}>{lang === 'ar' ? feat.sub : ['Track cloud server requests and dynamic typography scale instantly.', 'Ensure your vector properties and corporate secrets are bulletproof.', 'Auto-scales body font parameters depending on visual device viewport.', 'Plug as simple packages without configuring convoluted legacy wrappers.'][i]}</p>
                                    </div>
                                  ))}

                                  {webTemplate === 'boutique' && [
                                    { icon: <Sparkles className="w-5 h-5" />, title: 'منسوجات طبيعية مستدامة', sub: 'ألياف نقية من الصوف العضوي والكتان الطبيعي الصديق للبيئة.' },
                                    { icon: <Award className="w-5 h-5" />, title: 'تفصيل يدوي رائع', sub: 'تطريز يدوي دقيق يستحيل تكراره، مصمم ومصاغ لراحة كاملة.' },
                                    { icon: <Palette className="w-5 h-5" />, title: 'مستخلصات ألوان نباتية', sub: 'عملية تلوين فريدة نعتمد فيها كلياً على ثمار الطبيعة البرية.' },
                                    { icon: <Info className="w-5 h-5" />, title: 'سلسلة حصرية محدودة', sub: 'عدد نسخ محدود للغاية من كل فستان أو قطعة لضمان الخصوصية والتميز.' }
                                  ].map((feat, i) => (
                                    <div key={i} className="p-4 bg-stone-900 border border-stone-850 rounded-xl hover:border-stone-700 transition-colors text-right ltr:text-left">
                                      <div className="flex items-center gap-3 mb-2">
                                        <div className="p-1.5 rounded-lg bg-stone-950" style={{ color: accentColor }}>{feat.icon}</div>
                                        <h4 className="text-xs font-black text-white" style={{ fontFamily: currentHeroFont.family }}>{lang === 'ar' ? feat.title : ['Premium Linen & Silk', 'Masterfully Handcrafted', 'Natural Earth Tone Pigments', 'Collector Items Catalog'][i]}</h4>
                                      </div>
                                      <p className="text-[10px] text-stone-400 leading-relaxed" style={{ fontFamily: currentBodyFont.family }}>{lang === 'ar' ? feat.sub : ['Organic premium cottons meticulously picked to feel like breeze.', 'Each seam is inspected by an expert atelier master for premium aesthetics.', 'We formulate visual textures based on raw earth dye palettes.', 'Only 15 bespoke sets hand-made yearly to prevent cookie-cutter trends.'][i]}</p>
                                    </div>
                                  ))}

                                  {webTemplate === 'portfolio' && [
                                    { icon: <Compass className="w-5 h-5" />, title: 'هندسة الأنظمة البصرية', sub: 'نصنع لعلامتك الكبرى عمارة فنية وثقافة بصرية تتحدى العصور.' },
                                    { icon: <PenTool className="w-5 h-5" />, title: 'مسبك خطوط التايبوجرافي', sub: 'رسم ونحت وتطوير مصفوفة خطوط حصرية للملفات الكونية والشركات.' },
                                    { icon: <Layout className="w-5 h-5" />, title: 'تصميم مواقع تفاعلية غامرة', sub: 'بناء واجهات رقمية جذابة تمنح علامتك تألقاً وديناميكية لا مثيل لها.' },
                                    { icon: <Type className="w-5 h-5" />, title: 'التوجيه الإبداعي الشامل', sub: 'إشراف فني لتأكيد انسجام الفن والصياغة مع فلسفة التصميم العامة.' }
                                  ].map((feat, i) => (
                                    <div key={i} className="p-4 bg-stone-900 border border-stone-850 rounded-xl hover:border-stone-700 transition-colors text-right ltr:text-left">
                                      <div className="flex items-center gap-3 mb-2">
                                        <div className="p-1.5 rounded-lg bg-stone-950" style={{ color: accentColor }}>{feat.icon}</div>
                                        <h4 className="text-xs font-black text-white" style={{ fontFamily: currentHeroFont.family }}>{lang === 'ar' ? feat.title : ['Visual Space Architectures', 'Custom Type Design Foundry', 'Frictionless Web Aesthetics', 'Editorial Creative Direction'][i]}</h4>
                                      </div>
                                      <p className="text-[10px] text-stone-400 leading-relaxed" style={{ fontFamily: currentBodyFont.family }}>{lang === 'ar' ? feat.sub : ['We map core semantic rules directly onto your space layout guidelines.', 'Unique visual character sets crafted to support Arabic and Latin glyphs.', 'High fidelity user interface layouts rendered to keep brand alignment.', 'Complete brand direction from cinematic media to physical prints.'][i]}</p>
                                    </div>
                                  ))}

                                  {webTemplate === 'restaurant' && [
                                    { icon: <Coffee className="w-5 h-5" />, title: 'محاصيل نادرة من المزارع', sub: 'بذور بن نادرة للغاية مستخلصة ومستوردة من مزارع گيشا وسيدامو.' },
                                    { icon: <Flame className="w-5 h-5" />, title: 'تحميص حركي محسوب دقة', sub: 'درجات طهي متزنة تبرز خلاصة المذاق الفاكهي والسكري الطبيعي.' },
                                    { icon: <Cookie className="w-5 h-5" />, title: 'مخبوزات فرنسية هشة', sub: 'معجنات وكرواسون زبدي يخبز طازجاً كل ساعة في مساحة المحمصة.' },
                                    { icon: <GlassWater className="w-5 h-5" />, title: 'تقنية التصفية الباردة', sub: 'تنقيع وتصفية البن المقطر لمدة ١٨ ساعة تحت الصفر للمذاق البارد المثالي.' }
                                  ].map((feat, i) => (
                                    <div key={i} className="p-4 bg-stone-900 border border-stone-850 rounded-xl hover:border-stone-700 transition-colors text-right ltr:text-left">
                                      <div className="flex items-center gap-3 mb-2">
                                        <div className="p-1.5 rounded-lg bg-stone-950" style={{ color: accentColor }}>{feat.icon}</div>
                                        <h4 className="text-xs font-black text-white" style={{ fontFamily: currentHeroFont.family }}>{lang === 'ar' ? feat.title : ['Noble Specialty Beans', 'Kinetic Slow Roasting', 'Hot Layered Croissants', 'Ice cold Nitro Extraction'][i]}</h4>
                                      </div>
                                      <p className="text-[10px] text-stone-400 leading-relaxed" style={{ fontFamily: currentBodyFont.family }}>{lang === 'ar' ? feat.sub : ['Organic, single-estate green beans direct from generational farms.', 'Every heating profile is plotted digitally to release floral aromas.', 'Light croissants and almond pastries baked hot to serve you better.', 'Bespoke triple-filtered coffee dripping for 18 hours.'][i]}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* About Page */}
                            {activeWebPage === 'about' && (
                              <div className="py-6 px-2 text-right ltr:text-left z-10 animate-fade-in">
                                <div className="text-center mb-6">
                                  <span className="text-[9px] uppercase tracking-widest font-mono text-amber-400" style={{ color: accentColor, fontFamily: currentBodyFont.family }}>
                                    {lang === 'ar' ? 'رحلة الشغف والإلهام' : 'BRAND MANIFESTO'}
                                  </span>
                                  <h3 className="text-sm sm:text-base font-black tracking-tight mt-1 select-all text-white" style={{ fontFamily: currentHeroFont.family }}>
                                    {lang === 'ar' ? 'قصة بناء التميز البصري والعملي' : 'The Legacy of Visual Excellence'}
                                  </h3>
                                </div>

                                <div className="p-5 bg-stone-900 border border-stone-850 rounded-xl relative overflow-hidden flex flex-col md:flex-row gap-6 items-center">
                                  <div className="flex-1">
                                    <blockquote className="text-[11px] border-r-2 ltr:border-l-2 ltr:border-r-0 pl-3 pr-3 italic text-stone-300 leading-relaxed mb-4" style={{ borderColor: accentColor, fontFamily: currentHeroFont.family }}>
                                      {webTemplate === 'saas' && (lang === 'ar'
                                        ? '“التكنولوجيا سهلة عندما تلمس القلوب بتصميم فذ وبساطة معبرة لا تقبل التشتيت.”'
                                        : '“Software feels easy when it is framed with absolute focus and bold, modern layout principles.”')}
                                      {webTemplate === 'boutique' && (lang === 'ar'
                                        ? '“الأناقة ليست لفت الأنظار الفوري المزعج، بل هي البصمة الهادئة التي تعيش للأبد في الذاكرة.”'
                                        : '“Bespoke modeling isn’t about instant noise; it is a serene whisper surviving the test of time.”')}
                                      {webTemplate === 'portfolio' && (lang === 'ar'
                                        ? '“التايبوجرافي والهندسة هي الهيكل العظمي للمشاهد البصرية. نحن نصمم لغة المستقبل.”'
                                        : '“Readable typography is the core architecture of brand communications. We design structural voices.”')}
                                      {webTemplate === 'restaurant' && (lang === 'ar'
                                        ? '“القهوة هي الهدنة الوحيدة في هذا العالم الصاخب؛ نعد كوبك كأنه آخر كوب تذوق قهوة في التاريخ.”'
                                        : '“Coffee brewing is the ultimate peace in our hyper-paced culture. We treat it like fine art.”')}
                                    </blockquote>

                                    <p className="text-[10px] text-stone-400 leading-relaxed" style={{ fontFamily: currentBodyFont.family }}>
                                      {webTemplate === 'saas' && (lang === 'ar'
                                        ? 'تأسست المنصة بأعلى معايير جودة وتكامل الخوادم السحابية لتوفير بيئات تصفح ذكية. نساعدك على صهر وتوريث الهويات الرقمية بطريقة تتحدى التعقيدات التقنية التقليدية.'
                                        : 'Our cloud pipeline was engineered from ground-up to yield unmatched UI optimization. We empower tech teams to customize layouts without overhead.')}
                                      {webTemplate === 'boutique' && (lang === 'ar'
                                        ? 'بدأنا كأتيلييه صغير يثق بطاقة الحرير العضوي وخيوط الكتان الصافية. نصنع بفخر قطعاً خالية من الرتابة والإنتاج التجاري الضخم لنمنحك التفرّد المطلق.'
                                        : 'We debuted as a handcrafted micro-atelier appreciating zero pesticide silk threads. Today we introduce timeless garments that speak values.')}
                                      {webTemplate === 'portfolio' && (lang === 'ar'
                                        ? 'نحن استوديو إبداعي متكامل لصياغة الخطوط الحصرية وتنمية الثقافة البصرية للمشاريع المتميزة بنكهة محلية وعالمية لا تقبل التقليد.'
                                        : 'A close-knit agency of designers, developers, and typeface professionals collaborating across various continents to shape brand legacy.')}
                                      {webTemplate === 'restaurant' && (lang === 'ar'
                                        ? 'حكايتنا بدأت برغبة واحدة: تقديم كوب قهوة يعيد تعريف حواسك. نجوب هضاب البن في البرازيل وكولومبيا لنصحبك يومياً في تجربة ذواقة نادرة.'
                                        : 'We began with one humble intent: to serve coffee that elevates human clarity. Our beans are responsibly gathered to secure optimal freshness.')}
                                    </p>
                                  </div>

                                  <div className="w-full md:w-1/3 bg-stone-950 p-4 rounded-lg flex flex-col items-center justify-center border border-stone-850 select-none shrink-0 text-center">
                                    <span className="text-lg font-bold font-mono text-amber-500" style={{ color: accentColor }}>2026</span>
                                    <span className="text-[8px] text-stone-500 uppercase tracking-widest font-mono mt-1">
                                      {lang === 'ar' ? 'هوية معتمدة موثوقة' : 'VERIFIED ESTABLISHED'}
                                    </span>
                                    <div className="w-8 h-[1px] bg-stone-800 my-2" />
                                    <span className="text-xs font-bold text-stone-300" style={{ fontFamily: currentLogoFont.family }}>{mainText}</span>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Contact Page */}
                            {activeWebPage === 'contact' && (
                              <div className="py-6 px-2 z-10 animate-fade-in text-right ltr:text-left">
                                <div className="text-center mb-6">
                                  <h3 className="text-sm sm:text-base font-black tracking-tight text-white mb-1 select-all" style={{ fontFamily: currentHeroFont.family }}>
                                    {lang === 'ar' ? 'تواصل مع خبراء علامتنا التجارية' : 'Bring Your Vision to Life'}
                                  </h3>
                                  <p className="text-[10px] text-stone-400 max-w-[280px] sm:max-w-md mx-auto" style={{ fontFamily: currentBodyFont.family }}>
                                    {lang === 'ar' ? 'سجل اهتمامك الآن وسنقوم بالتواصل معك لجدولة دراسة مجانية لاحتياجات هويتك ومشروعك.' : 'Submit the inquiry form below and our lead design consultants will follow up to organize a startup review.'}
                                  </p>
                                </div>

                                {contactStatus === 'success' ? (
                                  <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center flex flex-col items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                                      <Check className="w-4 h-4 stroke-[3]" />
                                    </div>
                                    <h4 className="text-xs font-black text-white" style={{ fontFamily: currentHeroFont.family }}>{lang === 'ar' ? 'تم استلام استمارتك بنجاح!' : 'Your application was received!'}</h4>
                                    <p className="text-[9.5px] text-stone-400 leading-relaxed max-w-sm" style={{ fontFamily: currentBodyFont.family }}>
                                      {lang === 'ar' 
                                        ? `نشكرك على اهتمامك بـ ${mainText || 'العلامة'}. تم تسجيل رسالتك في قسم العملاء، وسنقوم بمراسلتك بالبريد الإلكتروني خلال ساعات.` 
                                        : `Thank you for sharing your interest with ${mainText || 'Brand'}. Your guidelines are registered and our unit will respond within 24 hours.`}
                                    </p>
                                    <button
                                      onClick={() => {
                                        setContactStatus('idle');
                                        setContactMsg('');
                                      }}
                                      className="mt-2 px-3 py-1 bg-stone-900 border border-stone-800 text-stone-300 hover:text-white rounded-lg text-[9.5px] font-bold cursor-pointer"
                                      style={{ fontFamily: currentButtonFont.family }}
                                    >
                                      {lang === 'ar' ? 'إرسال استفسار آخر' : 'Send Another Inquiry'}
                                    </button>
                                  </div>
                                ) : (
                                  <form 
                                    onSubmit={(e) => {
                                      e.preventDefault();
                                      if (!contactName || !contactEmail) {
                                        triggerToast(lang === 'ar' ? 'الرجاء تعبئة الاسم والبريد!' : 'Please fill in Name and Email!');
                                        return;
                                      }
                                      setContactStatus('success');
                                      triggerToast(lang === 'ar' ? 'تم إرسال الطلب بنجاح!' : 'Inquiry submitted successfully!');
                                    }}
                                    className="p-5 bg-stone-900 border border-stone-850 rounded-xl flex flex-col gap-3.5"
                                  >
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                      <div className="flex flex-col gap-1">
                                        <label className="text-[8px] uppercase tracking-wider font-mono text-stone-400" style={{ fontFamily: currentBodyFont.family }}>{lang === 'ar' ? 'الاسم الكريم' : 'YOUR NAME'}</label>
                                        <input
                                          type="text"
                                          required
                                          placeholder={lang === 'ar' ? 'ادخل اسمك هنا...' : 'John Doe'}
                                          value={contactName}
                                          onChange={(e) => setContactName(e.target.value)}
                                          className="bg-stone-950 border border-stone-800 rounded-lg p-2 text-[10px] text-white focus:border-amber-500 outline-none"
                                          style={{ fontFamily: currentBodyFont.family }}
                                        />
                                      </div>
                                      <div className="flex flex-col gap-1">
                                        <label className="text-[8px] uppercase tracking-wider font-mono text-stone-400" style={{ fontFamily: currentBodyFont.family }}>{lang === 'ar' ? 'عنوان البريد الإلكتروني' : 'EMAIL ADDRESS'}</label>
                                        <input
                                          type="type"
                                          required
                                          placeholder="name@example.com"
                                          value={contactEmail}
                                          onChange={(e) => setContactEmail(e.target.value)}
                                          className="bg-stone-950 border border-stone-800 rounded-lg p-2 text-[10px] text-white focus:border-amber-500 outline-none"
                                          style={{ fontFamily: currentBodyFont.family }}
                                        />
                                      </div>
                                    </div>

                                    <div className="flex flex-col gap-1">
                                      <label className="text-[8px] uppercase tracking-wider font-mono text-stone-400" style={{ fontFamily: currentBodyFont.family }}>{lang === 'ar' ? 'ما نوع المشروع أو طلب الهوية المطلوب؟' : 'HOW CAN WE COLLABORATE?'}</label>
                                      <textarea
                                        rows={2}
                                        placeholder={lang === 'ar' ? 'صف باختصار الرؤية أو الخدمة المطلوبة لشركتك هنا...' : 'Briefly describe your vision, questions, or timeline...'}
                                        value={contactMsg}
                                        onChange={(e) => setContactMsg(e.target.value)}
                                        className="bg-stone-950 border border-stone-800 rounded-lg p-2 text-[10px] text-white focus:border-amber-500 outline-none resize-none"
                                        style={{ fontFamily: currentBodyFont.family }}
                                      />
                                    </div>

                                    <button
                                      type="submit"
                                      className="w-full py-2 rounded-lg text-[10.5px] font-black transition-all cursor-pointer select-none text-stone-950 hover:bg-opacity-90 animate-pulse"
                                      style={{ backgroundColor: accentColor, fontFamily: currentButtonFont.family }}
                                    >
                                      {lang === 'ar' ? 'إرسال الطلب وحجز موعد استشارة' : 'Submit Guidelines & Send'}
                                    </button>
                                  </form>
                                )}
                              </div>
                            )}

                          </div>

                          {/* 3. Hero Section minimal Footer branding */}
                          <footer className="mt-6 pt-3 border-t border-stone-900/60 flex items-center justify-between text-[10px] text-stone-500 shrink-0 z-10" style={{ direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
                            <div>
                              <span>© 2026 {mainText || 'Brand'}. {lang === 'ar' ? 'جميع الحقوق محفوظة لقسم الهيرو.' : 'All rights reserved.'}</span>
                            </div>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={footerTerm1}
                                readOnly={isTextLocked}
                                onChange={(e) => setFooterTerm1(e.target.value)}
                                className="bg-transparent border border-dashed border-transparent hover:border-amber-500/40 focus:border-amber-500 focus:bg-stone-900/40 rounded px-1.5 py-0.5 outline-none transition-all text-stone-500 hover:text-stone-300 w-20 text-center"
                              />
                              <input
                                type="text"
                                value={footerTerm2}
                                readOnly={isTextLocked}
                                onChange={(e) => setFooterTerm2(e.target.value)}
                                className="bg-transparent border border-dashed border-transparent hover:border-amber-500/40 focus:border-amber-500 focus:bg-stone-900/40 rounded px-1.5 py-0.5 outline-none transition-all text-stone-500 hover:text-stone-300 w-24 text-center"
                              />
                            </div>
                          </footer>

                        </div>
                      </div>
                    </div>
                  )}

                  {/* Quick trigger Actions beneath frame */}
                  <div className="p-4 bg-stone-900 border-t border-stone-850 flex items-center justify-between gap-3">
                    <button
                      onClick={triggerSvgDownload}
                      className="px-5 py-3 bg-white hover:bg-stone-100 text-stone-950 font-black text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg active:scale-[0.98] cursor-pointer"
                    >
                      <Download className="w-4 h-4 stroke-[2.5]" />
                      {f.downloadSvgLabel}
                    </button>

                    <button
                      onClick={() => copyToClipboard(generatedCode.tailwind)}
                      className="px-4 py-3 bg-stone-950 hover:bg-stone-850 border border-stone-800 text-stone-300 hover:text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      {lang === 'ar' ? 'نسخ كود الـ HTML والـ Tailwind' : 'Copy Tailwind/HTML'}
                    </button>
                  </div>
                </div>

                {/* Sub-Panel: Dynamic Source Output inspector */}
                <div className="bg-stone-900 border border-stone-850 rounded-2xl p-5 shadow-xl">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                      <FileText className="w-4 h-4 text-amber-500" />
                      {f.copyCss}
                    </h3>
                    <div className="flex gap-1.5">
                      <span className="text-[9px] font-mono font-bold text-stone-400 bg-stone-950 px-2 py-0.5 rounded border border-stone-800 uppercase">
                        CSS / SCSS
                      </span>
                    </div>
                  </div>

                  <div className="relative">
                    <pre className="text-[11.5px] font-mono text-stone-300 bg-stone-950 p-4 rounded-xl border border-stone-800 overflow-x-auto max-h-[160px] leading-relaxed select-all">
                      <code>{generatedCode.css}</code>
                    </pre>

                    <button
                      onClick={() => copyToClipboard(generatedCode.css)}
                      className="absolute top-2.5 ltr:right-2.5 rtl:left-2.5 p-2 bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded-lg text-stone-400 hover:text-amber-400 transition-colors cursor-pointer"
                      title="Copy raw CSS rules"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Direct info note about pre-loaded assets */}
                <div className="bg-stone-900/40 border border-stone-900 rounded-2xl p-4 flex gap-3 text-stone-450 items-start">
                  <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-relaxed text-stone-400">
                    {lang === 'ar' 
                      ? 'تم تحضير الهويات البصرية لتلائم الأغراض التجارية وصناعة الكروت والملصقات بدقة عالية. جميع عائلات الخط المستخدمة تم سحبها من خدمة Google Web Fonts وهي متاحة مجاناً بدون شروط ترخيص مغلقة.'
                      : 'All layout blueprints and assets have been pre-rendered recursively to guarantee standalone execution on all client viewports. Embedded styles refer to the live Google Web Fonts catalog directory under permissive libre licenses.'}
                  </p>
                </div>

              </div>

            </motion.div>
          )}

          {activeTab === 'compare' && (
            <motion.div
              key="compare-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-stone-900 border border-stone-850 rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-stone-800 pb-5 gap-4">
                <div>
                  <h3 className="text-base font-black text-white flex items-center gap-2">
                    <Grid className="w-5 h-5 text-amber-500" />
                    {f.compareTitle}
                  </h3>
                  <p className="text-xs text-stone-400 mt-1">{f.compareSub}</p>
                </div>

                {/* Auxiliary compare parameters input */}
                <div className={`w-full sm:w-auto flex items-center gap-2 p-1.5 rounded-xl border transition-all ${
                  isTextLocked 
                    ? 'bg-stone-900/30 border-stone-850/60 opacity-60' 
                    : 'bg-stone-950 border-stone-800'
                }`}>
                  <input
                    type="text"
                    value={mainText}
                    disabled={isTextLocked}
                    onChange={(e) => setMainText(e.target.value)}
                    placeholder={f.customTextPH}
                    className={`bg-transparent text-white text-xs px-3 py-1.5 focus:outline-none w-full sm:w-[220px] font-sans font-bold ${
                      isTextLocked ? 'cursor-not-allowed text-stone-500' : ''
                    }`}
                  />
                  {isTextLocked ? (
                    <Lock className="w-4 h-4 text-rose-500 mr-2 shrink-0" />
                  ) : (
                    <RefreshCw className="w-4 h-4 text-stone-500 mr-2 shrink-0 cursor-pointer hover:rotate-45 transition-transform" onClick={() => triggerToast(f.copied)} />
                  )}
                </div>
              </div>

              {/* Grid output wrapper */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 pt-6">
                {FONTS_CATALOG.map((font) => {
                  const isMainSelected = font.id === mainFontId;
                  return (
                    <div 
                      key={font.id} 
                      onMouseEnter={() => preloadFontFamily(font.family)}
                      className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between min-h-[160px] ${
                        isMainSelected 
                          ? 'border-amber-500 bg-amber-500/[0.02] shadow-lg shadow-amber-500/5' 
                          : 'border-stone-800/80 bg-stone-950/40 hover:bg-stone-950 hover:border-stone-700'
                      }`}
                    >
                      <div>
                        {/* Upper taxonomy row */}
                        <div className="flex justify-between items-start gap-2 mb-3">
                          <div>
                            <h4 className="text-xs font-bold text-stone-300 font-mono inline-block">{font.name}</h4>
                            <span className="text-[9px] text-stone-500 bg-stone-900 border border-stone-850 px-2 py-0.5 rounded ml-2 font-semibold">
                              {lang === 'ar' ? font.arabicCategory : font.category}
                            </span>
                          </div>

                          <button
                            onClick={() => {
                              setMainFontId(font.id);
                              triggerToast(lang === 'ar' ? `تم تحديد الخط "${font.name}" للتحكم الرئيسي.` : `Selected "${font.name}" font.`);
                            }}
                            className={`px-2.5 py-1 text-[10px] font-black rounded-lg transition-all cursor-pointer ${
                              isMainSelected 
                                ? 'bg-amber-500 text-stone-950 font-black' 
                                : 'bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white'
                            }`}
                          >
                            {isMainSelected ? (lang === 'ar' ? 'محدد حالياً' : 'Selected') : (lang === 'ar' ? 'تطبيق خط رئيسي' : 'Select')}
                          </button>
                        </div>

                        {/* Rendering sample area */}
                        <div className="py-2 overflow-x-hidden">
                          <p 
                            className="text-2xl break-all truncate whitespace-normal" 
                            style={{ 
                              fontFamily: font.family, 
                              fontWeight: isMainSelected ? mainStyle.fontWeight : 500,
                              textTransform: mainStyle.uppercase ? 'uppercase' : 'none',
                              fontStyle: mainStyle.italic ? 'italic' : 'normal',
                              color: isMainSelected ? textColor : '#fafaf9'
                            }}
                          >
                            {mainText || 'AUDIO'}
                          </p>
                        </div>
                      </div>

                      {/* Small recommendations footer footer */}
                      <div className="border-t border-stone-900/60 pt-2 pb-1 text-[9.5px] text-stone-500">
                        <span className="font-semibold text-stone-400">{f.recommendedUse} </span>
                        <span>{lang === 'ar' ? font.arabicRecommendedUse : font.recommendedUse}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {activeTab === 'catalog' && (
            <motion.div
              key="catalog-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-stone-900 border border-stone-850 rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-800 pb-5 gap-4">
                <div>
                  <h3 className="text-base font-black text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-amber-500" />
                    {f.allFontTitle}
                  </h3>
                  <p className="text-xs text-stone-400 mt-1">{f.allFontSubtitle}</p>
                </div>

                {/* Font Search Filter */}
                <div className="flex items-center gap-2 bg-stone-950 px-3 py-2 rounded-xl border border-stone-800 w-full sm:w-[280px]">
                  <Search className="w-4 h-4 text-stone-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={f.searchFontsPlace}
                    className="bg-transparent text-white text-xs focus:outline-none w-full"
                  />
                </div>
              </div>

              {/* Taxonomy Information Column List */}
              <div className="flex flex-col gap-5 pt-6">
                {filteredFonts.map((font) => (
                  <div 
                    key={font.id}
                    onMouseEnter={() => preloadFontFamily(font.family)}
                    className="p-5 sm:p-6 bg-stone-950/60 hover:bg-stone-950 rounded-2xl border border-stone-800/80 hover:border-stone-700/80 transition-all flex flex-col md:flex-row justify-between gap-6"
                  >
                    <div className="flex-1 flex flex-col gap-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <h4 className="text-base font-black text-white font-mono">{font.name}</h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20">
                          {font.source}
                        </span>
                        <span className="text-[10px] text-stone-400 bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                          {f.fontCardCategory} {lang === 'ar' ? font.arabicCategory : font.category}
                        </span>
                      </div>

                      <p className="text-xs text-stone-300 leading-relaxed max-w-3xl">
                        {lang === 'ar' ? font.arabicDescription : font.description}
                      </p>

                      <div className="flex flex-col gap-1.5 pt-1.5">
                        <div className="text-[10.5px] text-stone-400 flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span className="font-semibold">{f.recommendedUse}</span>
                          <span className="text-stone-300">{lang === 'ar' ? font.arabicRecommendedUse : font.recommendedUse}</span>
                        </div>

                        {font.author && (
                          <div className="text-[10.5px] text-stone-500 flex items-center gap-2">
                            <span className="font-semibold text-stone-400">{f.fontCardAuthor}</span>
                            <span>{font.author}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bold rendering block right side */}
                    <div className="md:w-[260px] p-4 rounded-xl bg-stone-900 border border-stone-800/60 flex flex-col justify-between min-h-[110px]" style={{ fontFamily: font.family }}>
                      <p className="text-3xl font-sans tracking-tight text-white mb-3 break-all truncate">
                        {mainText || 'AUDIO'}
                      </p>
                      
                      <button
                        onClick={() => {
                          setMainFontId(font.id);
                          setActiveTab('studio');
                          triggerToast(lang === 'ar' ? `جاري العمل على خط "${font.name}" الآن في الأستوديو` : `Drafting active with "${font.name}" font`);
                        }}
                        className="w-full text-center py-2 bg-stone-950 hover:bg-amber-500 hover:text-stone-950 text-stone-300 text-[10.5px] font-black rounded-lg transition-all font-sans cursor-pointer"
                      >
                        {lang === 'ar' ? 'تصميم الهوية بهذا الخط' : 'Design layout with this font'}
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Aesthetic minimalistic footer */}
      <footer className="mt-auto border-t border-stone-900 bg-stone-950 py-8 text-center text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>{lang === 'ar' ? 'بيان - أستوديو أدوات مستعرض وتصميم الخطوط الفاخرة © ٢٠٢٦' : 'Bayan Typography & Custom Logo Studio Workspace © 2026'}</p>
          <div className="flex items-center gap-4 text-stone-400">
            <span className="text-[10.5px] font-mono select-none">PORT: 3000 (Vercel Ready)</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs">{lang === 'ar' ? 'آمن ومناسب للنشر' : 'Safe for production'}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
