const PROLOGUE_CODES = {
  '达泽明': '1024',
  '张雅文': '2035',
  '达雯菁': '3046',
  '张卓君': '4057',
  '阿花': '5068',
};

const PROLOGUE_FILES = {
  '达泽明': 'assets/prologue/dzm.png',
  '张雅文': 'assets/prologue/zyw.png',
  '达雯菁': 'assets/prologue/dwj.png',
  '张卓君': 'assets/prologue/zzj.png',
  '阿花': 'assets/prologue/ah.png',
};

function verifyProloguePassword(char, input) {
  const code = input.trim();
  if (PROLOGUE_CODES[char] && code === PROLOGUE_CODES[char]) {
    return { char, file: PROLOGUE_FILES[char] };
  }
  return null;
}

function isPrologueUnlocked(char) {
  return sessionStorage.getItem(`prologue:${char}`) === '1';
}

function setPrologueUnlocked(char) {
  sessionStorage.setItem(`prologue:${char}`, '1');
}
