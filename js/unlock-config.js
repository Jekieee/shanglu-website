const CHAR_INITIALS = {
  '达泽明': 'DZM',
  '张雅文': 'ZYW',
  '达雯菁': 'DWJ',
  '张卓君': 'ZZJ',
  '阿花': 'AH',
};

const UNLOCK_CODES = {
  '达泽明': { '公路': '1208', '医院': '0317', '大坝': '0426', '家': '0815', '寺庙': '0666', '郊县': '1999' },
  '张雅文': { '公路': '2311', '医院': '1402', '大坝': '0537', '家': '0920', '寺庙': '0777', '郊县': '2001' },
  '达雯菁': { '公路': '3412', '医院': '2503', '大坝': '0648', '家': '1033', '寺庙': '0888', '郊县': '2102' },
  '张卓君': { '公路': '4515', '医院': '3604', '大坝': '0759', '家': '1146', '寺庙': '0999', '郊县': '2203' },
  '阿花':   { '公路': '5618', '医院': '4705', '大坝': '0860', '家': '1259', '寺庙': '1001', '郊县': '2304' },
};

const LOCATIONS = ['公路', '医院', '大坝', '家', '寺庙', '郊县'];

function buildPassword(char, location) {
  return CHAR_INITIALS[char] + UNLOCK_CODES[char][location];
}

function verifyPassword(location, input) {
  const code = input.trim().toUpperCase();
  if (!LOCATIONS.includes(location)) return null;

  for (const [char, initials] of Object.entries(CHAR_INITIALS)) {
    if (code === initials + UNLOCK_CODES[char][location]) {
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

function clearUnlocked(location, char) {
  sessionStorage.removeItem(`unlock:${location}:${char}`);
}
