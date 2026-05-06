import type { LocalizedText } from 'lib/i18n';

export type NavItem = {
  to: string;
  label: LocalizedText;
  highlighted?: boolean;
  comment?: string;
};

const nav: NavItem[] = [
  { to: '/no-worry-offsites', label: { ru: 'Офсайты без забот', en: 'No-worry offsites' } },
  { to: '/shared-adventures', label: { ru: 'Совместные чартеры', en: 'Shared charters' } },
  { to: '/team-offsites', label: { ru: 'Командные офсайты', en: 'Team offsites' } },
  { to: '/vacations', label: { ru: 'Каникулы', en: 'Vacations' } },

  // { to: '/corporate', label: { ru: 'Корпоративно', en: 'Corporate' } },

];

const social: NavItem[] = [
  { to: 'https://t.me/+AhtlQvXYJuQzYjUy', label: { ru: 'Телеграм', en: 'Telegram' } },
  // { to: 'https://whatsapp.com/channel/0029Vb7aIw60AgWDphM0na1P/100', label: { ru: 'Вотсапп', en: 'WhatsApp' } },
  { to: 'http://linkedin.com/company/wild-workation', label: { ru: 'Линкедин', en: 'LinkedIn' } },
  { to: 'http://instagram.com/wild_workation', label: { ru: 'Инстаграм', en: 'Instagram' } },
  // { to: 'https://www.facebook.com/profile.php?id=61583672815455', label: { ru: 'Фейсбук', en: 'Facebook' } },
  { to: 'https://www.producthunt.com/products/wild-workation', label: { ru: 'Продукт Хант', en: 'Product Hunt' } },
];


const photographers: NavItem[] = [
  { to: 'https://www.instagram.com/nikita_baranovsky', label: { ru: 'Никита Барановский', en: 'Nikita Baranovsky' } },
  // { to: 'https://www.instagram.com/georgy_akimov', label: { ru: 'Георгий Акимов', en: 'Georgy Akimov' } },
  // { to: 'https://www.instagram.com/anya.semeniouk', label: { ru: 'Анна Семенюк', en: 'Anna Semeniouk' } },
  // { to: 'https://t.me/+79213457159', label: { ru: 'Елена Игнатьева', en: 'Elena Ignateva' } },
  // { to: 'https://www.facebook.com/valery.vasilevskiy', label: { ru: 'Валерий Василевский', en: 'Valery Vasilevskiy' } },
];


// const phones: NavItem[] = [
//   { to: 'tel:+79162296347', label: { ru: '+7 (916) 229-63-47', en: '+7 (916) 229-63-47' } },
//   { to: 'tel:+79165608800', label: { ru: '+7 (916) 560-88-00', en: '+7 (916) 560-88-00' } },
// ];



const tech: NavItem[] = [
  { to: '/community', label: { ru: 'Коммьюнити', en: 'Community' } },
  { to: '/contact', label: { ru: 'Как с нами связаться', en: 'How to contact us' } },
  { to: '/privacy', label: { ru: 'Политика конфиденциальности', en: 'Privacy policy' } },
  { to: '/how-it-works', label: { ru: 'Как это работает', en: 'How it works' } },
  { to: '/what-is-a-workation', label: { ru: 'Что такое воркейшн', en: 'What is a workation' } },
];

export { nav, social, tech, photographers };