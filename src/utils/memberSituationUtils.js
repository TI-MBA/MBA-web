/**
 * Returns the human-readable situation text based on the member's situation code.
 *
 * @param {Object} member - The member object containing the situation property.
 * @param {string} member.situation - The situation code of the member.
 * @returns {string} The corresponding situation text or "Indefinido" if unknown.
 */
export function getSituationText(member) {
  const situationTextsMap = new Map();
  situationTextsMap.set("UP_TO_DATE", "Em dia");
  situationTextsMap.set("EXEMPT", "Cota");
  situationTextsMap.set("AGREEMENT", "Acordo");
  situationTextsMap.set("DEBIT", "Débito");

  const resultText = situationTextsMap.get(member.situation);
  return resultText == null ? "Indefinido" : resultText;
}

/**
 *
 * Returns the situation css class based on member situation
 *
 */
export function getSituationTagClass(member) {
  const situationClassMap = new Map();
  situationClassMap.set("UP_TO_DATE", "is-success");
  situationClassMap.set("EXEMPT", "is-info");
  situationClassMap.set("AGREEMENT", "is-warning");
  situationClassMap.set("DEBIT", "is-danger");

  return situationClassMap.get(member.situation);
}
