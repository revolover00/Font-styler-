import { FontItem, FontCategory } from './types';

const EXTRA_SERIFS: string[] = [
  "Lora", "Merriweather", "PT Serif", "Noto Serif", "Spectral", "Cardo", "Alegreya", "Domine", 
  "Libre Baskerville", "Oranienbaum", "Amiri", "Cormorant", "Cormorant Infant", "Cormorant SC", 
  "Cormorant Upright", "Sorts Mill Goudy", "Alice", "Lustria", "Radley", "Goudy Bookletter 1911", 
  "Judson", "Belgrano", "Poly", "Volkhov", "Adamina", "Tinos", "Rozha One", "Yeseva One", 
  "Abril Fatface", "Noto Serif Display", "Libre Bodoni", "Castoro", "Castoro Titling", "Italiana", 
  "Della Respira", "Manuale", "Faustina", "Arapey", "DM Serif Display", "Diphylleia", 
  "Playfair Display SC", "Vollkorn", "IM Fell English", "Amiri Quran", "Average", 
  "Balthazar", "Bentham", "Buenard", "Caladea", "Cantata One", "Coustard", "Crete Round", "Fenix", 
  "Gabriela", "Gelasio", "Gilda Display", "Glegoo", "Gupter", "Gurajada", "Halant", "Headland One", 
  "Inika", "Jacques Francois", "Josefin Slab", "Kameron", "Katibeh", "Kotta One", "Kurale", "Ledger", 
  "Libre Caslon Display", "Libre Caslon Text", "Linden Hill", "Maitree", "Marcellus", "Marcellus SC", 
  "Markazi Text", "Mate", "Mate SC", "Modern Antiqua", "Montaga", "Noticia Text", "Old Standard TT", 
  "Otomanopee One", "PT Serif Caption", "Padauk", "Padyakke", "Petrona", "Philosopher", "Piazzolla", 
  "Podkova", "Port Lligat Slab", "Pridi", "Prociono", "Quattrocento", "Rasa", "Rokkitt", "Rosarivo", 
  "Rufina", "Ruluko", "Slabo 13px", "Slabo 27px", "Suranna", "Suravaram", "Suthon", "Texturina", 
  "Trirong", "Trykker", "Vesper Libre", "Yrsa"
];

const EXTRA_SANS: string[] = [
  "Inter", "Plus Jakarta Sans", "DM Sans", "Montserrat", "Outfit", "Space Grotesk", "Syne", "Unbounded", 
  "Manrope", "Archivo", "Urbanist", "Lexend", "Epilogue", "Be Vietnam Pro", "Sora", "Spline Sans", 
  "Hanken Grotesk", "Figtree", "Readex Pro", "Schibsted Grotesk", "Albert Sans", "Onest", 
  "Archivo Expanded", "Archivo Narrow", "Archivo Black", "Oswald", "Heebo", "Work Sans", "Questrial", 
  "Josefin Sans", "Comfortaa", "Quicksand", "Nunito", "Nunito Sans", "Kanit", "Rubik", "Varela Round", 
  "Monda", "Chivo", "Commissioner", "Barlow", "Barlow Condensed", "Barlow Semi Condensed", "Public Sans", 
  "Sen", "Jost", "League Spartan", "Tenor Sans", "Syncopate", "Julius Sans One", "Federo", 
  "Pathway Gothic One", "Metrophobic", "Carme", "Exo", "Exo 2", "Rajdhani", "Teko", "Secular One", 
  "Michroma", "Carter One", "Fredoka", "Fredoka One", "Concert One", "Sigmar", "Paytone One", "Sniglet", 
  "Baloo 2", "Bungee", "Bungee Inline", "Abel", "Acme", "Alata", "Almarai", "Antic", "Antic Didone", 
  "Antic Slab", "Anton", "Asap", "Asap Condensed", "Assistant", "Aileron", "Alegreya Sans", 
  "Alegreya Sans SC", "Amiko", "Andika", "Arimo", "Arya", "Average Sans", "B612", "Biryani", "Cabin", 
  "Cabin Condensed", "Cairo", "Cairo Play", "Cantarell", "Catamaran", "Changa", "Cuprum", "Dosis", 
  "Fira Sans", "Fira Sans Condensed", "Gothic A1", "Hind", "Hind Guntur", "Hind Madurai", "Hind Siliguri", 
  "Hind Vadodara", "IBM Plex Sans", "IBM Plex Sans Arabic", "IBM Plex Sans Condensed", "Imprima", "Inder", 
  "Inria Sans", "Jaldi", "Krona One", "Lato", "Mako", "Merriweather Sans", "Molengo", 
  "Nobile", "Noto Sans", "Noto Sans Arabic", "Noto Sans Display", "PT Sans", "PT Sans Caption", 
  "PT Sans Narrow", "Rambla", "Red Hat Display", "Red Hat Text", "Roboto", "Roboto Condensed", "Roboto Flex", 
  "Sarabun", "Sintony", "Source Sans 3", "Taviraj", "Ubuntu", "Ubuntu Condensed"
];

