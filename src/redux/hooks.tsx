import { ISharedDirectory } from "@fluidframework/map";
import * as React from "react";
import { FluidContext } from "./contextProvider";
import { rootReducer } from "./reducers";
import { SharedObjectSequence, SharedString } from "@fluidframework/sequence";

export const useSharedDirectory = (
  selectorFunction: (data: ISharedDirectory) => any
) => {
  const context = React.useContext(FluidContext);
  const { myDir } = context;

  if (myDir) {
    const [selectorState, setSelectorState] = React.useState(
      selectorFunction(myDir)
    );
    const updateSelectorState = () => {
      setSelectorState(selectorFunction(myDir));
    };

    React.useEffect(() => {
      context.on("directoryChanged", updateSelectorState);
      () => context.off("directoryChanged", updateSelectorState);
    }, [context]);

    return selectorState;
  }
};

export const useSequence = (
  selectorFunction: (data: SharedObjectSequence<any>) => any
) => {
  const context = React.useContext(FluidContext);
  const { mySequence } = context;

  if (mySequence) {
    const [selectorState, setSelectorState] = React.useState(
      selectorFunction(mySequence)
    );
    const updateSelectorState = () => {
      setSelectorState(selectorFunction(mySequence));
    };

    React.useEffect(() => {
      context.on("sequenceChanged", updateSelectorState);
      () => context.off("sequenceChanged", updateSelectorState);
    }, [context]);

    return selectorState;
  }
};

export const useSharedString = (
  selectorFunction: (data: SharedString) => any
) => {
  const context = React.useContext(FluidContext);
  const { myString } = context;

  if (myString) {
    const [selectorState, setSelectorState] = React.useState(
      selectorFunction(myString)
    );
    const updateSelectorState = () => {
      setSelectorState(selectorFunction(myString));
    };

    React.useEffect(() => {
      context.on("stringChanged", updateSelectorState);
      () => context.off("stringChanged", updateSelectorState);
    }, [context]);

    return selectorState;
  }
};

export const useDispatch = () => {
  const context = React.useContext(FluidContext);
  return (action: any) => rootReducer(context, action);
};
