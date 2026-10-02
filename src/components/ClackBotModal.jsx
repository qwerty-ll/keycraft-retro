import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, ShoppingBag, Check } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { useTimedValue } from '../hooks/useTimedValue';
import { rub } from '../utils/format';

const byIds = (...ids) => ids.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);

const FIRST_BUILD = 'Собрать первую клавиатуру 🎹';
const QUIET = 'Тихий сетап для работы 🌙';
const THOCK = 'Хочу глубокий Thock 🔊';

const INITIAL_MESSAGES = [{
  id: 1,
  sender: 'bot',
  text: 'Привет! Я виртуальный консультант KeyCraft. Помогу выбрать свитчи, клавиатуру или аксессуары для моддинга.',
  options: [FIRST_BUILD, QUIET, 'Линейные свитчи для игр ⚡', 'Как смазывать свитчи? 🧪'],
}];

// Сценарии: ключевые слова → ответ, товары, подсказки
const RULES = [
  {
    keys: ['первую', 'собрать'],
    text: 'Для первой сборки отлично подходит формат 75% — есть стрелки и функциональные клавиши при компактных размерах:',
    products: ['kb-lumina-75'],
    options: ['Какие свитчи взять?', 'Кейкапы Retro 9009'],
  },
  {
    keys: ['тих', 'ноч', 'офис'],
    text: 'Для бесшумной работы рекомендую свитчи Durock Silent T1 и войлочный дескпад — уровень шума ниже 28 дБ:',
    products: ['sw-durock-silent', 'pad-felt-wool'],
    options: ['А шумоизоляция?', 'Подобрать кейкапы'],
  },
  {
    keys: ['thock', 'бас'],
    text: 'Для басовитого "Thock" отлично подходят линейные свитчи Gateron Oil King и пороновая изоляция:',
    products: ['sw-oil-king', 'mod-poron-sheet'],
    options: ['Промокод на скидку', 'Собрать первую клавиатуру'],
  },
  {
    keys: ['смаз', 'krytox'],
    text: 'Для смазки штока и рельсов используйте оригинальную Krytox 205g0 тонким слоем. Вот всё необходимое:',
    products: ['tool-krytox-205g0', 'tool-switch-opener'],
    options: ['Свитч-филмы', 'Готовые клавиатуры'],
  },
  {
    keys: ['промокод', 'скидк'],
    text: 'Используйте промокод VINTAGE10 в корзине для получения скидки 10% на весь заказ!',
    products: [],
    options: [FIRST_BUILD, THOCK],
  },
];

function botReply(query) {
  const q = query.toLowerCase();
  const rule = RULES.find((r) => r.keys.some((k) => q.includes(k)));
  if (rule) return { text: rule.text, products: byIds(...rule.products), options: rule.options };

  const matches = PRODUCTS.filter((p) =>
    [p.title, p.categoryName, p.description].some((f) => f.toLowerCase().includes(q))
  ).slice(0, 2);
  return matches.length > 0
    ? { text: 'Вот подходящие товары по вашему запросу:', products: matches, options: [] }
    : {
        text: 'Я могу помочь с выбором переключателей по звуку, посоветовать клавиатуру или подсказать промокод.',
        products: [],
        options: [FIRST_BUILD, QUIET, THOCK],
      };
}

export function ClackBotModal({ isOpen, onClose, onOpenProduct }) {
  const { addToCart } = useCart();
  const messagesEndRef = useRef(null);
  const [inputVal, setInputVal] = useState('');
  const [addedId, flashAdded] = useTimedValue(1800);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);

  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    return () => clearTimeout(t);
  }, [isOpen, messages]);

  if (!isOpen) return null;

  const handleSend = (textToSend = null) => {
    const query = (textToSend || inputVal).trim();
    if (!query) return;

    setMessages((prev) => [...prev, { id: Date.now(), sender: 'user', text: query }]);
    if (!textToSend) setInputVal('');
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: Date.now() + 1, sender: 'bot', ...botReply(query) }]);
    }, 300);
  };

  const handleAddDirect = (prod) => {
    addToCart(prod, 1, null, { silent: true });
    flashAdded(prod.id);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none flex items-end sm:items-center justify-center sm:justify-end sm:p-6 pointer-events-none">
      <div 
        className="fixed inset-0 bg-stone-900/40 sm:hidden pointer-events-auto"
        onClick={onClose}
      />

      <div className="relative w-full sm:w-[380px] h-[520px] max-h-[90vh] bg-white border border-stone-200 rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col justify-between overflow-hidden z-10 pointer-events-auto">

        <div className="p-3.5 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-vintage-accent flex items-center justify-center text-white">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-bold text-xs">
                <span>Консультант KeyCraft</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
              </div>
              <p className="text-[10px] text-stone-400">
                Помощь с подбором деталей
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-stone-800 text-stone-400 transition-colors"
            aria-label="Закрыть чат"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-stone-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-2.5 rounded-xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-vintage-accent text-white font-medium'
                    : 'bg-white text-stone-800 border border-stone-200'
                }`}
              >
                {msg.text}
              </div>

              {msg.products?.length > 0 && (
                <div className="w-full mt-1.5 space-y-1.5">
                  {msg.products.map((prod) => (
                    <div
                      key={prod.id}
                      className="p-2 rounded-lg border border-stone-200 bg-white flex items-center justify-between gap-2"
                    >
                      <img
                        src={prod.image}
                        alt={prod.title}
                        className="w-10 h-10 rounded object-cover border border-stone-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-semibold text-stone-900 truncate">
                          {prod.title}
                        </div>
                        <div className="text-[10px] font-mono font-bold text-vintage-accent">
                          {rub(prod.price)}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            onOpenProduct(prod.id);
                            onClose();
                          }}
                          className="btn-retro text-[10px] py-0.5 px-1.5"
                        >
                          Инфо
                        </button>
                        <button
                          onClick={() => handleAddDirect(prod)}
                          className={`btn-retro text-[10px] py-0.5 px-1.5 ${
                            addedId === prod.id
                              ? 'bg-emerald-600 text-white'
                              : 'bg-stone-900 text-white'
                          }`}
                        >
                          {addedId === prod.id ? <Check className="w-3 h-3" /> : <ShoppingBag className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {msg.options?.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1.5 max-w-[95%]">
                  {msg.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(opt)}
                      className="text-[11px] py-1 px-2 bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 rounded-md font-medium transition-colors"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-2.5 border-t border-stone-200 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-1.5"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Спросите о свитчах или сборке..."
              className="flex-1 bg-stone-50 border border-stone-300 rounded-lg py-1.5 px-2.5 text-xs font-sans focus:outline-none focus:bg-white"
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="btn-retro-primary p-1.5 text-white disabled:opacity-40"
              aria-label="Отправить"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
