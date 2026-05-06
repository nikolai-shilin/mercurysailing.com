import type { PlacesData } from 'types/data/PlaceType';

/** FAQ block key → localized question label. Order defines accordion order. */
const FAQ_BLOCKS: [string, { ru: string; en: string }][] = [
  ['whyItWorks', { ru: 'Почему это работает?', en: 'Why it works?' }],
  ['workSetup', { ru: 'Рабочий режим', en: 'Work setup' }],
  ['athleticAdvantage', { ru: 'Активности и спорт', en: 'Active & sports' }],
  ['culturalAdvantage', { ru: 'Культура', en: 'Culture' }],
  ['teamDynamics', { ru: 'Командная динамика', en: 'Team dynamics' }],
  ['teamAdvantage', { ru: 'Преимущество для команд', en: 'Team advantage' }],
  ['vibe', { ru: 'Атмосфера', en: 'Vibe' }],
  ['consideration', { ru: 'На что обратить внимание', en: 'Consideration' }],
  ['tradeoff', { ru: 'Компромиссы', en: 'Tradeoffs' }],
  ['notFor', { ru: 'Не для кого', en: 'Not for' }],
  ['catch', { ru: 'Нюансы', en: 'Catch' }],
  ['season', { ru: 'Сезон', en: 'Season' }],
];

type LocaleMap = { ru: string; en: string };
type DestRaw = {
  name: LocaleMap;
  description: LocaleMap;
  image?: string;
  bestFor?: LocaleMap;
  whyItWorks?: LocaleMap;
  workSetup?: LocaleMap;
  athleticAdvantage?: LocaleMap;
  culturalAdvantage?: LocaleMap;
  teamDynamics?: LocaleMap;
  teamAdvantage?: LocaleMap;
  vibe?: LocaleMap;
  consideration?: LocaleMap;
  tradeoff?: LocaleMap;
  notFor?: LocaleMap;
  catch?: LocaleMap;
  season?: LocaleMap;
};

function toFaqItems(dest: DestRaw): { question: LocaleMap; answer: LocaleMap }[] {
  const items: { question: LocaleMap; answer: LocaleMap }[] = [];
  for (const [key, question] of FAQ_BLOCKS) {
    const answer = (dest as unknown as Record<string, LocaleMap | undefined>)[key];
    if (answer?.ru || answer?.en) {
      items.push({ question, answer });
    }
  }
  return items;
}

function toDestination(region: LocaleMap, dest: DestRaw) {
  return {
    header: {
      section: region,
      title: dest.name,
      description: dest.description,
      image: dest.image,
    },
    faqItems: toFaqItems(dest),
  };
}

