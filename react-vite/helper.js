function randomizeArray(arr, numItems) {
  const randomized = [...arr].sort(() => Math.random() -0.5)
  return randomized.slice(0, numItems)
}



export {randomizeArray}
