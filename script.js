const startButton = document.getElementById("start_button");
const startScreen = document.getElementById("start_screen");
const selectScreen = document.getElementById("select_screen");
const messageBox = document.getElementById("message_box");

let typingTimer = null;

const characterConfig = {
  oedipus: {
    roomScreen: "oedipus_room_screen",
    dialogueText: "oedipus_dialogue_text",
    characterImage: "oedipus_character_image",
    hpFill: "oedipus_hp_fill",
    painFill: "oedipus_pain_fill",
    questionFill: "oedipus_question_fill",
    choiceScreen: "oedipus_ending_choice_screen",
    ending1Screen: "oedipus_ending1_screen",
    ending2Screen: "oedipus_ending2_screen",
    entryMessage: "Entering Oedipus' room...",
    entryLine: "오이디푸스의 방이다...",
    baseImage: "oe_ovl.png",
    trial1Image: "oe_ovl1.png",
    trial2Image: "oe_ovl2.png",
    objectTexts: {
      crown: "보아라, 왕관이다! 처음부터 내 머리 위에 놓이기 위해 만들어진 것 같지 않느냐? 흠, 이렇게 완벽히 어울리는 걸 보면 태생이 왕인 게 분명하다.",
      sword: "이 검의 날카로움은 곧 나의 결단이다! 내가 내리는 판단은 주저함이 없다. 진실이 어디에 숨든, 나는 베어내듯 밝혀낼 것이다.",
      eye: "나는 진실을 마주하고 말 것이다! 그런데... 왜 다들 나를 쳐다보는 것 같지? 아하하, 내가 너무 대단해서겠지.",
      spikes: "나의 예리함은 아무도 피해갈 수 없도다! 거짓도, 죄도, 숨은 자도 모두 꿰뚫어 버릴 테니.",
      mirror: "흠, 아주 멋진 왕이 서 있군. 태생이 왕이야. 이 얼굴을 보고도 누가 의심하겠느냐?"
    },
    trial1Line: "I must bring what is dark to light.",
    trial2Line: "O God! It has all come true. All the prophecies.",
    trial1Stats: { hp: 90, pain: 10, question: 20 },
    trial2Stats: { hp: 30, pain: 98, question: 50 }
  },

  willy: {
    roomScreen: "willy_room_screen",
    dialogueText: "willy_dialogue_text",
    characterImage: "willy_character_image",
    hpFill: "willy_hp_fill",
    painFill: "willy_pain_fill",
    questionFill: "willy_question_fill",
    choiceScreen: "willy_ending_choice_screen",
    ending1Screen: "willy_ending1_screen",
    ending2Screen: "willy_ending2_screen",
    entryMessage: "Entering Willy's room...",
    entryLine: "윌리 로먼의 방이다...",
    baseImage: "willy_ovl.png",
    trial1Image: "willy_ovl1.png",
    trial2Image: "willy_ovl2.png",
    objectTexts: {
      money: "돈은 곧 가능성이지. 아직 끝난 게 아니야. 조금만 더 가면 내가 원했던 삶이 손에 들어올 거다.",
      phone: "전화는 반드시 울릴 거야. 사람들은 날 기억하니까. 아직도 날 찾는 이들이 분명히 있어.",
      map: "길은 많아. 내가 잘못 든 길이라고 누가 단정하지? 아직 다른 도시, 다른 기회, 다른 성공이 남아 있어.",
      medal: "이건 내가 그냥 평범한 사람이 아니라는 증거다. 사람은 크게 되어야 해. 눈에 띄어야 하고, 기억되어야 하지.",
      mirror: "봐, 저기 서 있는 사람은 아직도 성공할 수 있는 사람이야. 아직 늦지 않았어."
    },
    trial1Line: "Be liked and you will never want.",
    trial2Line: "I am not a dime a dozen! I am Willy Loman, and you are Biff Loman!",
    trial1Stats: { hp: 85, pain: 18, question: 20 },
    trial2Stats: { hp: 20, pain: 95, question: 45 }
  },

  sy: {
    roomScreen: "sy_room_screen",
    dialogueText: "sy_dialogue_text",
    characterImage: "sy_character_image",
    hpFill: "sy_hp_fill",
    painFill: "sy_pain_fill",
    questionFill: "sy_question_fill",
    choiceScreen: "sy_ending_choice_screen",
    ending1Screen: "sy_ending1_screen",
    ending2Screen: "sy_ending2_screen",
    entryMessage: "Entering Yoon's room...",
    entryLine: "윤의 방이다...",
    baseImage: "sy_ovl.gif",
    trial1Image: "sy_ovl1.gif",
    trial2Image: "sy_ovl2.gif",
    objectTexts: {
      mirror: "언제나 용모를 확인해야 하니까 거울은 필수야. 속내라는 건 언제나 외모로든 표정으로든 티가 나는 법이거든.",
      water: "축축해지면 몸이 무거워질 테지만, 아직 젖을 정도는 아니니까 괜찮아. 이 정도 물은 어느 방에나 있겠지?",
      eye: "눈은 마음의 창이야. 자꾸만 이것들이 나를 쳐다보는 듯할 때도 있지만, 그만큼 사람들의 시선과 그에 담기는 것들은 중요하다는 거겠지.",
      locks: "이 방은 온전히 나만의 공간이야. 아무도 못 들어와. 그 누구도 절대 들어올 수 없는 나만의 공간이어야만 해. 이 정도 자물쇠면 충분하겠지?",
      underwear: "남들에게 보이지 않는 순간에도 조심해야 해. 내 자신에게 떳떳할 수 있어야만 해. 그러기만 하면 나도 내 방도 깨끗하게 유지될 거야."
    },
    trial1Line: "I can hear someone knocking on the door... It's okay... I am big and tough enough to ignore it. I am... I... OH!!! THE WATER!",
    trial2Line: "I cannot stand the kncoking sound anymore...! It is getting louder and LOUDER. BUT I AM NOT OPENING THE DOOR. I WOULD RATHER DROWN IN MY ROOM!",
    trial1Stats: { hp: 75, pain: 28, question: 24 },
    trial2Stats: { hp: 40, pain: 70, question: 65 }
  }
};

