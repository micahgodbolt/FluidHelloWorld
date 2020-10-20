import { useSharedDirectory, useSequence } from "./hooks";

export const useItems = () => {
  return useSharedDirectory((data) => {
    return Array.from(data.subdirectories()).map(item => {
      const id = item[0];
      const data = {};
      for (const [key, value] of item[1]) {
        data[key] = value
      }
      return {
        ...data,
        id
      }
    })
  })
}

export const useComments = () => {
  return useSequence((data) => {
    return data.getItems(0);
  })
}
