import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, ShoppingBag, Check } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';

export function ClackBotModal({ isOpen, onClose, onQuickView }) {
  const { addToCart } = useCart();
  const messagesEndRef = useRef(null);
  const [inputVal, setInputVal] = useState('');
  const [addedItems, setAddedItems] = useState({});

  const initialMessages = [
    {
      id: 1,
      sender: 'bot',
      text: 'Привет! Я виртуальный консультант KeyCraft. Помогу выбрать свитчи, клавиатуру или аксессуары для моддинга.',
      options: [
        'Собрать первую клавиатуру 🎹',
        'Тихий сетап для работы 🌙',
        'Линейные свитчи для игр ⚡',
        'Как смазывать свитчи? 🧪',
      ],
    },
  ];

  const [messages, setMessages] = useState(initialMessages);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [isOpen, messages]);

  if (!isOpen) return null;

  const handleSend = (textToSend = null) => {
    const query = (textToSend || inputVal).trim();
    if (!query) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal('');

    setTimeout(() => {
      generateBotResponse(query);
    }, 300);
  };

  const generateBotResponse = (query) => {
    const q = query.toLowerCase();
    let replyText = '';
    let recommendedProducts = [];
    let nextOptions = [];

    if (q.includes('первую') || q.includes('собрать')) {
      replyText = 'Для первой сборки отлично подходит формат 75% — есть стрелки и функциональные клавиши при компактных размерах:';
      recommendedProducts = [PRODUCTS.find((p) => p.id === 'kb-lumina-75')];
      nextOptions = ['Какие свитчи взять?', 'Кейкапы Retro 9009'];
    } else if (q.includes('тих') || q.includes('ноч') || q.includes('офис')) {
      replyText = 'Для бесшумной работы рекомендую свитчи Durock Silent T1 и войлочный дескпад — уровень шума ниже 28 дБ:';
      recommendedProducts = [
        PRODUCTS.find((p) => p.id === 'sw-durock-silent'),
        PRODUCTS.find((p) => p.id === 'pad-felt-wool'),
      ];
      nextOptions = ['А шумоизоляция?', 'Подобрать кейкапы'];
    } else if (q.includes('thock') || q.includes('бас')) {
      replyText = 'Для басовитого "Thock" отлично подходят линейные свитчи Gateron Oil King и пороновая изоляция:';
      recommendedProducts = [
        PRODUCTS.find((p) => p.id === 'sw-oil-king'),
        PRODUCTS.find((p) => p.id === 'mod-poron-sheet'),
      ];
      nextOptions = ['Промокод на скидку', 'Собрать первую клавиатуру'];
    } else if (q.includes('смаз') || q.includes('krytox')) {
      replyText = 'Для смазки штока и рельсов используйте оригинальную Krytox 205g0 тонким слоем. Вот всё необходимое:';
      recommendedProducts = [
        PRODUCTS.find((p) => p.id === 'tool-krytox-205g0'),
        PRODUCTS.find((p) => p.id === 'tool-switch-opener'),
      ];
      nextOptions = ['Свитч-филмы', 'Готовые клавиатуры'];
    } else if (q.includes('промокод') || q.includes('скидк')) {
      replyText = 'Используйте промокод VINTAGE10 в корзине для получения скидки 10% на весь заказ!';
      nextOptions = ['Собрать первую клавиатуру 🎹', 'Хочу глубокий Thock 🔊'];
    } else {
      const matches = PRODUCTS.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      ).slice(0, 2);

      if (matches.length > 0) {
        replyText = 'Вот подходящие товары по вашему запросу:';
        recommendedProducts = matches;
      } else {
        replyText = 'Я могу помочь с выбором переключателей по звуку, посоветовать клавиатуру или подсказать промокод.';
        nextOptions = [
          'Собрать первую клавиатуру 🎹',
          'Тихий сетап для работы 🌙',
          'Хочу глубокий Thock 🔊',
        ];
      }
    }

    const botMsg = {
      id: Date.now(),
      sender: 'bot',
      text: replyText,
      products: recommendedProducts.filter(Boolean),
      options: nextOptions,
    };

    setMessages((prev) => [...prev, botMsg]);
  };

  const handleAddDirect = (prod) => {
    addToCart(prod, 1);
    setAddedItems((prev) => ({ ...prev, [prod.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [prod.id]: false }));
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none animate-fadeIn flex items-end sm:items-center justify-center sm:justify-end sm:p-6 pointer-events-none">
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
                    : 'bg-white text-stone-800 border border-stone-200 shadow-xs'
                }`}
              >
                {msg.text}
              </div>

              {msg.products && msg.products.length > 0 && (
                <div className="w-full mt-1.5 space-y-1.5">
                  {msg.products.map((prod) => (
                    <div
                      key={prod.id}
                      className="p-2 rounded-lg border border-stone-200 bg-white flex items-center justify-between gap-2 shadow-xs"
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
                          {prod.price.toLocaleString('ru-RU')} ₽
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            onQuickView(prod);
                            onClose();
                          }}
                          className="btn-retro text-[10px] py-0.5 px-1.5"
                        >
                          Инфо
                        </button>
                        <button
                          onClick={() => handleAddDirect(prod)}
                          className={`btn-retro text-[10px] py-0.5 px-1.5 ${
                            addedItems[prod.id]
                              ? 'bg-emerald-600 text-white'
                              : 'bg-stone-900 text-white'
                          }`}
                        >
                          {addedItems[prod.id] ? <Check className="w-3 h-3" /> : <ShoppingBag className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {msg.options && msg.options.length > 0 && (
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