const EXTRA_MONO: string[] = [
  "JetBrains Mono", "Fira Code", "Share Tech Mono", "Space Mono", "Source Code Pro", "Courier Prime", 
  "Inconsolata", "Anonymous Pro", "IBM Plex Mono", "Roboto Mono", "Ubuntu Mono", "Oxygen Mono", "PT Mono", 
  "Nanum Gothic Coding", "Cutive Mono", "Major Mono Display", "VT323", "Nova Mono", "Share Tech", 
  "Overpass Mono", "DM Mono", "Sometype Mono", "Red Hat Mono", "Victor Mono", "Lekton", "Cousine", 
  "Chivo Mono", "Fragment Mono", "Intel One Mono", "Martian Mono", "Noto Sans Mono", "Nova Cut", 
  "Nova Flat", "Nova Oval", "Nova Round", "Nova Slim", "Nova Square", "Spline Sans Mono", "Syne Mono", 
  "Xanh Mono", "Azeret Mono", "Comic Mono", "Input Sans", "Monofur", "ProFont", "Input Mono", "Dina", 
  "Hermit", "Hack", "Monoid", "Aura Mono", "Carbon Mono", "Code New Roman", "DejaVu Mono", 
  "Everson Mono", "Fixedsys", "FreeMono", "Glass TTY", "Go Mono", "Iosevka", "Lilex", "Lucida Console", 
  "Menlo", "Monaco", "Recursive", "SF Mono", "Terminal", "Terminus", "WhiteRabbit", "Ubuntu Monospace"
];

const EXTRA_SCRIPT: string[] = [
  "Great Vibes", "WindSong", "Sacramento", "Pacifico", "Birthstone Bounce", "Alex Brush", "Rochester", 
  "Allura", "Pinyon Script", "Parisienne", "Tangerine", "Playball", "Ms Madi", "Whisper", 
  "Monsieur La Doulaise", "Imperial Script", "Mea Culpa", "Fleur De Leah", "Ruthrysis", "Cherish", 
  "Shalimar", "Allison", "Corinthia", "Water Brush", "Herr Von Muellerhoff", "Mrs Saint Delafield", 
  "Petit Formal Script", "Italianno", "Clicker Script", "Grand Hotel", "Dancing Script", "Kaushan Script", 
  "Yellowtail", "Cookie", "Lobster", "Lobster Two", "Satisfy", "Aguafina Script", "Aladin", "Amita", 
  "Arizonia", "Bad Script", "Bahiana", "Barrio", "Bilbo", "Bilbo Swash Caps", "Bonbon", "Condiment", 
  "Courgette", "Damion", "Devonshire", "Engagement", "Euphoria Script", "Freehand", "Gochi Hand", 
  "Handlee", "Indie Flower", "Island Moments", "Jim Nightshade", "Kristi", "Lakki Reddy", "League Script", 
  "Leckerli One", "Life Savers", "Lovers Quarrel", "Marck Script", "Meddon", "Merienda", "Merienda One", 
  "Milonga", "Molle", "Montez", "Mr Bedfort", "Mr Dafoe", "Mr De Haviland", "Niconne", "Norican", 
  "Nothing You Could Do", "Oooh Baby", "Over the Rainbow", "Pecita", "Plaster", "Princess Sofia", 
  "Quintessential", "Rancho", "Redressed", "Reenie Beanie", "Rouge Script", "Sassy Frass", "Sevillana", 
  "Shadows Into Light", "Shadows Into Light Two", "Short Stack", "Signika", "Sofia", "Sonsie One", 
  "Stalemate", "Sue Ellen Francisco", "Sunshiney", "The Girl Next Door", "Vibur", "Yesteryear", "Zeyada"
];

