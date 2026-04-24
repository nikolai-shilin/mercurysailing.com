import type { Locale } from 'lib/i18n';

export type ComparisonRow = {
  label: string;
  sub?: string;
  values: ['yes' | 'partial' | 'no', 'yes' | 'partial' | 'no', 'yes' | 'partial' | 'no'];
};

export type ComparisonColumn = {
  name: string;
  tagline: string;
};

export type DictType = {
  section: string;
  title: string;
  description: string;
  columns: [ComparisonColumn, ComparisonColumn, ComparisonColumn];
  rows: ComparisonRow[];
  cta: string;
};

const DICT: Record<Locale, DictType> = {
  en: {
    section: 'Why sailing',
    title: 'Sailing offsite vs. the alternatives',
    description: 'Most team offsites feel like work with a different backdrop. A sailing workation is different by design.',
    columns: [
      { name: 'Wild Workation', tagline: 'Sailing offsite' },
      { name: 'Hotel Offsite',  tagline: 'Resort / conference' },
      { name: 'Villa Rental',   tagline: 'AirBnB / retreat' },
    ],
    rows: [
      { label: 'Truly shared experience',        sub: 'Everyone lives, works, and eats together',                     values: ['yes',     'partial', 'partial'] },
      { label: 'Built-in teambuilding',          sub: 'No separate activities to organise',                           values: ['yes',     'no',      'no'     ] },
      { label: 'Environment changes daily',      sub: 'New bay, new island, new view every morning',                  values: ['yes',     'no',      'no'     ] },
      { label: 'Work infrastructure',            sub: 'Starlink Wi-Fi, dedicated work hours, desk space',             values: ['yes',     'yes',     'partial'] },
      { label: 'All logistics handled',          sub: 'Skipper, meals, berths, fuel, ports',                          values: ['yes',     'partial', 'no'     ] },
      { label: 'Physical activity included',     sub: 'Swimming, snorkelling, sailing — zero extra effort',           values: ['yes',     'partial', 'no'     ] },
      { label: 'Isolated from office routine',   sub: 'No commute, no deliveries, no random drop-ins',                values: ['yes',     'partial', 'partial'] },
      { label: 'Clear all-in cost',              sub: 'One price per person, no hidden extras',                       values: ['yes',     'no',      'no'     ] },
      { label: 'Compact group (4–8 people)',     sub: 'Every voice heard, no conference-room filler',                 values: ['yes',     'partial', 'yes'    ] },
      { label: 'Fully private — just your team', sub: 'No other guests, no shared lobby, no strangers at breakfast',  values: ['yes',     'no',      'partial'] },
      { label: 'Natural digital detox',          sub: 'Open sea reduces screen pull without a policy',                values: ['yes',     'no',      'no'     ] },
      { label: 'Daily sun & fresh air',          sub: 'Real outdoor exposure — not a hotel gym or courtyard',         values: ['yes',     'partial', 'partial'] },
      { label: 'See teammates off-screen',       sub: 'Remote teams often meet in person for the first time',         values: ['yes',     'partial', 'partial'] },
      { label: 'Employer branding signal',       sub: 'People mention this in interviews — years later',              values: ['yes',     'partial', 'no'     ] },
      { label: 'Unforgettable team story',       sub: 'Still talked about years later',                               values: ['yes',     'partial', 'no'     ] },
    ],
    cta: 'Plan your team offsite',
  },
  ru: {
    section: 'Почему яхта',
    title: 'Офсайт на яхте против альтернатив',
    description: 'Большинство офсайтов — это просто работа на другом фоне. Парусный воркейшн устроен иначе.',
    columns: [
      { name: 'Wild Workation', tagline: 'Офсайт на яхте' },
      { name: 'Отель / курорт',  tagline: 'Конференц-формат' },
      { name: 'Аренда виллы',   tagline: 'AirBnB / ретрит' },
    ],
    rows: [
      { label: 'По-настоящему общий опыт',      sub: 'Все живут, работают и едят вместе',                           values: ['yes',     'partial', 'partial'] },
      { label: 'Тимбилдинг без усилий',          sub: 'Никаких отдельных «активностей» организовывать',              values: ['yes',     'no',      'no'     ] },
      { label: 'Смена пейзажа каждый день',      sub: 'Новая бухта и новый вид каждое утро',                         values: ['yes',     'no',      'no'     ] },
      { label: 'Рабочая инфраструктура',          sub: 'Starlink Wi-Fi, рабочие часы, место для ноутбука',            values: ['yes',     'yes',     'partial'] },
      { label: 'Вся логистика включена',          sub: 'Шкипер, питание, каюты, топливо, марины',                    values: ['yes',     'partial', 'no'     ] },
      { label: 'Физическая активность',           sub: 'Плавание, снорклинг, яхтинг — без доп. усилий',              values: ['yes',     'partial', 'no'     ] },
      { label: 'Изоляция от офисной рутины',      sub: 'Нет курьеров, случайных встреч и отвлечений',                values: ['yes',     'partial', 'partial'] },
      { label: 'Прозрачная цена',                 sub: 'Одна цена на человека, без скрытых доплат',                  values: ['yes',     'no',      'no'     ] },
      { label: 'Компактная группа (4–8 чел)',     sub: 'Каждый слышит каждого, без «балласта»',                      values: ['yes',     'partial', 'yes'    ] },
      { label: 'Только ваша команда',             sub: 'Никаких чужих гостей, общего лобби и соседей по завтраку',   values: ['yes',     'no',      'partial'] },
      { label: 'Цифровой детокс сам по себе',     sub: 'Открытое море снижает тягу к экрану без всяких запретов',    values: ['yes',     'no',      'no'     ] },
      { label: 'Солнце и свежий воздух каждый день', sub: 'Настоящее море, а не двор отеля или тренажёрный зал',    values: ['yes',     'partial', 'partial'] },
      { label: 'Команда видит друг друга вживую',  sub: 'Часто — первая личная встреча для удалённой команды',       values: ['yes',     'partial', 'partial'] },
      { label: 'Сигнал о ценностях компании',     sub: 'Об этом рассказывают на собеседованиях ещё годы спустя',    values: ['yes',     'partial', 'no'     ] },
      { label: 'История, которую помнят годы',    sub: 'Лучшая история на следующем онбординге',                     values: ['yes',     'partial', 'no'     ] },
    ],
    cta: 'Спланировать офсайт команды',
  },
};

export default function getDict(locale: Locale): DictType {
  return DICT[locale] ?? DICT.en;
}
