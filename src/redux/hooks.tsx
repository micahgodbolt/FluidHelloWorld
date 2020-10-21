import * as React from "react";
import { FluidContext } from "./contextProvider";
import { FluentList } from "../dataObject";
import { rootReducer } from "./reducers";


export const useSelector = (selectorFunction: (dataObject: FluentList) => any, eventName: string): any => {
  const dataObject = React.useContext(FluidContext);

  const [selectorState, setSelectorState] = React.useState(
    selectorFunction(dataObject)
  );
  const updateSelectorState = () => {
    setSelectorState(selectorFunction(dataObject));
  };

  React.useEffect(() => {
    dataObject.on(eventName, updateSelectorState);
    () => dataObject.off(eventName, updateSelectorState);
  }, [dataObject]);

  return selectorState;
}

export const useDispatch = () => {
  const dataObject = React.useContext(FluidContext);
  return (action: any) => rootReducer(dataObject, action);
};
