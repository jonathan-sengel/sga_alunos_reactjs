import autorizados from "./autorizados";
import parentescos from "./parentescos";
import turmas from "./turmas";

function phoneMask(textNumber) {
  let onlyNumber = textNumber.replace(/\D/g, '');
  let numberWithMask = [...onlyNumber].map((letter, i) => {
    if (i === 0)
      return ['(', letter];
    if (i === 2)
      return [')', letter];
    if (i === 7)
      return ['-', letter];
    return letter;
  }).flat(1).join('');
  return numberWithMask;
}


function generateId(idLength) {
  let newId = '';
  const caracteres = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
  for (let i = 0; i < idLength; i++) {
    newId += caracteres.charAt(Math.ceil(Math.random() * caracteres.length));
  }
  return newId;
}

const dados = { autorizados, parentescos, turmas, phoneMask, generateId };

export default dados;