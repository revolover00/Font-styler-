import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SelectOption {
  value: string;
  label: string;
  subLabel?: string;
  fontFamily?: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  lang?: 'ar' | 'en';
  onHoverOption?: (value: string) => void;
}

export function CustomSelect({ value, onChange, options, lang = 'ar', onHoverOption }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  // Auto-focus search input when opening
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
      setSearchQuery('');
    }
  }, [isOpen]);

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

  // Soft Arabic/English normalized fuzzy matching
  const filterOptions = () => {
    if (!searchQuery.trim()) return options;

    const query = searchQuery.trim().toLowerCase();

    // Helper functions for normalization (e.g. Arabic letter unification)
    const normalizeText = (text: string) => {
      return text
        .toLowerCase()
        .replace(/[أإآا]/g, 'ا')
        .replace(/ة/g, 'ه')
        .replace(/ى/g, 'ي')
        .replace(/[ؘؙؚّؐؑؒؓؔؕؖؗٛ things]/g, ''); // strip diacritics
    };

    const normalizedQuery = normalizeText(query);

    return options.filter((option) => {
      const optionLabel = normalizeText(option.label || '');
      const optionSubLabel = normalizeText(option.subLabel || '');
      const optionValue = normalizeText(option.value || '');

      // Score matches or verify inclusion
      return (
        optionLabel.includes(normalizedQuery) ||
        optionSubLabel.includes(normalizedQuery) ||
        optionValue.includes(normalizedQuery)
      );
    });
  };

  const filtered = filterOptions();

  return (
    <div ref={containerRef} className="relative w-full text-right" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Target Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between bg-stone-950 hover:bg-stone-900 text-white text-xs p-3.5 rounded-xl border transition-all duration-200 outline-none cursor-pointer group ${
          isOpen ? 'border-amber-500 ring-2 ring-amber-500/10' : 'border-stone-800 hover:border-stone-700'
        }`}
      >
        <div className="flex flex-col text-right">
          <span className="font-semibold text-stone-200 group-hover:text-amber-400 transition-colors">
            {selectedOption?.label}
          </span>
          {selectedOption?.subLabel && (
            <span className="text-[10px] text-stone-500 font-mono mt-0.5">
              {selectedOption.subLabel}
            </span>
          )}
        </div>
        <ChevronDown
          className={`w-4 h-4 text-stone-500 group-hover:text-amber-400 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-amber-500' : 'rotate-0'
          }`}
        />
      </button>

      {/* Floating Panel options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute z-50 w-full bg-stone-900 border border-stone-800 rounded-xl shadow-2xl overflow-hidden p-1.5 flex flex-col gap-1.5 min-w-[200px]"
          >
            {/* Intelligent Search Input */}
            <div className="relative flex items-center bg-stone-950 rounded-lg border border-stone-800 px-2.5 py-1.5 shrink-0">
              <Search className="w-3.5 h-3.5 text-stone-500 mr-1 ml-1" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'ar' ? 'بحث ذكي وسريع...' : 'Smart search...'}
                className="w-full bg-transparent text-white text-xs focus:outline-none placeholder-stone-600 text-right pr-1 pl-1"
                dir={lang === 'ar' ? 'rtl' : 'ltr'}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="p-1 hover:bg-stone-850 rounded-full text-stone-500 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* List entries */}
            <div className="max-h-[190px] overflow-y-auto overflow-x-hidden p-0.5 space-y-0.5 scrollbar-thin scrollbar-thumb-stone-800">
              {filtered.length > 0 ? (
                filtered.map((option) => {
                  const isSelected = option.value === value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        onChange(option.value);
                        setIsOpen(false);
                      }}
                      onMouseEnter={() => onHoverOption?.(option.value)}
                      style={option.fontFamily ? { fontFamily: option.fontFamily } : undefined}
                      className={`w-full text-right px-3 py-2 rounded-lg text-xs transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold'
                          : 'hover:bg-stone-950 hover:text-white border border-transparent text-stone-300'
                      }`}
                    >
                      <div className="flex flex-col text-right">
                        <span className="text-stone-200 font-medium">{option.label}</span>
                        {option.subLabel && (
                          <span className="text-[9.5px] text-stone-500 font-mono mt-0.5">
                            {option.subLabel}
                          </span>
                        )}
                      </div>
                      {isSelected && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', damping: 15 }}
                        >
                          <Check className="w-3.5 h-3.5 text-amber-500" />
                        </motion.span>
                      )}
                    </button>
                  );
                })
              ) : (
                <div className="text-center py-5 text-stone-550 text-[11px] font-sans">
                  {lang === 'ar' ? 'لا توجد خيارات مطابقة للبحث 🔍' : 'No matching results found 🔍'}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  lang?: 'ar' | 'en';
}

export function CustomCheckbox({ checked, onChange, label, lang = 'ar' }: CustomCheckboxProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center gap-3 cursor-pointer group text-right user-select-none outline-none"
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Graphical Chekbox block wrapper */}
      <div
        className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all duration-300 relative overflow-hidden shrink-0 ${
          checked
            ? 'bg-gradient-to-tr from-amber-600 to-amber-405 border-amber-500 shadow-lg shadow-amber-500/10'
            : 'border-stone-800 bg-stone-950 group-hover:border-stone-600 group-hover:bg-stone-900'
        }`}
      >
        <AnimatePresence initial={false}>
          {checked && (
            <motion.div
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ duration: 0.12 }}
              className="flex items-center justify-center text-stone-950 font-bold"
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <span className="text-xs font-semibold text-stone-300 group-hover:text-stone-100 transition-colors">
        {label}
      </span>
    </button>
  );
}
