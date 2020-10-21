import { useSelector } from "./hooks";

export const useItems = (): any[] => {
  return useSelector((dataObject) => {
    const {myDir} = dataObject
    if (!myDir) {return undefined}
    return Array.from(myDir.subdirectories()).map((item) => {      
      const data = {};
      for (const [key, value] of item[1]) {
        data[key] = value;
      }
      data['id'] = item[0];

      return data;
    });
  }, 'directoryChanged');
};

export const useComments = (): any[] => {
  return useSelector((dataObject) => {
    if (!dataObject.mySequence) {return undefined}
    return dataObject.mySequence.getItems(0);
  }, 'sequenceChanged');
};

export const useTextField = (): string => {
  return useSelector((dataObject) => {
    if (!dataObject.myString) {return undefined}
    return dataObject.myString.getText();
  }, 'stringChanged');
};
