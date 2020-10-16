import { useSelector } from "./hooks";

export const useItems = () => {
  return useSelector((data) => {
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
