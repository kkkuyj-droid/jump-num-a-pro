export interface Translation {
  score: string;
  highScore: string;
  gameTitle: string;
  gameDescription: string;
  languageSelect: string;
  playAgain: string;
  gameInstructions: string;
  finalScore: string;
  successCount: string;
  outOf: string;
  timeUp: string;
  correct: string;
  wellDone: string;
  startGame: string;
  listening: string;
  yourAnswer: string;
  timeRemaining: string;
}

export const translations: Record<string, Translation> = {
  ko: {
    score: "점수",
    highScore: "최고 점수",
    gameTitle: "줄넘기 하나부터 열까지 숫자 듣기 게임",
    gameDescription: "음성을 듣고 올바른 숫자 키를 눌러주세요!",
    languageSelect: "언어 선택",
    playAgain: "다시 하기",
    gameInstructions: "1-10 사이의 숫자를 듣고 키보드 숫자키로 답하세요. 5초 안에 답해야 합니다!",
    finalScore: "최종 점수",
    successCount: "성공 횟수",
    outOf: "중",
    timeUp: "시간 초과!",
    correct: "정답!",
    wellDone: "잘했어요!",
    startGame: "게임 시작",
    listening: "듣는 중...",
    yourAnswer: "당신의 답",
    timeRemaining: "남은 시간"
  },
  en: {
    score: "Score",
    highScore: "High Score",
    gameTitle: "Jump Rope Number Listening Game 1-10",
    gameDescription: "Listen to Korean audio and press the correct number key!",
    languageSelect: "Select Language",
    playAgain: "Play Again",
    gameInstructions: "Listen to numbers 1-10 in Korean and respond with keyboard number keys. You have 5 seconds to answer!",
    finalScore: "Final Score",
    successCount: "Success Count",
    outOf: "out of",
    timeUp: "Time's up!",
    correct: "Correct!",
    wellDone: "Well done!",
    startGame: "Start Game",
    listening: "Listening...",
    yourAnswer: "Your Answer",
    timeRemaining: "Time Remaining"
  },
  ja: {
    score: "スコア",
    highScore: "ハイスコア",
    gameTitle: "縄跳び数字リスニングゲーム 1-10",
    gameDescription: "韓国語の音声を聞いて正しい数字キーを押してください！",
    languageSelect: "言語選択",
    playAgain: "もう一度",
    gameInstructions: "1-10の韓国語の数字を聞いて、キーボードの数字キーで答えてください。5秒以内に答える必要があります！",
    finalScore: "最終スコア",
    successCount: "成功回数",
    outOf: "中",
    timeUp: "時間切れ！",
    correct: "正解！",
    wellDone: "よくできました！",
    startGame: "ゲーム開始",
    listening: "聞いています...",
    yourAnswer: "あなたの答え",
    timeRemaining: "残り時間"
  },
  zh: {
    score: "分数",
    highScore: "最高分",
    gameTitle: "跳绳数字听力游戏 1-10",
    gameDescription: "听韩语音频并按正确的数字键！",
    languageSelect: "选择语言",
    playAgain: "再玩一次",
    gameInstructions: "听1-10的韩语数字，用键盘数字键回答。你有5秒钟的时间回答！",
    finalScore: "最终分数",
    successCount: "成功次数",
    outOf: "中的",
    timeUp: "时间到！",
    correct: "正确！",
    wellDone: "做得好！",
    startGame: "开始游戏",
    listening: "正在听...",
    yourAnswer: "你的答案",
    timeRemaining: "剩余时间"
  },
  vi: {
    score: "Điểm số",
    highScore: "Điểm cao nhất",
    gameTitle: "Game Nhảy Dây Nghe Số 1-10",
    gameDescription: "Nghe âm thanh tiếng Hàn và nhấn phím số đúng!",
    languageSelect: "Chọn Ngôn ngữ",
    playAgain: "Chơi lại",
    gameInstructions: "Nghe các số từ 1-10 bằng tiếng Hàn và trả lời bằng phím số trên bàn phím. Bạn có 5 giây để trả lời!",
    finalScore: "Điểm cuối",
    successCount: "Số lần thành công",
    outOf: "trên",
    timeUp: "Hết giờ!",
    correct: "Đúng rồi!",
    wellDone: "Làm tốt lắm!",
    startGame: "Bắt đầu trò chơi",
    listening: "Đang nghe...",
    yourAnswer: "Câu trả lời của bạn",
    timeRemaining: "Thời gian còn lại"
  },
  es: {
    score: "Puntuación",
    highScore: "Puntuación máxima",
    gameTitle: "Juego de Saltar Cuerda y Escuchar Números 1-10",
    gameDescription: "¡Escucha el audio en coreano y presiona la tecla numérica correcta!",
    languageSelect: "Seleccionar idioma",
    playAgain: "Jugar de nuevo",
    gameInstructions: "Escucha números del 1-10 en coreano y responde con las teclas numéricas del teclado. ¡Tienes 5 segundos para responder!",
    finalScore: "Puntuación final",
    successCount: "Aciertos",
    outOf: "de",
    timeUp: "¡Se acabó el tiempo!",
    correct: "¡Correcto!",
    wellDone: "¡Bien hecho!",
    startGame: "Comenzar juego",
    listening: "Escuchando...",
    yourAnswer: "Tu respuesta",
    timeRemaining: "Tiempo restante"
  }
};

export const getTranslation = (lang: string): Translation => {
  console.log('Getting translation for language:', lang);
  const translation = translations[lang] || translations.ko;
  console.log('Translation result:', translation);
  return translation;
};