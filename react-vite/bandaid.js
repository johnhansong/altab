function randomizeArray(arr, numItems) {
  const randomized = [...arr].sort(() => Math.random() -0.5)
  return randomized.slice(0, numItems)
}

function limitString(string, length) {
  const shortenedStr = string.slice(0, length) + "..."
  return shortenedStr
}

const growFirstLtr = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const isValidUrl = (url) => {
  try {
      new URL(url)
      return true;
  } catch (err) {
      return false;
  }
}

export {randomizeArray, limitString, growFirstLtr, isValidUrl}
