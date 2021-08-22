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


const dados = { autorizados, parentescos, turmas, phoneMask };

export default dados;