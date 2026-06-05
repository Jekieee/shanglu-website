const PROLOGUE_CODES = {
  '达泽明': '1024',
  '张雅文': '2035',
  '达雯菁': '3046',
  '张卓君': '4057',
  '阿花': '5068',
};

function verifyProloguePassword(char, input) {
  const code = input.trim();
  if (PROLOGUE_CODES[char] && code === PROLOGUE_CODES[char]) {
    return { char, file: `assets/prologue/${char}序幕.PNG` };
  }
  return null;
}

function isPrologueUnlocked(char) {
  return sessionStorage.getItem(`prologue:${char}`) === '1';
}

function setPrologueUnlocked(char) {
  sessionStorage.setItem(`prologue:${char}`, '1');
}