const EXTRA_DISPLAY: string[] = [
  "Archivo Black", "Anton", "Righteous", "Oswald", "Syne", "Unbounded", "Abril Fatface", "Alfa Slab One", 
  "Cinzel Decorative", "Bungee", "Bungee Shade", "Lalezar", "Carter One", "Paytone One", "Russo One", 
  "Secular One", "Sigmar", "Platypi", "Clash Display", "Black Ops One", "Fredoka One", "Luckiest Guy", 
  "Titan One", "Passion One", "Patua One", "Bowlby One SC", "Squada One", "Skranji", "Creepster", 
  "Limelight", "Vast Shadow", "Megrim", "Eater", "Fascinate", "Fascinate Inline", "Faster One", 
  "Federant", "Fredericka the Great", "Frijole", "Geostar Fill", "Glass Antiqua", "Gorditas", "Graduate", 
  "Gravitas One", "Griffy", "Gruppo", "Happy Monkey", "Henny Penny", "Iceland", "Jacques Francois Shadow", 
  "Jolly Lodger", "Kenia", "Keania One", "Kelly Slab", "Kranky", "Life Savers", "Macondo", 
  "Macondo Swash Caps", "Metal Mania", "Metamorphous", "Miniver", "Monoton", "Mrs Sheppards", "New Rocker", 
  "Nixie One", "Nova Cut", "Nova Flat", "Nova Mono", "Nova Oval", "Nova Round", "Nova Slim", 
  "Nova Square", "Offside", "Oleo Script", "Oleo Script Swash Caps", "Oregano", "Original Surfer", 
  "Overlock SC", "Piedra", "Pirata One", "Plaster", "Playfair Display SC", "Poller One", "Preahvihear", 
  "Prosto One", "Purple Purse", "Ranchers", "Redressed", "Revalia", "Rye", "Seymour One", "Shojumaru", 
  "Shrikhand", "Siemreap", "Skranji", "Slackey", "Smokum", "Sniglet", "Snowburst One", "Sonsie One", 
  "Spirax", "Stalinist One", "Stardos Clay", "Stoke", "Sue Ellen Francisco", "Supermercado One", 
  "Trade Winds", "Trochut", "Tulpen One", "UnifrakturCook", "UnifrakturMaguntia", "Vampiro One", 
  "Vast Shadow", "Vibur", "Voces", "Wallpoet", "Warnes", "Wellfleet", "Zilla Slab Highlight"
];

