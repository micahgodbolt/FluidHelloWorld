import { useSelector } from "./hooks";
import { IExampleItem } from "@uifabric/example-data"; 


export const useItems = () => {
  return useSelector<IExampleItem[]>(({myDir}) => {
    return Array.from(myDir!.subdirectories()).map(getDataFromSubdirectory);
  }, ['directoryChanged']);
};

export const useComments = ():{value: string, timestamp: number}[] => {
  return useSelector<any[]>(({mySequence}) => {
    return mySequence!.getItems(0);
  }, ['sequenceChanged']);
};

export const useTextField = (): string => {
  return useSelector<string>(({myString}) => {
    return myString!.getText();
  }, ['stringChanged']);
};
 

const getDataFromSubdirectory = (item:any): IExampleItem => {
  const data = {};
  for (const [key, value] of item[1]) {
    data[key] = value;
  }
  data['id'] = item[0];
  return data as IExampleItem;
}