import * as React from "react";
import {
  List,
  Dropdown,
  IDropdownProps,
  initializeIcons,
  IDropdownOption,
  Slider,
  IconButton,
  TextField,
  PrimaryButton,
  Stack,
} from "@fluentui/react";
import { IExampleItem } from "@uifabric/example-data";
import { useItems, useComments, useTextField } from "./redux/selectors";
import { useDispatch } from "./redux/hooks";
import {
  addItem,
  deleteItem,
  updateItemHeight,
  updateItemLocation,
  addComment,
  updateTextField,
} from "./redux/actions";

initializeIcons();

export const FluentListView = () => {
  const dispatch = useDispatch();

  const items = useItems();
  const comments = useComments();
  const textfieldValue = useTextField();

  const [inputText, setInputText] = React.useState("");

  const onRenderCell = (item?: IExampleItem) => {
    if (!item) {
      console.log("something bad happened");
      return;
    }

    const dropdownProps: IDropdownProps = {
      styles: { root: { display: "inline-block", minWidth: 300 } },
      options: [
        { key: "Los Angeles", text: "Los Angeles" },
        { key: "New York", text: "New York" },
        { key: "Portland", text: "Portland" },
        { key: "Seattle", text: "Seattle" },
        { key: "Chicago", text: "Chicago" },
      ],
      selectedKey: item.location,
      onChange: (
        event: React.FormEvent<HTMLDivElement>,
        option: IDropdownOption | undefined
      ): void => {
        if (option?.key !== undefined) {
          dispatch(updateItemLocation(item.key, option.key.toString()));
        }
      },
    };

    if (!item) {
      return null;
    }
    return (
      <div style={{ display: "flex" }}>
        <Dropdown {...dropdownProps} />
        <Slider
          styles={{ root: { flexGrow: 1 } }}
          value={item.height}
          min={100}
          max={300}
          onChanged={(e, value) => dispatch(updateItemHeight(item.key, value))}
        />
        <IconButton
          onClick={() => dispatch(deleteItem(item.key))}
          iconProps={{ iconName: "Delete" }}
        />
      </div>
    );
  };

  const onRenderComment = (item: any) => {
    return <p>{item.value}</p>;
  };

  return (
    <Stack gap={24}>
      <div className="DataList">
        {items.length > 0 ? (
          <List items={items} onRenderCell={onRenderCell} />
        ) : (
          <></>
        )}
        <IconButton
          onClick={() => dispatch(addItem())}
          iconProps={{ iconName: "Add" }}
        />
      </div>

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
      <div className="SharedString">
        <TextField
          multiline
          value={textfieldValue}
          onChange={(e, n) => dispatch(updateTextField(n))}
        />
      </div>
    </Stack>
  );
};
