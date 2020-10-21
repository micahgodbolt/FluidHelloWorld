import * as React from "react";
import { TextField, ITextField } from "@fluentui/react";
import { useTextField } from "../fludux/selectors";
import { useDispatch } from "../fludux/hooks";
import { updateTextField } from "../fludux/actions";

export const SharedString = () => {
  const dispatch = useDispatch();
  const textfieldValue = useTextField();

  const fieldRef = React.createRef<ITextField>();

  return (
    <div className="SharedString">
      <TextField
        componentRef={fieldRef}
        multiline
        value={textfieldValue}
        onChange={(e, n) => {
          dispatch(updateTextField(n))
        }}
      />
    </div>
  )
}