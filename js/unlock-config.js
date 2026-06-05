const CHAR_INITIALS = {
  '达泽明': 'DZM',
  '张雅文': 'ZYW',
  '达雯菁': 'DWJ',
  '张卓君': 'ZZJ',
  '阿花': 'AH',
};

const LOCATION_CODES = {
  '公路': '1208',
  '医院': '0317',
  '大坝': '0426',
  '家': '0815',
  '寺庙': '0666',
  '郊县': '1999',
};

const LOCATIONS = Object.keys(LOCATION_CODES);

function buildPassword(char, location) {
  return CHAR_INITIALS[char] + LOCATION_CODES[location];
}

function verifyPassword(location, input) {
  const code = input.trim().toUpperCase();
  if (!LOCATION_CODES[location]) return null;

  for (const [char, initials] of Object.entries(CHAR_INITIALS)) {
    if (code === initials + LOCATION_CODES[location]) {
      return { char, location, file: `materials/${char}/${location}.pdf` };
    }
  }
  return null;
}

function isUnlocked(location, char) {
  return sessionStorage.getItem(`unlock:${location}:${char}`) === '1';
}

function setUnlocked(location, char) {
  sessionStorage.setItem(`unlock:${location}:${char}`, '1');
}
