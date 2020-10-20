import { ISharedDirectory } from "@fluidframework/map";
import * as React from "react";
import { FluidContext } from "./contextProvider";
import { rootReducer } from './reducers';
import { SharedObjectSequence } from "@fluidframework/sequence";

// Or maybe useSharedDirectory
export const useSharedDirectory = (selectorFunction: (data: ISharedDirectory) => any) => {
  const context = React.useContext(FluidContext)
  const { myDir } = context;

  if (myDir) {
    const [selectorState, setSelectorState] = React.useState(selectorFunction(myDir));
    const updateSelectorState = () => {
      setSelectorState(selectorFunction(myDir))
    }

    React.useEffect(() => {
      context.on("directoryChanged", updateSelectorState);
      () => context.off("directoryChanged", updateSelectorState)
    }, [context])

    return selectorState
  }
}

export const useSequence = (selectorFunction: (data: SharedObjectSequence<any>) => any) => {
  const context = React.useContext(FluidContext)
  const { comments } = context;

  if (comments) {
    const [selectorState, setSelectorState] = React.useState(selectorFunction(comments));
    const updateSelectorState = () => {
      setSelectorState(selectorFunction(comments))
    }

    React.useEffect(() => {
      context.on("commentsChanged", updateSelectorState);
      () => context.off("commentsChanged", updateSelectorState)
    }, [context])

    return selectorState
  }
}

export const useDispatch = () => {
  const context = React.useContext(FluidContext)
  return (action: any) => rootReducer(context, action);
}