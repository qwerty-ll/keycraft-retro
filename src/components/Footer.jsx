import React from 'react';
import { Heart, ShieldCheck, Truck, Headphones, Wrench } from 'lucide-react';

export function Footer({ onSelectCategory }) {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 select-none mt-14 font-sans text-xs">
      <div className="border-b border-stone-800/80 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-vintage-accent shrink-0" />
            <div>
              <div className="font-semibold text-white">Ручная смазка</div>
              <div className="text-[11px] text-stone-400">Krytox 205g0 для свитчей</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Wrench className="w-4 h-4 text-vintage-accent shrink-0" />
            <div>
              <div className="font-semibold text-white">Контроль сборки</div>
              <div className="text-[11px] text-stone-400">Тестирование каждого кастома</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Truck className="w-4 h-4 text-vintage-accent shrink-0" />
            <div>
              <div className="font-semibold text-white">Доставка по РФ</div>
              <div className="text-[11px] text-stone-400">Бесплатно от 5 000 ₽</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Headphones className="w-4 h-4 text-vintage-accent shrink-0" />
            <div>
              <div className="font-semibold text-white">Консультация</div>
              <div className="text-[11px] text-stone-400">Помощь с подбором деталей</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          <div className="md:col-span-5 space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-vintage-accent rounded flex items-center justify-center text-white font-mono font-bold text-xs">
                KC
              </div>
              <span className="font-bold text-base text-white font-retro">
                KeyCraft Retro
              </span>
            </div>
            <p className="text-stone-400 max-w-sm text-xs leading-relaxed">
              Интернет-магазин кастомных механических клавиатур, переключателей и аксессуаров для моддинга.
            </p>
          </div>

          <div className="md:col-span-4 space-y-2">
            <div className="font-semibold text-white text-xs uppercase tracking-wider">
              Разделы каталога
            </div>
            <div className="grid grid-cols-2 gap-1 text-xs text-stone-400">
              <button onClick={() => onSelectCategory('keyboards')} className="text-left hover:text-white transition-colors">Клавиатуры</button>
              <button onClick={() => onSelectCategory('switches')} className="text-left hover:text-white transition-colors">Свитчи</button>
              <button onClick={() => onSelectCategory('keycaps')} className="text-left hover:text-white transition-colors">Кейкапы</button>
              <button onClick={() => onSelectCategory('modding')} className="text-left hover:text-white transition-colors">Шумоизоляция</button>
              <button onClick={() => onSelectCategory('tools')} className="text-left hover:text-white transition-colors">Смазка Krytox</button>
              <button onClick={() => onSelectCategory('deskpads')} className="text-left hover:text-white transition-colors">Дескпады</button>
            </div>
          </div>

          <div className="md:col-span-3 space-y-2 text-stone-400">
            <div className="font-semibold text-white text-xs uppercase tracking-wider">
              Информация
            </div>
            <p className="text-[11px]">Режим работы: 10:00 — 20:00</p>
            <p className="text-[11px]">Отправка заказов ежедневно</p>
            <p className="text-[11px]">Гарантия на компоненты 1 год</p>
          </div>

        </div>

        <div className="border-t border-stone-800 mt-8 pt-4 flex items-center justify-between text-[11px] text-stone-500">
          <div>© {new Date().getFullYear()} KeyCraft Retro. Все права защищены.</div>
          <div className="flex items-center gap-1">
            <span>Собрано для ценителей механики</span>
            <Heart className="w-3 h-3 text-vintage-accent" />
          </div>
        </div>
      </div>
    </footer>
  );
}