function typeTextFor(targetId, text, speed = 28) {
  const dialogueText = document.getElementById(targetId);

  if (typingTimer) {
    clearInterval(typingTimer);
    typingTimer = null;
  }

  dialogueText.textContent = "";
  let index = 0;

  typingTimer = setInterval(() => {
    dialogueText.textContent += text[index];
    index++;

    if (index >= text.length) {
      clearInterval(typingTimer);
      typingTimer = null;
    }
  }, speed);
}

function resetBars(key) {
  const config = characterConfig[key];
  document.getElementById(config.hpFill).style.width = "100%";
  document.getElementById(config.painFill).style.width = "0%";
  document.getElementById(config.questionFill).style.width = "0%";
}

function applyStats(key, stats) {
  const config = characterConfig[key];
  document.getElementById(config.hpFill).style.width = `${stats.hp}%`;
  document.getElementById(config.painFill).style.width = `${stats.pain}%`;
  document.getElementById(config.questionFill).style.width = `${stats.question}%`;
}

function hideAllCharacterScreens() {
  Object.values(characterConfig).forEach((config) => {
    document.getElementById(config.roomScreen).classList.remove("active");
    document.getElementById(config.choiceScreen).classList.remove("active");
    document.getElementById(config.ending1Screen).classList.remove("active");
    document.getElementById(config.ending2Screen).classList.remove("active");
  });

  const humanAnswerScreen = document.getElementById("human_answer_screen");
  if (humanAnswerScreen) {
    humanAnswerScreen.classList.remove("active");
  }
}

startButton.addEventListener("click", function () {
  startScreen.classList.remove("active");
  selectScreen.classList.add("active");
});

function showMessage(text) {
  messageBox.textContent = text;
  messageBox.classList.add("show");

  setTimeout(() => {
    messageBox.classList.remove("show");
  }, 600);
}

function enterRoom(key) {
  const config = characterConfig[key];
  showMessage(config.entryMessage);

  setTimeout(() => {
    goToRoom(key);
  }, 600);
}

