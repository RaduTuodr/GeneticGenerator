function newChar() {

    let character = Math.floor(random(48, 122));
    if (character === 48) character = 32;
    if (character === 64) character = 46;
    return String.fromCharCode(character);
}