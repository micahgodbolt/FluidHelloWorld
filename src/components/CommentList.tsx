import * as React from "react";
import {
  List,

  TextField,
  PrimaryButton,
  Stack,
} from "@fluentui/react";
import { useComments } from "../redux/selectors";
import { useDispatch } from "../redux/hooks";
import {

  addComment,
} from "../redux/actions";

export const CommentList = () => {
  const dispatch = useDispatch();

  const comments = useComments();

  const [inputText, setInputText] = React.useState("");

  const onRenderComment = (item: any) => {
    return <p>{item.value}</p>;
  };

  return (
    <div className="CommentList">
      {comments.length > 0 ? (
        <List items={comments} onRenderCell={onRenderComment} />
      ) : (
          <></>
        )}
      <Stack horizontal>
        <TextField value={inputText} onChange={(e, i) => setInputText(i!)} />
        <PrimaryButton
          onClick={() => {
            dispatch(addComment(inputText));
            setInputText("");
          }}
          text="Enter"
        />
      </Stack>
    </div>
  )
}