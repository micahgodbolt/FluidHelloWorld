import { ISharedDirectory } from "@fluidframework/map";
import * as React from "react";
import { FluidContext } from "./contextProvider";
import { rootReducer } from './reducers';

export const useSelector = (selectorFunction: (data: ISharedDirectory) => any) => {
  const context = React.useContext(FluidContext)
  const { myDir } = context;

  if (myDir) {
    const [selectorState, setSelectorState] = React.useState(selectorFunction(myDir));
    const updateSelectorState = () => {
      myDir && setSelectorState(selectorFunction(myDir))
    }

    React.useEffect(() => {
      context.on("changed", updateSelectorState);
      () => context.off("changed", updateSelectorState)
    }, [context])

    return selectorState
  }
}

export const useDispatch = () => {
  const context = React.useContext(FluidContext)
  return (action: any) => rootReducer(context, action);
}