import * as React from "react";
import {
  List,
  Dropdown,
  IDropdownProps,
  IDropdownOption,
  Slider,
  IconButton,
} from "@fluentui/react";
import { IExampleItem } from "@uifabric/example-data";
import { useItems } from "../fludux/selectors";
import { useDispatch } from "../fludux/hooks";
import {
  addItem,
  deleteItem,
  updateItem
} from "../fludux/actions";

export const DataList = () => {

  const items = useItems();

  const dispatch = useDispatch();


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
          dispatch(updateItem(item.key, { 'location': option.key.toString() }));
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
          onChanged={(e, value) => dispatch(updateItem(item.key, { 'height': value }))}
        />
        <IconButton
          onClick={() => dispatch(deleteItem(item.key))}
          iconProps={{ iconName: "Delete" }}
        />
      </div>
    );
  };


  return (
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
  )
}