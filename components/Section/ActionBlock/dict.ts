import type { Locale } from 'lib/i18n';

export type DictType = {
  gotQuestions: string;
};

export default function getDict(locale: Locale): DictType {
  return {
    gotQuestions: locale === 'en'
      ? 'Got questions? Write to us in <a href="https://t.me/wild_workation">telegram</a>, in <a href="https://www.instagram.com/wild_workation">instagram</a> or call <a href="tel:+995(591)702509">+995(591)70-25-09</a>. We will answer your question as soon as possible.'
      : 'Остались вопросы? Напишите нам в <a href="https://t.me/wild_workation">телеграм</a>, в <a href="https://www.instagram.com/wild_workation">инстаграм</a> или позвоните по телефону <a href="tel:+995(591)70-25-09">+995(591)70-25-09</a>. Мы постараемся ответить на ваш вопрос как можно скорее.',
  };
}