import * as React from "react";
import { FluidContext } from "./contextProvider";
import { FluentList } from "../dataObject";
import { rootReducer } from "./reducers";


export const useSelector = <T,>(selectorFunction: (dataObject: FluentList) => T, eventNames: string[]): T => {
  const dataObject = React.useContext(FluidContext);

  const [selectorState, setSelectorState] = React.useState<T>(
    selectorFunction(dataObject)
  );
  const updateSelectorState = () => {
    setSelectorState(selectorFunction(dataObject));
  };

  React.useEffect(() => {
    eventNames.forEach(name => {
      dataObject.on(name, updateSelectorState)
    });

    () => {
      eventNames.forEach(name => {
        dataObject.off(name, updateSelectorState)
      })
    }
  }, [dataObject]);

  return selectorState;
}

export const useDispatch = () => {
  const dataObject = React.useContext(FluidContext);
  return (action: any) => rootReducer(dataObject, action);
};
