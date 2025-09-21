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
  pauseGame: string;
  resetGame: string;
  musicOn: string;
  musicOff: string;
  questionCount: string;
  gameStarting: string;
  preparingNext: string;
  gameOver: string;
  seconds: string;
}

export const translations: Record<string, Translation> = {
  ko: {
    score: "점수",
    highScore: "최고 점수", 
    gameTitle: "한국어 하나부터 열까지 숫자 듣기 게임",
    gameDescription: "음성을 듣고 올바른 숫자 키를 눌러주세요!",
    languageSelect: "언어 선택",
    playAgain: "다시 하기",
    gameInstructions: "1-10 사이의 한국어 숫자를 듣고 숫자를 눌러 주세요. 5초 안에 누르세요.",
    finalScore: "최종 점수",
    successCount: "성공 횟수",
    outOf: "중",
    timeUp: "시간 초과!",
    correct: "정답!",
    wellDone: "잘했어요!",
    startGame: "게임 시작",
    listening: "듣는 중...",
    yourAnswer: "당신의 답",
    timeRemaining: "남은 시간",
    pauseGame: "게임 일시정지",
    resetGame: "게임 리셋",
    musicOn: "음악 켜기",
    musicOff: "음악 끄기",
    questionCount: "문제",
    gameStarting: "게임을 시작합니다...",
    preparingNext: "다음 문제를 준비하고 있습니다...",
    gameOver: "게임 종료!",
    seconds: "초"
  },
  en: {
    score: "Score",
    highScore: "High Score",
    gameTitle: "Korean Numbers 1-10 Listening Game",
    gameStarting: "Starting the game...",
    preparingNext: "Preparing the next question...",
    gameDescription: "Listen to Korean audio and press the correct number key!",
    languageSelect: "Select Language",
    playAgain: "Play Again",
    gameInstructions: "Listen to Korean numbers 1-10 and press the number. Answer within 5 seconds.",
    finalScore: "Final Score",
    successCount: "Success Count",
    outOf: "out of",
    timeUp: "Time's up!",
    correct: "Correct!",
    wellDone: "Well done!",
    startGame: "Start Game",
    listening: "Listening...",
    yourAnswer: "Your Answer",
    timeRemaining: "Time Remaining",
    pauseGame: "Pause Game",
    resetGame: "Reset Game", 
    musicOn: "Music On",
    musicOff: "Music Off",
    questionCount: "Question",
    gameOver: "Game Over!",
    seconds: "s"
  },
  ja: {
    score: "スコア",
    highScore: "ハイスコア",
    gameTitle: "韓国語数字リスニングゲーム 1-10",
    gameDescription: "韓国語の音声を聞いて正しい数字キーを押してください！",
    languageSelect: "言語選択",
    playAgain: "もう一度",
    gameInstructions: "1-10の韓国語の数字を聞いて数字を押してください。5秒以内に押してください。",
    finalScore: "最終スコア",
    successCount: "成功回数",
    outOf: "中",
    timeUp: "時間切れ！",
    correct: "正解！",
    wellDone: "よくできました！",
    startGame: "ゲーム開始",
    listening: "聞いています...",
    yourAnswer: "あなたの答え",
    timeRemaining: "残り時間",
    pauseGame: "ゲーム一時停止",
    resetGame: "ゲームリセット",
    musicOn: "音楽オン",
    musicOff: "音楽オフ",
    questionCount: "問題",
    gameStarting: "ゲームを開始します...",
    preparingNext: "次の問題を準備しています...",
    gameOver: "ゲーム終了！",
    seconds: "秒"
  },
  zh: {
    score: "分数",
    highScore: "最高分",
    gameTitle: "韩语数字听力游戏 1-10",
    gameDescription: "听韩语音频并按正确的数字键！",
    languageSelect: "选择语言",
    playAgain: "再玩一次",
    gameInstructions: "听1-10的韩语数字并按数字。5秒内按下。",
    finalScore: "最终分数",
    successCount: "成功次数",
    outOf: "中的",
    timeUp: "时间到！",
    correct: "正确！",
    wellDone: "做得好！",
    startGame: "开始游戏",
    listening: "正在听...",
    yourAnswer: "你的答案",
    timeRemaining: "剩余时间",
    pauseGame: "暂停游戏",
    resetGame: "重置游戏",
    musicOn: "开启音乐",
    musicOff: "关闭音乐",
    questionCount: "问题",
    gameStarting: "正在开始游戏...",
    preparingNext: "正在准备下一个问题...",
    gameOver: "游戏结束！",
    seconds: "秒"
  },
  vi: {
    score: "Điểm số",
    highScore: "Điểm cao nhất",
    gameTitle: "Game Nghe Số Tiếng Hàn 1-10",
    gameDescription: "Nghe âm thanh tiếng Hàn và nhấn phím số đúng!",
    languageSelect: "Chọn Ngôn ngữ",
    playAgain: "Chơi lại",
    gameInstructions: "Nghe số tiếng Hàn từ 1-10 và nhấn số. Trả lời trong 5 giây.",
    finalScore: "Điểm cuối",
    successCount: "Số lần thành công",
    outOf: "trên",
    timeUp: "Hết giờ!",
    correct: "Đúng rồi!",
    wellDone: "Làm tốt lắm!",
    startGame: "Bắt đầu trò chơi",
    listening: "Đang nghe...",
    yourAnswer: "Câu trả lời của bạn",
    timeRemaining: "Thời gian còn lại",
    pauseGame: "Tạm dừng game",
    resetGame: "Khởi động lại",
    musicOn: "Bật nhạc",
    musicOff: "Tắt nhạc",
    questionCount: "Câu hỏi",
    gameStarting: "Đang bắt đầu trò chơi...",
    preparingNext: "Đang chuẩn bị câu hỏi tiếp theo...",
    gameOver: "Hết game!",
    seconds: "giây"
  },
  es: {
    score: "Puntuación",
    highScore: "Puntuación máxima",
    gameTitle: "Juego de Números Coreanos 1-10",
    gameDescription: "¡Escucha el audio en coreano y presiona la tecla numérica correcta!",
    languageSelect: "Seleccionar idioma",
    playAgain: "Jugar de nuevo",
    gameInstructions: "Escucha números coreanos del 1-10 y presiona el número. Responde en 5 segundos.",
    finalScore: "Puntuación final",
    successCount: "Aciertos",
    outOf: "de",
    timeUp: "¡Se acabó el tiempo!",
    correct: "¡Correcto!",
    wellDone: "¡Bien hecho!",
    startGame: "Comenzar juego",
    listening: "Escuchando...",
    yourAnswer: "Tu respuesta",
    timeRemaining: "Tiempo restante",
    pauseGame: "Pausar juego",
    resetGame: "Reiniciar juego",
    musicOn: "Música encendida",
    musicOff: "Música apagada",
    questionCount: "Pregunta",
    gameStarting: "Iniciando el juego...",
    preparingNext: "Preparando la siguiente pregunta...",
    gameOver: "¡Juego terminado!",
    seconds: "seg"
  }
};

export const getTranslation = (lang: string): Translation => {
  return translations[lang] || translations.ko;
};
