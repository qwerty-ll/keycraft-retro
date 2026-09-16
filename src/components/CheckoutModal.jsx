import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Printer, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import confetti from 'canvas-confetti';

export function CheckoutModal() {
  const { isCheckoutOpen, setIsCheckoutOpen, cartItems, subtotal, discountAmount, totalPrice, appliedPromo, createOrder } = useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: 'Москва',
    address: '',
    deliveryMethod: 'cdek',
    comment: '',
  });

  const [completedOrder, setCompletedOrder] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isCheckoutOpen) {
      setCompletedOrder(null);
    }
  }, [isCheckoutOpen]);

  if (!isCheckoutOpen) return null;

  const deliveryCost = subtotal >= 5000 ? 0 : 350;
  const finalSum = totalPrice + deliveryCost;

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Укажите ваше имя';
    if (!formData.phone.trim() || formData.phone.length < 7) errs.phone = 'Укажите телефон';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Укажите email';
    if (!formData.address.trim()) errs.address = 'Укажите адрес доставки';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const order = createOrder({
      ...formData,
      deliveryCost,
    });

    setCompletedOrder(order);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#C2622D', '#D97706', '#262320'],
      });
    } catch (e) {

    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 select-none animate-fadeIn">
      <div className="fixed inset-0" onClick={() => setIsCheckoutOpen(false)} />

      <div className="relative w-full max-w-xl bg-white border border-stone-200 rounded-2xl shadow-xl overflow-hidden z-10 my-6">
        
        <button
          onClick={() => setIsCheckoutOpen(false)}
          className="absolute top-3.5 right-3.5 p-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-600 transition-colors z-20"
        >
          <X className="w-4 h-4" />
        </button>

        {!completedOrder ? (
          /* Шаг 1: Форма заказа */
          <div className="p-6 space-y-5">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-vintage-accent">
                <ShieldCheck className="w-4 h-4" />
                <span>Оформление заказа</span>
              </div>
              <h2 className="text-xl font-bold font-retro text-stone-900 mt-1">
                Данные получателя
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-stone-600 mb-1">
                    ФИО *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Иван Иванов"
                    className={`w-full bg-stone-50 border rounded-lg p-2 text-xs focus:outline-none focus:bg-white ${
                      errors.fullName ? 'border-red-500' : 'border-stone-300'
                    }`}
                  />
                  {errors.fullName && <p className="text-[10px] text-red-500 font-mono mt-0.5">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-mono text-stone-600 mb-1">
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+7 (999) 123-45-67"
                    className={`w-full bg-stone-50 border rounded-lg p-2 text-xs focus:outline-none focus:bg-white ${
                      errors.phone ? 'border-red-500' : 'border-stone-300'
                    }`}
                  />
                  {errors.phone && <p className="text-[10px] text-red-500 font-mono mt-0.5">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-stone-600 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="example@mail.ru"
                    className={`w-full bg-stone-50 border rounded-lg p-2 text-xs focus:outline-none focus:bg-white ${
                      errors.email ? 'border-red-500' : 'border-stone-300'
                    }`}
                  />
                  {errors.email && <p className="text-[10px] text-red-500 font-mono mt-0.5">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-mono text-stone-600 mb-1">
                    Город
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs focus:outline-none focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-stone-600 mb-1">
                  Адрес доставки / Пункт СДЭК *
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="ул. Ленина, 10 или пункт выдачи"
                  className={`w-full bg-stone-50 border rounded-lg p-2 text-xs focus:outline-none focus:bg-white ${
                    errors.address ? 'border-red-500' : 'border-stone-300'
                  }`}
                />
                {errors.address && <p className="text-[10px] text-red-500 font-mono mt-0.5">{errors.address}</p>}
              </div>

              <div>
                <label className="block text-xs font-mono text-stone-600 mb-1.5">
                  Способ получения:
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <label className={`p-2.5 rounded-lg border cursor-pointer flex items-center gap-2 text-xs font-mono ${
                    formData.deliveryMethod === 'cdek' ? 'border-stone-900 bg-stone-50' : 'border-stone-200 bg-white'
                  }`}>
                    <input
                      type="radio"
                      name="delivery"
                      value="cdek"
                      checked={formData.deliveryMethod === 'cdek'}
                      onChange={() => setFormData({ ...formData, deliveryMethod: 'cdek' })}
                      className="accent-vintage-accent"
                    />
                    <div>
                      <div className="font-semibold">СДЭК / Курьер</div>
                      <div className="text-[10px] text-stone-500">{deliveryCost === 0 ? 'Бесплатно' : '350 ₽'}</div>
                    </div>
                  </label>

                  <label className={`p-2.5 rounded-lg border cursor-pointer flex items-center gap-2 text-xs font-mono ${
                    formData.deliveryMethod === 'pickup' ? 'border-stone-900 bg-stone-50' : 'border-stone-200 bg-white'
                  }`}>
                    <input
                      type="radio"
                      name="delivery"
                      value="pickup"
                      checked={formData.deliveryMethod === 'pickup'}
                      onChange={() => setFormData({ ...formData, deliveryMethod: 'pickup' })}
                      className="accent-vintage-accent"
                    />
                    <div>
                      <div className="font-semibold">Самовывоз</div>
                      <div className="text-[10px] text-stone-500">Мастерская (0 ₽)</div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="p-3 rounded-lg border border-stone-200 bg-stone-50 text-xs font-mono space-y-1">
                <div className="flex justify-between text-stone-600">
                  <span>Товаров:</span>
                  <span>{cartItems.length} поз.</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Скидка ({appliedPromo?.code}):</span>
                    <span>-{discountAmount.toLocaleString('ru-RU')} ₽</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-900 font-bold pt-1 border-t border-stone-200 text-sm">
                  <span>Итого к оплате:</span>
                  <span className="text-vintage-accent">{finalSum.toLocaleString('ru-RU')} ₽</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full btn-retro-primary py-2.5 text-xs flex items-center justify-center gap-1.5 font-semibold"
              >
                <span>Подтвердить заказ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        ) : (
          /* Шаг 2: Чек */
          <div className="p-6 space-y-5">
            <div className="text-center space-y-1.5">
              <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold font-retro text-stone-900">
                Заказ оформлен!
              </h2>
              <p className="text-xs font-mono text-stone-500">
                Номер заказа: <strong>{completedOrder.orderNumber}</strong>
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 p-4 rounded-xl font-mono text-xs space-y-2.5">
              <div className="text-center border-b pb-2 border-stone-200">
                <div className="font-bold text-sm">KeyCraft Retro Studio</div>
                <div className="text-[10px] text-stone-500">{completedOrder.date}</div>
              </div>

              <div className="space-y-1 divide-y divide-stone-200/60">
                {completedOrder.items.map((item, idx) => (
                  <div key={idx} className="pt-1 flex justify-between">
                    <div>
                      <div className="font-medium text-stone-900">{item.product.title}</div>
                      <div className="text-[10px] text-stone-500">
                        {item.quantity} шт. x {item.product.price} ₽
                      </div>
                    </div>
                    <div className="font-semibold text-stone-900">
                      {(item.product.price * item.quantity).toLocaleString('ru-RU')} ₽
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-stone-200 pt-2 space-y-0.5 text-right text-stone-700">
                <div>Подытог: {completedOrder.subtotal.toLocaleString('ru-RU')} ₽</div>
                {completedOrder.discountAmount > 0 && (
                  <div className="text-emerald-700">Скидка: -{completedOrder.discountAmount.toLocaleString('ru-RU')} ₽</div>
                )}
                <div>Доставка: {completedOrder.customer.deliveryCost === 0 ? 'Бесплатно' : `${completedOrder.customer.deliveryCost} ₽`}</div>
                <div className="text-sm font-bold text-stone-900 pt-1 border-t border-stone-200">
                  ИТОГО: {(completedOrder.totalPrice + completedOrder.customer.deliveryCost).toLocaleString('ru-RU')} ₽
                </div>
              </div>

              <div className="border-t border-stone-200 pt-2 text-[10px] text-stone-500">
                <div>Получатель: {completedOrder.customer.fullName} ({completedOrder.customer.phone})</div>
                <div>Адрес: {completedOrder.customer.city}, {completedOrder.customer.address}</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={handlePrint}
                className="btn-retro text-xs py-2 px-3 flex items-center justify-center gap-1.5 flex-1"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Печать чека</span>
              </button>

              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="btn-retro-primary text-xs py-2 px-3 flex-1 text-center"
              >
                В магазин
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
