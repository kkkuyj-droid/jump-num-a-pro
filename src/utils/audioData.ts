// Korean number audio variations - clear pronunciation
export const koreanNumbers = [
  {
    number: 1,
    variations: ["하나", "일", "원"]
  },
  {
    number: 2,
    variations: ["둘", "이", "투"]
  },
  {
    number: 3,
    variations: ["셋", "삼", "쓰리"]
  },
  {
    number: 4,
    variations: ["넷", "사", "포"]
  },
  {
    number: 5,
    variations: ["다섯", "오", "파이브"]
  },
  {
    number: 6,
    variations: ["여섯", "육", "식스"]
  },
  {
    number: 7,
    variations: ["일곱", "칠", "세븐"]
  },
  {
    number: 8,
    variations: ["여덟", "팔", "에이트"]
  },
  {
    number: 9,
    variations: ["아홉", "구", "나인"]
  },
  {
    number: 10,
    variations: ["열", "십", "텐"]
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