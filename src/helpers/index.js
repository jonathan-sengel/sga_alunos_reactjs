import authorized from "./authorized";
import kinships from "./kinships";
import grades from "./grades";

function phoneMask(textNumber) {
  let onlyNumber = textNumber.replace(/\D/g, "");
  let numberWithMask = [...onlyNumber]
    .map((letter, i, arr) => {
      if (i === 0) return ["(", letter];
      if (i === 2) return [")", letter];
      if (i === 7) return ["-", letter];
      return letter;
    })
    .flat(1)
    .join("");
  return numberWithMask;
}

function generateId(idLength) {
  let newId = "";
  const caracteres = "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
  for (let i = 0; i < idLength; i++) {
    newId += caracteres.charAt(Math.ceil(Math.random() * caracteres.length));
  }
  return newId;
}

const dataHelper = { authorized, kinships, grades, phoneMask, generateId };

export default dataHelper;
