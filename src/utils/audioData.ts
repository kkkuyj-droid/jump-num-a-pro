// Korean number audio variations
export const koreanNumbers = [
  {
    number: 1,
    variations: ["하나 했어", "한 개 했어요", "하나 했습니다"]
  },
  {
    number: 2,
    variations: ["두 개 했어", "둘 했어요", "두 개 했습니다"]
  },
  {
    number: 3,
    variations: ["세 개 했어", "셋 했어요", "세 개 했습니다"]
  },
  {
    number: 4,
    variations: ["네 개 했어", "넷 했어요", "네 개 했습니다"]
  },
  {
    number: 5,
    variations: ["다섯 개 했어", "다섯 했어요", "다섯 개 했습니다"]
  },
  {
    number: 6,
    variations: ["여섯 개 했어", "여섯 했어요", "여섯 개 했습니다"]
  },
  {
    number: 7,
    variations: ["일곱 개 했어", "일곱 했어요", "일곱 개 했습니다"]
  },
  {
    number: 8,
    variations: ["여덟 개 했어", "여덟 했어요", "여덟 개 했습니다"]
  },
  {
    number: 9,
    variations: ["아홉 개 했어", "아홉 했어요", "아홉 개 했습니다"]
  },
  {
    number: 10,
    variations: ["열 개 했어", "열 했어요", "열 개 했습니다"]
  }
];

export const positiveFeeds = [
  "잘했어요!",
  "좋아요!",  
  "훌륭해요!",
  "맞았어요!", 
  "대단해요!",
  "최고예요!"
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