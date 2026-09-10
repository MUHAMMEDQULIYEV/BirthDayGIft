export type LoveCard = {
  title: string;
  detail: string;
  mark: string;
};

export const giftConfig = {
  // CHANGE ME: sevgilinin adını burada dəyiş.
  name: 'Vüsalə',
  shortDate: 'Sənin günün',
  entrance: {
    eyebrow: '',
    title: 'Hey, beautiful...',
    note: 'I made something special for you.',
    button: 'Open your birthday gift ♡',
  },
  birthday: {
    eyebrow: 'Sənin üçün',
    title: 'Bəlim, həyatım,\ngözüm mənim,',
    body: 'Səni çox sevirəm. Sənin üçün xüsusi bir şey etdim. Hədiyyəni aç. ♡\n\nSənin mənimlə keçirdiyin ilk yubileyin mübarək olsun.\nYaxşı ki, həyatımdasan.',
    signature: 'Başlayaq ♡',
  },
  loves: {
    eyebrow: 'Bir az da sən',
    title: 'Səndə sevdiyim\nşeylər ♡',
    hint: 'Kartlara toxun. Hər birinin arxasında sənə aid kiçik bir sirr var.',
    cards: [
      { title: 'Gülüşün', detail: 'Gülüşünü görəndə mən də istər-istəməz gülümsəyirəm.', mark: '01' },
      { title: 'Xeyirxahlığın', detail: 'İnsanlara qarşı olan gözəl münasibətin səni mənim üçün daha da xüsusi edir.', mark: '02' },
      { title: 'Gülməyin', detail: 'Ən adi anları belə gözəl etməyi bacarırsan.', mark: '03' },
      { title: 'Məni hiss etdirməyin', detail: 'Yanında olduğum zaman özümü görülmüş, eşidilmiş və sevilmiş hiss edirəm.', mark: '04' },
      { title: 'Kiçik vərdişlərin', detail: 'Sənin yalnız özünə aid olan kiçik vərdişlərin belə mənə dünyanın ən şirin şeyləri kimi gəlir.', mark: '05' },
      { title: 'Sadəcə... sən', detail: 'Bütün səbəblərin sonunda yenə sadəcə sən varsan. Və mən səni olduğun kimi sevirəm.', mark: '06' },
    ] satisfies LoveCard[],
  },
  gift: {
    eyebrow: 'Son bir sürpriz',
    title: 'Bir sürprizim\ndə var...',
    instruction: 'Aç ♡',
    opened: 'Sürpriz açıldı.',
    button: 'Məktuba keç',
  },
  letter: {
    eyebrow: 'Sənə bir məktubum var ♡',
    title: 'Sənə bir\nməktubum var ♡',
    paragraphs: [
      'Canımın içi,',
      'Bu məktubumda sənə nə qədər çox sevdiyimi və mənim üçün canımın içi olduğunu demək istəyirəm.',
      'Hər zaman yanında olacağam və səni çox sevəcəyəm.',
    ],
    signature: 'Mən',
  },
  final: {
    eyebrow: 'Sənin üçün hazırladığım son sözlər',
    title: 'Ad günün mübarək,',
    body: 'Ümid edirəm ki, hazırladığım bu kiçik hədiyyə sənə mənim üçün nə qədər xüsusi olduğunu xatırladar.\n\nSəni çox sevirəm. ♡\n\nSəninlə daha çox gözəl xatirələrə...',
    button: 'Yenidən bax ♡',
    footer: 'Bu hədiyyə yalnız ikimizin arasında qalsın.',
  },
} as const;