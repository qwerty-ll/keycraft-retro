import { useState } from 'react';
import { X, CheckCircle2, Printer, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import confetti from 'canvas-confetti';
import { rub } from '../utils/format';

const inputClass = 'w-full bg-stone-50 border rounded-lg p-2 text-xs focus:outline-none focus:bg-white';

function Field({ label, error, type = 'text', ...props }) {
  return (
    <div>
      <label className="block text-xs font-mono text-stone-600 mb-1">{label}</label>
      <input type={type} {...props} className={`${inputClass} ${error ? 'border-red-500' : 'border-stone-300'}`} />
      {error && <p className="text-[10px] text-red-500 font-mono mt-0.5">{error}</p>}
    </div>
  );
}

export function CheckoutModal() {
  const { isCheckoutOpen, setIsCheckoutOpen, cartItems, discountAmount, totalPrice, deliveryCost, appliedPromo, createOrder } = useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: 'Москва',
    address: '',
    deliveryMethod: 'cdek',
  });

  const [completedOrder, setCompletedOrder] = useState(null);
  const [errors, setErrors] = useState({});

  if (!isCheckoutOpen) return null;

  const close = () => {
    setIsCheckoutOpen(false);
    setCompletedOrder(null);
  };

  // Самовывоз из мастерской — без оплаты доставки
  const delivery = formData.deliveryMethod === 'pickup' ? 0 : deliveryCost;

  const field = (name) => ({
    value: formData[name],
    error: errors[name],
    onChange: (e) => setFormData({ ...formData, [name]: e.target.value }),
  });

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

    setCompletedOrder(createOrder({ ...formData, deliveryCost: delivery }));
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 }, colors: ['#C2622D', '#D97706', '#262320'] });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 flex items-center justify-center p-4 select-none">
      <div className="fixed inset-0" onClick={close} />

      <div className="relative w-full max-w-xl bg-white border border-stone-200 rounded-2xl shadow-xl overflow-hidden z-10 my-6">
        
        <button
          onClick={close}
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
                <Field {...field('fullName')} label="ФИО *" placeholder="Иван Иванов" />
                <Field {...field('phone')} label="Телефон *" type="tel" placeholder="+7 (999) 123-45-67" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field {...field('email')} label="Email *" type="email" placeholder="example@mail.ru" />
                <Field {...field('city')} label="Город" />
              </div>
              <Field {...field('address')} label="Адрес доставки / Пункт СДЭК *" placeholder="ул. Ленина, 10 или пункт выдачи" />

              <div>
                <label className="block text-xs font-mono text-stone-600 mb-1.5">
                  Способ получения:
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    ['cdek', 'СДЭК / Курьер', deliveryCost ? rub(deliveryCost) : 'Бесплатно'],
                    ['pickup', 'Самовывоз', 'Мастерская (0 ₽)'],
                  ].map(([method, title, note]) => (
                    <label
                      key={method}
                      className={`p-2.5 rounded-lg border cursor-pointer flex items-center gap-2 text-xs font-mono ${
                        formData.deliveryMethod === method ? 'border-stone-900 bg-stone-50' : 'border-stone-200 bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="delivery"
                        checked={formData.deliveryMethod === method}
                        onChange={() => setFormData({ ...formData, deliveryMethod: method })}
                        className="accent-vintage-accent"
                      />
                      <div>
                        <div className="font-semibold">{title}</div>
                        <div className="text-[10px] text-stone-500">{note}</div>
                      </div>
                    </label>
                  ))}
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
                    <span>-{rub(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600">
                  <span>Доставка:</span>
                  <span>{delivery ? rub(delivery) : 'Бесплатно'}</span>
                </div>
                <div className="flex justify-between text-stone-900 font-bold pt-1 border-t border-stone-200 text-sm">
                  <span>Итого к оплате:</span>
                  <span className="text-vintage-accent">{rub(totalPrice + delivery)}</span>
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
                        {item.quantity} шт. × {rub(item.product.price)}
                      </div>
                    </div>
                    <div className="font-semibold text-stone-900">
                      {rub(item.product.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-stone-200 pt-2 space-y-0.5 text-right text-stone-700">
                <div>Подытог: {rub(completedOrder.subtotal)}</div>
                {completedOrder.discountAmount > 0 && (
                  <div className="text-emerald-700">Скидка: -{rub(completedOrder.discountAmount)}</div>
                )}
                <div>Доставка: {completedOrder.customer.deliveryCost ? rub(completedOrder.customer.deliveryCost) : 'Бесплатно'}</div>
                <div className="text-sm font-bold text-stone-900 pt-1 border-t border-stone-200">
                  ИТОГО: {rub(completedOrder.totalPrice + completedOrder.customer.deliveryCost)}
                </div>
              </div>

              <div className="border-t border-stone-200 pt-2 text-[10px] text-stone-500">
                <div>Получатель: {completedOrder.customer.fullName} ({completedOrder.customer.phone})</div>
                <div>Адрес: {completedOrder.customer.city}, {completedOrder.customer.address}</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => window.print()}
                className="btn-retro text-xs py-2 px-3 flex items-center justify-center gap-1.5 flex-1"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Печать чека</span>
              </button>

              <button
                onClick={close}
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
