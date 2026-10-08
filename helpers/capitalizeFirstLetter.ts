const capitalizeFirstLetter = (text: string) => {
  const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

  return capitalize(text);
};

export default capitalizeFirstLetter;
