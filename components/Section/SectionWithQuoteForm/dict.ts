import type { Locale } from 'lib/i18n';

export type DictType = {
  section: string;
  title: string;
  description: string;
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  company: string;
  companyPlaceholder: string;
  teamSize: string;
  teamSizePlaceholder: string;
  destination: string;
  destinationAny: string;
  timeframe: string;
  timeframePlaceholder: string;
  message: string;
  messagePlaceholder: string;
  submit: string;
  sending: string;
  successTitle: string;
  successText: string;
  destinations: { value: string; label: string }[];
};

export default function getDict(locale: Locale): DictType {
  const isEn = locale === 'en';
  return {
    section:             isEn ? 'For teams'                                           : 'Для команд',
    title:               isEn ? 'Get a quote for your team'                           : 'Получите предложение для вашей команды',
    description:         isEn ? "Tell us about your team and we'll put together a tailored itinerary and price. We will contact you to discuss the best possible options." : 'Расскажите о вашей команде — мы подберём маршрут и подготовим персональное предложение. Мы свяжемся с вами, чтобы обсудить все детали.',
    name:                isEn ? 'Full name'                                            : 'Имя и фамилия',
    namePlaceholder:     isEn ? 'Jane Smith'                                           : 'Иван Иванов',
    email:               'Email',
    emailPlaceholder:    isEn ? 'jane@company.com'                                     : 'ivan@company.com',
    company:             isEn ? 'Company (optional)'                                   : 'Компания (необязательно)',
    companyPlaceholder:  isEn ? 'Acme Corp'                                            : 'Название компании',
    teamSize:            isEn ? 'Team size'                                            : 'Размер команды',
    teamSizePlaceholder: isEn ? 'e.g. 6'                                              : 'например, 6',
    destination:         isEn ? 'Preferred destination'                                : 'Предпочтительное направление',
    destinationAny:      isEn ? 'Any destination'                                      : 'Любое направление',
    timeframe:           isEn ? 'Preferred timeframe'                                  : 'Примерные сроки',
    timeframePlaceholder:isEn ? 'e.g. July–August 2026'                               : 'например, июль–август 2025',
    message:             isEn ? 'Message (optional)'                                   : 'Сообщение (необязательно)',
    messagePlaceholder:  isEn ? 'Goals, questions, special requirements…'              : 'Цели, вопросы, особые пожелания…',
    submit:              isEn ? 'Send request'                                          : 'Отправить запрос',
    sending:             isEn ? 'Sending…'                                             : 'Отправляем…',
    successTitle:        isEn ? 'Request sent!'                                        : 'Запрос отправлен!',
    successText:         isEn ? "We'll get back to you within 24 hours."              : 'Мы ответим в течение 24 часов.',
    destinations: [
      { value: 'turkey',      label: isEn ? 'Turkey'      : 'Турция' },
      { value: 'greece',      label: isEn ? 'Greece'      : 'Греция' },
      { value: 'croatia',     label: isEn ? 'Croatia'     : 'Хорватия' },
      { value: 'montenegro',  label: isEn ? 'Montenegro'  : 'Черногория' },
      { value: 'thailand',    label: isEn ? 'Thailand'    : 'Таиланд' },
    ],
  };
}
