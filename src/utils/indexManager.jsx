export const getIndexes = (criterionIndex) => {

  //first char is the section index
  const sectionIndex = criterionIndex.charAt(0);

  //first three chars are the guideline index
  const guidelineIndex = criterionIndex.substring(0, 3);

  return { sectionIndex, guidelineIndex, criterionIndex };
}
