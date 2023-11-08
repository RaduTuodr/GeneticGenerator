function newChar() {

    let character = Math.floor(random(63, 122));
    if (character === 63) character = 32;
    if (character === 64) character = 46;
    return String.fromCharCode(character);
}