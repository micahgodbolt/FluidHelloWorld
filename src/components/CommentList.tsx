import * as React from "react";
import {
  List,
  TextField,
  PrimaryButton,
  Stack,
} from "@fluentui/react";
import { useComments } from "../fludux/selectors";
import { useDispatch } from "../fludux/hooks";
import { addComment } from "../fludux/actions";

export const CommentList = () => {
  const dispatch = useDispatch();

  const comments = useComments();

  const [inputText, setInputText] = React.useState<string | undefined>("");

  const onRenderComment = (item: any) => {
    return <p>{item.value}</p>;
  };

  return (
    <div className="CommentList">
      {comments.length > 0
        ? <List items={comments} onRenderCell={onRenderComment} />
        : <></>
      }
      <Stack horizontal>
        <TextField value={inputText} onChange={(e, i) => setInputText(i)} />
        <PrimaryButton
          onClick={() => {
            dispatch(!!inputText && addComment(inputText));
            setInputText("");
          }}
          text="Enter"
        />
      </Stack>
    </div>
  )
}