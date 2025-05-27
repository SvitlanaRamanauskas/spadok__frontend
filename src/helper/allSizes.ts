export const adultsSizesAvailable = ["XS", "S", "M", "L", "XL", "XXL"];
export const kidsSizesAvailable = [
  "92-98",
  "98-104",
  "104-110",
  "110-116",
  "116-122",
  "122-128",
  "128-134",
  "134-140",
  "140-146",
  "146-152",
  "152-158",
];

export const getInitialSizes = (subcategoryId: number | null) => {
  if (!subcategoryId) {
    return;
  }
  if (subcategoryId === 1 || subcategoryId === 2) {
    return adultsSizesAvailable;
  } else if (subcategoryId === 3 || subcategoryId === 4) {
    return kidsSizesAvailable;
  } else return [];
};
