

const name = "";

function truncateString(str = "", n = 50) {
  if (str.length <= n) return str;

  const subString = str.slice(0, n - 1);
  return subString.slice(0, subString.lastIndexOf(" ")) + " ......";
}

export default truncateString;