const mapExtraFont = (name: string, category: FontCategory): FontItem => {
  const id = name.toLowerCase().replace(/ /g, '-');
  let family = `"${name}", sans-serif`;
  let arabicCategory = 'خط هندسي عصريّ';
  let description = '';
  let arabicDescription = '';
  let recommendedUse = '';
  let arabicRecommendedUse = '';

  if (category === 'serif') {
    family = `"${name}", serif`;
    arabicCategory = 'خط كلاسيكي فاخر (سيريف)';
    description = `An exceptionally elegant and detailed editorial serif typeface, carrying refined weight and classic prestige.`;
    arabicDescription = `خط كلاسيكي أنيق للغاية للتصاميم الفاخرة يضفي فخامة تاريخية وجمالاً فائقاً على العناوين.`;
    recommendedUse = `High-end editorial headings, luxury branding, fine dining menus, and prestige titles.`;
    arabicRecommendedUse = `العناوين العريضة الفاخرة، العلامات التجارية لقطاع الأزياء الراقية، وقوائم الطعام الفخمة.`;
  } else if (category === 'sans-serif') {
    family = `"${name}", sans-serif`;
    arabicCategory = 'خط سنز معاصر وبسيط';
    description = `A beautifully balanced geometric sans-serif characterized by precision scaling and high-end modern layout minimalism.`;
    arabicDescription = `خط هندسي نقي يتميز بالبساطة القصوى والتناسق المعماري المتقن، مثالي تماماً للواجهات العصرية.`;
    recommendedUse = `Sleek UI copy, tech websites, digital products, and contemporary high-end minimalist design.`;
    arabicRecommendedUse = `نصوص الواجهات النظيفة، المواقع التقنية المبتكرة، والشعارات الرقمية العصرية الصافية.`;
  } else if (category === 'monospace') {
    family = `"${name}", monospace`;
    arabicCategory = 'خط مونو تقني متناسق';
    description = `A carefully spaced and symmetrical monospaced font depicting a balance of raw industrial luxury and digital tech.`;
    arabicDescription = `خط تكنولوجي متناسق بأبعاد رياضية موحدة يمنح العمل جمالية واضحة وطبيعة تقنية فاخرة ومتطورة.`;
    recommendedUse = `System telemetry readouts, raw industrial labels, metadata labels, and futuristic interfaces.`;
    arabicRecommendedUse = `ملصقات البيانات الفنية الدقيقة، الشارات الصناعية الحديثة، والرموز والوسوم الرقمية العصرية.`;
  } else if (category === 'script') {
    family = `"${name}", cursive`;
    arabicCategory = 'خط يد انسيابي ساحر';
    description = `A flowing and highly personalized calligraphic handwriting script displaying signature boutique elegance.`;
    arabicDescription = `خط كاليغرافي انسيابي بلمسات فنية بالغة الرقة يحاكي خطوط اليد والتواقيع والشعارات الحصرية الرائعة.`;
    recommendedUse = `Feminine fashion brands, bespoke packaging, signature styles, and delicate cosmetics labeling.`;
    arabicRecommendedUse = `العلامات التجارية لمنتجات التجميل، هويات التواقيع الفردية المحترفة، ومستحضرات العطور الفاخرة.`;
  } else {
    // display
    family = `"${name}", sans-serif`;
    arabicCategory = 'خط عرض قوي وجريء';
    description = `A dominant, high-status display font configured for maximal typographic contrast and premium modern weight.`;
    arabicDescription = `خط عرض عريض وقوي يتمتع بحضور بصري ملفت واستثنائي، مصمم ليكسب العناوين وزناً لافتاً.`;
    recommendedUse = `Avant-garde cover posters, aggressive streetwear labels, and premium bold graphic headlines.`;
    arabicRecommendedUse = `عناوين التصاميم الجريئة، ملصقات الفنون البصرية المعاصرة، والشارات والملابس الحضرية الفخمة.`;
  }

  return {
    id,
    name,
    arabicCategory,
    category,
    family,
    source: 'Google Fonts',
    description,
    arabicDescription,
    recommendedUse,
    arabicRecommendedUse
  };
};

export const getExtraFonts = (excludeIds: Set<string>): FontItem[] => {
  const list: FontItem[] = [];
  const addedIds = new Set<string>();

  const processCategory = (names: string[], category: FontCategory) => {
    names.forEach(name => {
      const f = mapExtraFont(name, category);
      if (!excludeIds.has(f.id) && !addedIds.has(f.id)) {
        list.push(f);
        addedIds.add(f.id);
      }
    });
  };

  processCategory(EXTRA_SERIFS, 'serif');
  processCategory(EXTRA_SANS, 'sans-serif');
  processCategory(EXTRA_MONO, 'monospace');
  processCategory(EXTRA_SCRIPT, 'script');
  processCategory(EXTRA_DISPLAY, 'display');

  return list;
};
