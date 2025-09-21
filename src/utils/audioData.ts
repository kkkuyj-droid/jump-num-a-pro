// Korean number audio variations
export const koreanNumbers = [
  {
    number: 1,
    variations: ["하나", "한 개", "한 개 했어", "한 개 했어요"]
  },
  {
    number: 2,
    variations: ["둘", "두 개", "두 개 했어", "두 개 했어요"]
  },
  {
    number: 3,
    variations: ["셋", "세 개", "세 개 했어", "세 개 했어요"]
  },
  {
    number: 4,
    variations: ["넷", "네 개", "네 개 했어", "네 개 했어요"]
  },
  {
    number: 5,
    variations: ["다섯", "다섯 개", "다섯 개 했어", "다섯 개 했어요"]
  },
  {
    number: 6,
    variations: ["여섯", "여섯 개", "여섯 개 했어", "여섯 개 했어요"]
  },
  {
    number: 7,
    variations: ["일곱", "일곱 개", "일곱 개 했어", "일곱 개 했어요"]
  },
  {
    number: 8,
    variations: ["여덟", "여덟 개", "여덟 개 했어", "여덟 개 했어요"]
  },
  {
    number: 9,
    variations: ["아홉", "아홉 개", "아홉 개 했어", "아홉 개 했어요"]
  },
  {
    number: 10,
    variations: ["열", "열 개", "열 개 했어", "열 개 했어요"]
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