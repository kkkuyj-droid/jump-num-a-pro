// Korean number audio variations - only 2 clear patterns
export const koreanNumbers = [
  {
    number: 1,
    variations: ["한 개 했어", "한 개 했어요"]
  },
  {
    number: 2,
    variations: ["두 개 했어", "두 개 했어요"]
  },
  {
    number: 3,
    variations: ["세 개 했어", "세 개 했어요"]
  },
  {
    number: 4,
    variations: ["네 개 했어", "네 개 했어요"]
  },
  {
    number: 5,
    variations: ["다섯 개 했어", "다섯 개 했어요"]
  },
  {
    number: 6,
    variations: ["여섯 개 했어", "여섯 개 했어요"]
  },
  {
    number: 7,
    variations: ["일곱 개 했어", "일곱 개 했어요"]
  },
  {
    number: 8,
    variations: ["여덟 개 했어", "여덟 개 했어요"]
  },
  {
    number: 9,
    variations: ["아홉 개 했어", "아홉 개 했어요"]
  },
  {
    number: 10,
    variations: ["열 개 했어", "열 개 했어요"]
  }
];

export const positiveFeeds = [
  "좋아요!"
];

export const getRandomVariation = (number: number): string => {
  const numberData = koreanNumbers.find(n => n.number === number);
  if (!numberData) return "";
  
  const randomIndex = Math.floor(Math.random() * numberData.variations.length);
  return numberData.variations[randomIndex];
};

export const getRandomPositiveFeedback = (): string => {
  const randomIndex = Math.floor(Math.random() * positiveFeeds.length);
  return positiveFeeds[randomIndex];
};