function goToRoom(key) {
  const config = characterConfig[key];

  hideAllCharacterScreens();
  selectScreen.classList.remove("active");
  document.getElementById(config.roomScreen).classList.add("active");

  document.getElementById(config.characterImage).src = config.baseImage;
  resetBars(key);
  typeTextFor(config.dialogueText, config.entryLine, 24);
}

function backToSelect() {
  hideAllCharacterScreens();
  selectScreen.classList.add("active");
}

function showObjectText(key, objectName) {
  const config = characterConfig[key];
  document.getElementById(config.characterImage).src = config.baseImage;
  typeTextFor(config.dialogueText, config.objectTexts[objectName], 24);
}

function runTrial1(key) {
  const config = characterConfig[key];
  document.getElementById(config.characterImage).src = config.trial1Image;
  applyStats(key, config.trial1Stats);
  typeTextFor(config.dialogueText, config.trial1Line, 26);
}

function runTrial2(key) {
  const config = characterConfig[key];
  document.getElementById(config.characterImage).src = config.trial2Image;
  applyStats(key, config.trial2Stats);
  typeTextFor(config.dialogueText, config.trial2Line, 26);
}

function goToEndingChoice(key) {
  const config = characterConfig[key];
  document.getElementById(config.roomScreen).classList.remove("active");
  document.getElementById(config.choiceScreen).classList.add("active");
}

function showEnding1(key) {
  const config = characterConfig[key];
  document.getElementById(config.choiceScreen).classList.remove("active");
  document.getElementById(config.ending1Screen).classList.add("active");
}

function showEnding2(key) {
  const config = characterConfig[key];
  document.getElementById(config.choiceScreen).classList.remove("active");
  document.getElementById(config.ending2Screen).classList.add("active");
}

function backToEndingChoiceFor(key) {
  const config = characterConfig[key];
  document.getElementById(config.ending1Screen).classList.remove("active");
  document.getElementById(config.ending2Screen).classList.remove("active");
  document.getElementById(config.choiceScreen).classList.add("active");
}

function backToSelectFromEnding() {
  hideAllCharacterScreens();
  selectScreen.classList.add("active");
}

/* ---------- OEDIPUS wrappers ---------- */
function enterOedipusRoom() { enterRoom("oedipus"); }
function showOedipusObjectText(objectName) { showObjectText("oedipus", objectName); }
function runOedipusTrial1() { runTrial1("oedipus"); }
function runOedipusTrial2() { runTrial2("oedipus"); }
function goToOedipusEndingChoice() { goToEndingChoice("oedipus"); }
function showOedipusEnding1() { showEnding1("oedipus"); }
function showOedipusEnding2() { showEnding2("oedipus"); }
function backToEndingChoice() { backToEndingChoiceFor("oedipus"); }

/* ---------- WILLY wrappers ---------- */
function enterWillyRoom() { enterRoom("willy"); }
function showWillyObjectText(objectName) { showObjectText("willy", objectName); }
function runWillyTrial1() { runTrial1("willy"); }
function runWillyTrial2() { runTrial2("willy"); }
function goToWillyEndingChoice() { goToEndingChoice("willy"); }
function showWillyEnding1() { showEnding1("willy"); }
function showWillyEnding2() { showEnding2("willy"); }
function backToWillyEndingChoice() { backToEndingChoiceFor("willy"); }

/* ---------- SY wrappers ---------- */
function entersyRoom() { enterRoom("sy"); }
function showSyObjectText(objectName) { showObjectText("sy", objectName); }
function runSyTrial1() { runTrial1("sy"); }
function runSyTrial2() { runTrial2("sy"); }
function goToSyEndingChoice() { goToEndingChoice("sy"); }
function showSyEnding1() { showEnding1("sy"); }
function showSyEnding2() { showEnding2("sy"); }
function backToSyEndingChoice() { backToEndingChoiceFor("sy"); }

function goToHumanAnswerScreen() {
  hideAllCharacterScreens();
  document.getElementById("human_answer_screen").classList.add("active");
}

function backToSelectFromHumanAnswer() {
  document.getElementById("human_answer_screen").classList.remove("active");
  hideAllCharacterScreens();
  selectScreen.classList.add("active");
}