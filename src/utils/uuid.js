function uuid(count = 8) {

  let symbols = 'abcdefghijklmnopqrstuvwxyz1234567890';
  let result = '';

  for (let i = 0; i < count; i++) {
    result += symbols[parseInt(String(Math.random() * (symbols.length)))];
  }
  return result;
}

export default uuid;