const sailingDestinations: PlacesData = {
  header: {
    section: { ru: 'Где мы работаем', en: 'Where we work' },
    title: {
      ru: 'Лучшие направления для воркейшенов под парусом',
      en: 'Best Sailing Workation Destinations',
    },
    description: {
      ru: 'Лучшие направления для воркейшенов под парусом балансируют три критических фактора: надежную связь, защищенные воды для стабильной якорной стоянки и вдохновляющее окружение, которое заряжает энергией, а не отвлекает. Вот где удаленная работа на яхте действительно работает.',
      en: "The best sailing workation destinations balance three critical factors: reliable connectivity, protected waters for stable anchoring, and inspiring surroundings that energize rather than distract. Here's where yacht-based remote work actually works.",
    },
  },

  regions: [
    {
      header: {
        section: { ru: 'Средиземноморье (апрель-октябрь)', en: 'Mediterranean (April-October)' },
      },
      destinations: [
        toDestination(
          { ru: 'Средиземноморье (апрель-октябрь)', en: 'Mediterranean (April-October)' },
          {
            name: { ru: 'Бирюзовое побережье Турции (Гёджек-Фетхие)', en: 'Turkish Riviera (Göcek-Fethiye)' },
            // image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80',
            bestFor: { ru: 'Новичков, бюджетных путешественников, тех, кому нужен стабильный интернет', en: 'First-timers, budget-conscious, stable internet needs' },
            description: {
              ru: 'Залив Фетхие — это то, что получается, когда природа проектирует идеальную среду для удаленной работы. Защищенные бухты означают, что ваши утренние Zoom-звонки не будут прерваны волнами. Покрытие 5G отличное, и вы можете использовать свой телефон как точку доступа или использовать Wi-Fi на яхте. Здесь большинство людей понимают, что воркейшены — это не компромисс между работой и путешествием, а лучше, чем и то, и другое по отдельности.',
              en: "The Gulf of Fethiye is what happens when nature designs the perfect remote work environment. Protected bays mean your morning Zoom calls won't be interrupted by waves. 5G coverage is excellent, and you can use your phone as a hotspot or use Wi-Fi on the yacht. This is where most people realize workations aren't a compromise between work and travel—they're better than either alone.",
            },
            whyItWorks: {
              ru: 'Побережье Турции между Гёджеком и Фетхие предлагает десятки якорных стоянок в пределах 30 минут друг от друга. Вы никогда не далеко от провизии, никогда вне зоны связи и никогда без мест для плавания в обеденный перерыв. Инфраструктура дружелюбна к яхтам (18+ лет чартерной индустрии), цены разумные (€1200-1500/неделя all-in), а вода остается пригодной для купания с мая по октябрь.',
              en: "Turkey's coastline between Göcek and Fethiye offers dozens of anchorages within 30 minutes of each other. You're never far from provisions, never out of connectivity range, and never short of swimming spots for lunch breaks. The infrastructure is yacht-friendly (18+ years of charter industry), prices are reasonable (€1200-1500/week all-in), and the water stays swimmable May through October.",
            },
            workSetup: {
              ru: "Утренние якорные стоянки настолько спокойны, что вы забываете, что находитесь на воде. Starlink Maritime поддерживает стабильное соединение, даже когда вы единственная яхта в отдаленной бухте. Когда нужна смена обстановки, вы в паре часов плавания от рыбацких деревень с набережными кафе, которые понимают 'мне нужен Wi-Fi и кофе на три часа'.",
              en: "Morning anchorages are calm enough to forget you're on water. Starlink Maritime maintains stable connections even when you're the only yacht in a remote bay. When you need a change of scenery, you're sailing distance from fishing villages with waterfront cafes that understand 'I need Wi-Fi and coffee for three hours.'",
            },
            catch: {
              ru: 'Лето (июль-август) приносит чартерный трафик и более высокие температуры (+30-35°C). Бронируйте май-июнь или сентябрь-октябрь для лучших условий и более низких цен.',
              en: 'Summer (July-August) brings charter traffic and higher temperatures (+30-35°C). Book May-June or September-October for better conditions and lower prices.',
            },
            season: { ru: 'Май-октябрь (оптимально: май-июнь, сентябрь-октябрь)', en: 'May-October (optimal: May-June, September-October)' },
          },
        ),
        toDestination(
          { ru: 'Средиземноморье (апрель-октябрь)', en: 'Mediterranean (April-October)' },
          {
            name: { ru: 'Ионические острова Греции (Корфу-Лефкада-Кефалония)', en: 'Greek Ionian Islands (Corfu-Lefkada-Kefalonia)' },
            // image: 'https://images.unsplash.com/photo-1533105077500-1b48681a7a76?w=1200&q=80',
            bestFor: { ru: 'Любителей культуры, гурманов, команд, желающих вечернего разнообразия', en: 'Culture lovers, foodies, teams wanting evening variety' },
            description: {
              ru: "Ионическое море — это спокойный уголок Средиземноморья, что важно, когда вы пытаетесь сосредоточиться на архитектурных решениях, стоя на якоре у Итаки. Эти острова изобрели концепцию 'работай усердно, ужинай хорошо': утро для глубокой работы в защищенных бухтах, вечера для таверн, где местных все еще больше, чем туристов.",
              en: "The Ionian is the Mediterranean's calm corner—which matters when you're trying to concentrate on architecture decisions while anchored off Ithaca. These islands invented the concept of 'work hard, dine well': mornings are for deep work in protected bays, evenings are for tavernas where locals still outnumber tourists.",
            },
            whyItWorks: {
              ru: 'Короткие переходы (2-4 часа) между островами означают больше времени на работу, меньше на плавание. Каждый остров имеет свой характер: венецианская архитектура Корфу, белые скалы Лефкады, пещера Мелиссани на Кефалонии. Разнообразие удерживает команды вовлеченными всю неделю без ощущения спешки. Инфраструктура марин надежна, когда вам нужно береговое питание или более быстрый резервный интернет.',
              en: "Short passages (2-4 hours) between islands mean more working time, less sailing time. Each island has distinct character: Corfu's Venetian architecture, Lefkada's white cliffs, Kefalonia's Melissani Cave. The variety keeps teams engaged week-long without feeling rushed. Marina infrastructure is solid when you need shore power or faster internet backup.",
            },
            workSetup: {
              ru: 'Якорные стоянки предсказуемо спокойны — Ионическое море не получает ветров Мельтеми, которые усложняют Киклады. Большинство бухт имеют резервный 4G на случай сбоев Starlink. Города доступны пешком от якорных стоянок, так что береговой коворкинг — опция для критичных встреч.',
              en: "Anchorages are predictably calm—the Ionian doesn't get the Meltemi winds that complicate the Cyclades. Most bays have 4G backup if Starlink glitches. Towns are walkable from anchorages, so shore-based coworking is an option for critical meetings.",
            },
            culturalAdvantage: {
              ru: 'Вечерняя культура здесь не создана для туристов. Вы едите там, где едят греки, наблюдаете закат там, где наблюдают греки. После недели одной и той же рутины удаленной работы дома это имеет большее значение, чем можно ожидать.',
              en: "Evening culture here isn't manufactured for tourists. You're eating where Greeks eat, watching where Greeks watch sunset. After a week of the same remote work routine at home, this matters more than you'd expect.",
            },
            season: { ru: 'Май-октябрь (лучше: май-июнь, сентябрь-октябрь, чтобы избежать пиковых толп)', en: 'May-October (best: May-June, September-October to avoid peak crowds)' },
          },
        ),
        toDestination(
          { ru: 'Средиземноморье (апрель-октябрь)', en: 'Mediterranean (April-October)' },
          {
            name: { ru: 'Далматинское побережье Хорватии (Сплит-Хвар-Корчула-Дубровник)', en: 'Croatian Dalmatian Coast (Split-Hvar-Korčula-Dubrovnik)' },
            // image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80',
            bestFor: { ru: 'Команд, любителей истории, длительных путешествий', en: 'Teams, history enthusiasts, longer voyages' },
            description: {
              ru: 'Хорватия — это место, где воркейшены встречаются с объектами Всемирного наследия ЮНЕСКО. Вы работаете в бухтах, где отдыхали римские императоры, обедаете в средневековых укрепленных городах и заканчиваете дни в маринах, которые понимают, что бизнес-путешественникам нужен быстрый интернет и тихие ночи.',
              en: "Croatia is where workations meet UNESCO World Heritage Sites. You're working in bays where Roman emperors vacationed, having lunch in medieval fortified towns, and ending days in marinas that understand business travelers need fast internet and quiet nights.",
            },
            whyItWorks: {
              ru: "Далматинское побережье — это, по сути, защищенный канал между материком и сотнями островов. Даже при ветре всегда есть защищенная якорная стоянка в пределах досягаемости. Хорватская инфраструктура марин — лучшая в Средиземноморье. Когда вашей команде нужна ночь в порту с гарантированным гигабитным интернетом и групповыми бронированиями ужинов, вы найдете это здесь.",
              en: "The Dalmatian coast is essentially a protected channel between the mainland and hundreds of islands. Even in wind, there's always a sheltered anchorage within reach. Croatian marina infrastructure is the Mediterranean's best—when your team needs a night in port with guaranteed gigabit internet and group dinner reservations, you'll find it here.",
            },
            workSetup: {
              ru: 'Больше плавания между крупными остановками (Сплит-Дубровник — 100+ морских миль) означает, что это лучше работает для поездок на неделю+, где дни переходов планируются с учетом командных расписаний. Преимущество: серьезное разнообразие. Один день вы на якоре у безмашинного Виса, на следующий день исследуете дворец Диоклетиана в Сплите, на следующий плаваете в национальном парке Млет.',
              en: "More sailing between major stops (Split to Dubrovnik is 100+ nautical miles) means this works best for week+ trips where passage days are planned around team schedules. The upside: serious variety. One day you're anchored off car-free Vis, next day exploring Diocletian's Palace in Split, next day swimming in Mljet National Park.",
            },
            teamDynamics: {
              ru: 'Инфраструктура хорошо поддерживает командные офсайты — рестораны, способные принять групповые бронирования, активности (дегустация вин на Хваре, каякинг на Висе), и достаточно городской культуры, чтобы удерживать вовлеченность членов команды, не увлекающихся парусным спортом.',
              en: "The infrastructure supports team offsites well—restaurants that can handle group reservations, activities (wine tasting in Hvar, kayaking in Vis), and enough urban culture that non-sailing team members stay engaged.",
            },
            season: { ru: 'Май-октябрь (июль-август самые загруженные, май-июнь и сентябрь предлагают лучшее соотношение цены и качества)', en: 'May-October (July-August busiest, May-June and September offer best value)' },
          },
        ),
        toDestination(
          { ru: 'Средиземноморье (апрель-октябрь)', en: 'Mediterranean (April-October)' },
          {
            name: { ru: 'Балеарские острова Испании (Майорка-Менорка-Ибица)', en: 'Spanish Balearics (Mallorca-Menorca-Ibiza)' },
            // image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
            bestFor: { ru: 'Европейских команд, сочетания вечеринок и природы, короткого времени в пути', en: 'European teams, mix of party and nature, shorter travel time' },
            description: {
              ru: "Балеары — ближайшее к Европе 'экзотическое' направление для парусного спорта. Двухчасовой перелет из большинства европейских столиц означает, что вы работаете с якорной стоянки Менорки к обеду. Каждый остров имеет раздвоение личности: Ибица — это репутация вечеринок плюс тихие бухты северного побережья, Майорка — мегаяхты в Пальме против пустых бухт на северо-западе, Менорка — это полная тишина везде.",
              en: "The Balearics are Europe's closest 'exotic' sailing destination—2-hour flight from most European capitals means you're working from a Menorca anchorage by lunch. Each island has split personality: Ibiza is party reputation meets quiet north coast coves, Mallorca is megayachts in Palma versus empty bays in the northwest, Menorca is all-quiet-all-the-time.",
            },
            whyItWorks: {
              ru: 'Инфраструктура, построенная для европейских путешественников выходного дня, переводится в отличную связь, легкое снабжение провизией и марины, когда они вам нужны. Разнообразие означает, что вы можете спроектировать именно тот воркейшен, который хотите: только природа (Менорка), природа с опцией ночной жизни (север Ибицы + город) или полугородской (Майорка).',
              en: "Infrastructure built for European weekenders translates to excellent connectivity, easy provisioning, and marinas when you need them. The diversity means you can design the exact workation you want: all-nature (Menorca), nature-with-nightlife-option (Ibiza north + town), or semi-urban (Mallorca).",
            },
            workSetup: {
              ru: 'Инфраструктура для цифровых кочевников на берегу сильна — коворкинги, кафе, оптимизированные для ноутбуков, надежный Wi-Fi в маринах. Это делает Балеары прощающими для первых воркейшенов: если что-то идет не так с системами яхты, вы никогда не далеко от плана Б.',
              en: "Digital nomad infrastructure onshore is strong—coworking spaces, cafes optimized for laptops, reliable marina Wi-Fi. This makes the Balearics forgiving for first workations: if something goes wrong with boat systems, you're never far from plan B.",
            },
            vibe: {
              ru: 'Более отполированные, чем Турция, дороже, чем Хорватия, но удобны для европейских команд, которые не могут потратить лишние дни на путешествие.',
              en: "More polished than Turkey, pricier than Croatia, but convenient for European teams who can't spare extra travel days.",
            },
            season: { ru: 'Апрель-октябрь (избегайте Ибицу в августе, если специально не хотите этой атмосферы)', en: 'April-October (avoid Ibiza in August unless you specifically want the scene)' },
          },
        ),
       /* toDestination(
          { ru: 'Средиземноморье (апрель-октябрь)', en: 'Mediterranean (April-October)' },
          {
            name: { ru: 'Французская Ривьера и Корсика', en: 'French Riviera & Corsica' },
            // image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80',
            bestFor: { ru: 'Премиум-опыта, гурманов, французской культуры', en: 'Premium experience, gourmets, French culture' },
            description: {
              ru: 'Французская Ривьера дорогая, переполненная и абсолютно того стоит, если вы хотите, чтобы ваш воркейшен ощущался так, будто вы совершаете что-то запретное. Работа с якорной стоянки у Поркероля, пока мимо проплывают суперяхты у Монако — это особый вид мотивации. Корсика предлагает французский опыт без ценника Лазурного берега — драматичные горы, встречающие бирюзовую воду, кухню с итальянским влиянием и меньше мегаяхт.',
              en: "The French Riviera is expensive, crowded, and absolutely worth it if you want your workation to feel like you're getting away with something. Working from an anchorage off Porquerolles while superyachts drift past Monaco is a specific kind of motivation. Corsica offers the French experience without the Côte d'Azur price tag—dramatic mountains meeting turquoise water, Italian-influenced cuisine, and fewer megayachts.",
            },
            whyItWorks: {
              ru: 'Если ваша работа идет хорошо, и вы хотите отпраздновать это своим окружением, это то самое место. Качество всего — еды, вина, якорных стоянок, культуры — исключительное. Корсика, в частности, предлагает больше дикой природы и меньше толп, сохраняя французские кулинарные стандарты.',
              en: "If your work is going well and you want to celebrate with your environment, this is the place. Quality of everything—food, wine, anchorages, culture—is exceptional. Corsica specifically offers more wilderness and fewer crowds while keeping the French culinary standards.",
            },
            workSetup: {
              ru: 'Связь надежная (французская инфраструктура), якорные стоянки красивы, но могут быть волнистыми (ветры Мистраль), провизия дорогая, но отличная. Лучше всего работает для небольших команд или отдельных людей, которые рассматривают местоположение как часть компенсации за удаленную работу.',
              en: "Connectivity is reliable (French infrastructure), anchorages are beautiful but can be rolly (Mistral winds), and provisioning is expensive but excellent. This works best for smaller teams or individuals who treat the location as part of the compensation for remote work.",
            },
            consideration: {
              ru: 'Бюджет €2000-2500/неделя для Лазурного берега, €1500-2000 для Корсики. Стоит того для особых случаев или когда платит компания.',
              en: 'Budget €2000-2500/week for Côte d\'Azur, €1500-2000 for Corsica. Worth it for special occasions or when your company is paying.',
            },
            season: { ru: 'Май-сентябрь (Корсика: июнь-сентябрь оптимально)', en: 'May-September (Corsica: June-September optimal)' },
          },
        ),*/
      ],
    },
    /* {
      header: {
        section: { ru: 'Карибы (ноябрь-апрель)', en: 'Caribbean (November-April)' },
      },
      destinations: [
        toDestination(
          { ru: 'Карибы (ноябрь-апрель)', en: 'Caribbean (November-April)' },
          {
            name: { ru: 'Британские Виргинские острова (Тортола-Вирджин-Горда-Йост-Ван-Дайк)', en: 'British Virgin Islands (Tortola-Virgin Gorda-Jost Van Dyke)' },
            image: 'https://images.unsplash.com/photo-1559827260-dc66d43bef33?w=1200&q=80',
            bestFor: { ru: 'Команд из США, начинающих карибских моряков, стабильных условий', en: 'US-based teams, first-time Caribbean sailors, consistent conditions' },
            description: {
              ru: 'БВО — это тренировочная площадка Карибов: защищенные воды, короткие переходы, постоянные пассатные ветры и достаточно инфраструктуры, чтобы никогда не импровизировать. Здесь американцы понимают, что могут работать из тропиков, не жертвуя продуктивностью. The Baths на Вирджин-Горда выглядит фальшиво на фотографиях и как-то еще лучше вживую.',
              en: "The BVI is the Caribbean's training ground—protected waters, short passages, consistent trade winds, and enough infrastructure that you're never improvising. This is where Americans realize they can work from the tropics without compromising productivity. The Baths at Virgin Gorda looks fake in photos and somehow better in person.",
            },
            whyItWorks: {
              ru: 'Расстояние между островами — 2-4 часа плавания, что означает, что вы можете переместиться во время обеденного перерыва и встать на якорь для послеобеденных рабочих сессий. Англоязычная зона, доллар США, развитая чартерная инфраструктура — логистика проста. Покрытие Starlink отличное, 4G работает на большинстве якорных стоянок, снабжение в городе легкое.',
              en: "Distance between islands is 2-4 hours of sailing, which means you can relocate during lunch break and be anchored for afternoon work sessions. English-speaking, US dollar zone, developed charter infrastructure—the logistics are simple. Starlink coverage is excellent, 4G works in most anchorages, and town provisioning is easy.",
            },
            workSetup: {
              ru: 'Постоянные пассатные ветры охлаждают лодки без кондиционера во время рабочих часов. Якорные стоянки переполнены, но защищены. Когда нужен береговой резерв, Роуд-Таун (Тортола) и Спэниш-Таун (Вирджин-Горда) имеют удобства. Это меньше \'приключение вне сети\' и больше \'надежная удаленная работа с пляжами\'.',
              en: "Consistent trade winds keep boats cool without AC during work hours. Anchorages are crowded but protected. When you need shore-based backup, Road Town (Tortola) and Spanish Town (Virgin Gorda) have facilities. This is less 'off-grid adventure' and more 'reliable remote work with beaches.'",
            },
            teamAdvantage: {
              ru: 'Простая логистика означает, что вы тратите меньше времени на планирование и больше на работу. Для команд, впервые тестирующих концепцию воркейшена, эта простота имеет значение.',
              en: "Easy logistics mean you spend less time planning and more time working. For first-time workation teams testing the concept, this simplicity matters.",
            },
            tradeoff: {
              ru: "Дороже, чем Средиземноморье (€1500-2000/неделя), более туристическое, меньше 'аутентичной местной культуры'. Но для американских команд, где важно время полета, это оптимально.",
              en: "More expensive than Mediterranean (€1500-2000/week), more touristy, less 'authentic local culture.' But for US teams where flight time matters, it's optimal.",
            },
            season: { ru: 'Ноябрь-апрель (избегайте май-октябрь, сезон ураганов)', en: 'November-April (avoid May-October hurricane season)' },
          },
        ),
        toDestination(
          { ru: 'Карибы (ноябрь-апрель)', en: 'Caribbean (November-April)' },
          {
            name: { ru: 'Гренадины (Сент-Винсент-Бекия-Мустик-Тобаго-Кейс)', en: 'Grenadines (St. Vincent-Bequia-Mustique-Tobago Cays)' },
            image: 'https://images.unsplash.com/photo-1567894340315-735d7c361db0?w=1200&q=80',
            bestFor: { ru: 'Опытных удаленных работников, погружения в природу, небольших групп', en: 'Experienced remote workers, nature immersion, smaller groups' },
            description: {
              ru: 'Гренадины — это то, чем были БВО до появления инфраструктуры: нетронутые, неперегруженные и требующие немного больше самодостаточности. Тобаго-Кейс — это открытка: необитаемые острова, морские черепахи, плавающие мимо вашей якорной стоянки, и ровно ноль вышек сотовой связи. Это для команд или отдельных людей, которые уже делали воркейшены и хотят меньше инфраструктуры, больше природы.',
              en: "The Grenadines are what the BVI were before infrastructure arrived—pristine, uncrowded, and requiring slightly more self-sufficiency. Tobago Cays is the postcard: uninhabited islands, sea turtles swimming past your anchorage, and precisely zero cell towers. This is for teams or individuals who've done workations before and want less infrastructure, more nature.",
            },
            whyItWorks: {
              ru: 'Когда ваша работа идет хорошо и вы хотите исчезнуть, это работает. Изоляция заставляет сосредоточиться — нечего делать, кроме как работать, плавать, читать и разговаривать с горсткой других моряков на якорной стоянке. Starlink здесь необходим; без него вы действительно вне сети. Преимущество: плавание с морскими черепахами во время обеденного перерыва переосмысливает, что означает \'баланс работы и жизни\'.',
              en: "When your work is going well and you want to disappear, this works. The isolation forces focus—there's nothing to do except work, swim, read, and talk to the handful of other sailors in the anchorage. Starlink is essential here; without it you're genuinely off-grid. The upside: swimming with sea turtles during lunch break reframes what 'work-life balance' means.",
            },
            workSetup: {
              ru: 'Более длинные переходы между островами (4-6 часов), требуется больше навыков плавания, меньше инфраструктуры для снабжения. Это работает для небольших групп (4-6 человек), которые комфортно чувствуют себя в более простых условиях. Когда вы единственная лодка на якорной стоянке, тишина абсолютная.',
              en: "Longer passages between islands (4-6 hours), more sailing skill required, less provisioning infrastructure. This works for smaller groups (4-6 people) who are comfortable with simpler conditions. When you're the only boat in an anchorage, the quiet is absolute.",
            },
            notFor: {
              ru: 'Первых воркейшенов, больших команд, тех, кому нужен ежедневный доступ к берегу или резервная инфраструктура.',
              en: "First workations, large teams, anyone who needs daily shore access or backup infrastructure.",
            },
            season: { ru: 'Декабрь-май (лучшие условия)', en: 'December-May (best conditions)' },
          },
        ),
        toDestination(
          { ru: 'Карибы (ноябрь-апрель)', en: 'Caribbean (November-April)' },
          {
            name: { ru: 'Мартиника-Сент-Люсия-Доминика', en: 'Martinique-St. Lucia-Dominica' },
            image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=1200&q=80',
            bestFor: { ru: 'Культурного разнообразия, приключений, любителей пеших прогулок', en: 'Cultural diversity, adventure, hiking enthusiasts' },
            description: {
              ru: 'Эта островная цепь предлагает самую разнообразную неделю в Карибах: французско-карибская культура на Мартинике (отличная еда, вино, язык), драматичные Питоны на Сент-Люсии (походы, серные источники, тропический лес) и дикая Доминика (реки, водопады, минимальный туризм). Если вашей команде нужна физическая активность помимо плавания, это именно то.',
              en: "This island chain offers the Caribbean's most varied week: French Caribbean culture in Martinique (excellent food, wine, language), dramatic Pitons in St. Lucia (hiking, sulfur springs, rainforest), and wild Dominica (rivers, waterfalls, minimal tourism). If your team needs physical activity beyond swimming, this delivers.",
            },
            whyItWorks: {
              ru: 'Разнообразие удерживает внимание в течение недели. Работайте по утрам, исследуйте разные острова днем. Мартиника имеет солидную инфраструктуру (технически это Франция), Сент-Люсия балансирует туризм и природу, Доминика — приключения в первую очередь. Для команд, сочетающих удаленную работу с тимбилдингом, активности встроены.',
              en: "The variety handles week-long attention spans. Work mornings, different island afternoon. Martinique has solid infrastructure (it's technically France), St. Lucia balances tourism and nature, Dominica is adventure-first. For teams mixing remote work with team building, the activities are built-in.",
            },
            workSetup: {
              ru: 'Инфраструктура варьируется по островам. Мартиника имеет связь французского уровня и марины, Доминика более базовая. Планируйте соответственно: важные встречи на якорных стоянках Мартиники, дни исследования на Доминике. Более длинные переходы между островами (6-8 часов) означают, что это лучше работает для поездок на 10+ дней.',
              en: "Infrastructure varies by island. Martinique has French-level connectivity and marinas, Dominica is more basic. Plan accordingly: important meetings in Martinique anchorages, exploration days in Dominica. Longer passages between islands (6-8 hours) mean this works better for 10+ day trips.",
            },
            culturalAdvantage: {
              ru: 'Более аутентично, чем БВО, дешевле, чем Французская Ривьера, и географически достаточно компактно, чтобы испытать несколько культур за одну неделю.',
              en: "More authentic than the BVI, less expensive than French Riviera, and geographically compact enough to experience multiple cultures in one week.",
            },
            season: { ru: 'Декабрь-май', en: 'December-May' },
          },
        ),
      ],
    },
    {
      header: {
        section: { ru: 'Индийский океан (круглый год с сезонами)', en: 'Indian Ocean (Year-round with seasons)' },
      },
      destinations: [
        toDestination(
          { ru: 'Индийский океан (круглый год с сезонами)', en: 'Indian Ocean (Year-round with seasons)' },
          {
            name: { ru: 'Сейшелы (Маэ-Праслин-Ла-Диг)', en: 'Seychelles (Mahé-Praslin-La Digue)' },
            image: 'https://images.unsplash.com/photo-1589197332882-1a3c4e0c6c7d?w=1200&q=80',
            bestFor: { ru: 'Опыта из списка желаний, фотографов, особых случаев', en: 'Bucket-list experience, photographers, special occasions' },
            description: {
              ru: 'Сейшелы — это воркейшен, который вы делаете, когда работа идет чрезвычайно хорошо, и вы хотите отпраздновать где-то, что не кажется реальным. Анс-Сурс-д\'Аржан — гранитные валуны, встречающие белый песок, встречающий бирюзовую воду — это самый фотографируемый пляж в мире не просто так. Это дорого, удаленно и абсолютно того стоит для правильной поездки.',
              en: "Seychelles is the workation you do when work is going extremely well and you want to celebrate somewhere that doesn't feel real. Anse Source d'Argent—granite boulders meeting white sand meeting turquoise water—is the world's most photographed beach for reason. This is expensive, remote, and absolutely worth it for the right trip.",
            },
            whyItWorks: {
              ru: "Когда вы говорите своей команде 'мы проводим наш ретрит по планированию Q4 на Сейшелах', мотивация улучшается. Обстановка настолько исключительна, что переосмысливает концепцию воркейшена — вы не жертвуете работой ради путешествия, вы улучшаете и то, и другое. Валле-де-Мэ (объект Всемирного наследия ЮНЕСКО, гигантские доисторические пальмы), плавание с морскими черепахами, якорные стоянки, которые выглядят созданными ИИ.",
              en: "When you tell your team 'we're doing our Q4 planning retreat in Seychelles,' motivation improves. The setting is so exceptional that it reframes the workation concept—you're not compromising on work to travel, you're upgrading both. Vallée de Mai (UNESCO World Heritage, giant prehistoric palms), swimming with sea turtles, anchorages that look AI-generated.",
            },
            workSetup: {
              ru: 'Удаленно (8-часовой перелет из Европы, 12+ из США), дорого (€2000-3000/неделя), и интернет требует Starlink (местная инфраструктура ограничена). Это работает для ежегодных ретритов, особых случаев или когда вы доказали, что воркейшены работают, и хотите премиум-версию. Инфраструктура для плавания менее развита, чем в Средиземноморье — вы действительно исследуете, а не следуете чартерным маршрутам.',
              en: "Remote (8-hour flight from Europe, 12+ from US), expensive (€2000-3000/week), and internet requires Starlink (local infrastructure is limited). This works for annual retreats, special occasions, or when you've proven workations work and want the premium version. Sailing infrastructure is less developed than Mediterranean—you're genuinely exploring, not following charter routes.",
            },
            notFor: {
              ru: 'Бюджетных воркейшенов, первого тестирования, команд, которым нужен постоянный высокоскоростной резервный интернет.',
              en: "Budget workations, first-time testing, teams that need consistent high-speed internet backup.",
            },
            season: { ru: 'Апрель-май, октябрь-ноябрь (избегайте муссонов)', en: 'April-May, October-November (avoid monsoons)' },
          },
        ),
      ],
    },
    {
      header: {
        section: { ru: 'Атлантика', en: 'Atlantic' },
      },
      destinations: [
        toDestination(
          { ru: 'Атлантика', en: 'Atlantic' },
          {
            name: { ru: 'Канарские острова (Лансароте-Фуэртевентура-Тенерифе)', en: 'Canary Islands (Lanzarote-Fuerteventura-Tenerife)' },
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
            bestFor: { ru: 'Круглогодичного плавания, культуры серфинга, вулканических пейзажей', en: 'Year-round sailing, surf culture, volcanic landscapes' },
            description: {
              ru: 'Канары — зимний вариант плавания для Европы: теплая погода, надежный ветер и драматичные вулканические пейзажи, когда Средиземноморье слишком холодное. Лансароте — сюрреалистичные вулканические ландшафты плюс винодельческие регионы, Фуэртевентура — бесконечные пляжи и виндсерфинг, Тенерифе — гора Тейде (самая высокая вершина Испании) и разнообразные микроклиматы.',
              en: "The Canaries are Europe's winter sailing option—warm weather, reliable wind, and dramatic volcanic scenery when Mediterranean is too cold. Lanzarote is surreal volcanic landscapes meets wine regions, Fuerteventura is endless beaches and wind sports, Tenerife is Mount Teide (Spain's highest peak) and diverse microclimates.",
            },
            whyItWorks: {
              ru: 'Круглогодичное плавание означает гибкое планирование. Ноябрь-апрель предлагает теплую погоду, когда Турция закрыта. Короткие перелеты из Европы (4 часа из большинства столиц) делают это доступным. Хорошая инфраструктура (Испания), более низкие цены, чем пиковый сезон в Средиземноморье, и достаточно ветра для настоящего плавания (если вашей команде это важно).',
              en: "Year-round sailing means flexible scheduling. November-April offers warm weather when Turkey is closed. Short flights from Europe (4 hours from most capitals) make it accessible. Good infrastructure (Spain), lower prices than Mediterranean peak season, and enough wind for actual sailing (if your team cares about that).",
            },
            workSetup: {
              ru: 'Надежная связь, хорошие марины, испанские стандарты инфраструктуры. Более открыто, чем Средиземноморье (атлантическая зыбь), поэтому якорные стоянки могут быть волнистыми. Лучше всего работает для команд, которые хотят активные дни после рабочих блоков (серфинг, пеший туризм, велоспорт).',
              en: "Reliable connectivity, good marinas, Spanish infrastructure standards. More exposed than Mediterranean (Atlantic swells), so anchorages can be rolly. Works best for teams who want active afternoons (surfing, hiking, cycling) after work blocks.",
            },
            athleticAdvantage: {
              ru: 'Если ваша команда активна, это оно. Волны для серфинга, горный велосипед, парапланеризм, походы — Канары — это приключенческие виды спорта с прикрепленной работой, а не работа с прикрепленными пляжами.',
              en: "If your team is active, this delivers. Surf breaks, mountain biking, paragliding, hiking—the Canaries are adventure sports with work attached, not work with beaches attached.",
            },
            season: { ru: 'Круглый год (лучше: октябрь-апрель)', en: 'Year-round (best: October-April)' },
          },
        ),
      ],
    }, */
  ],
};

export default sailingDestinations;
