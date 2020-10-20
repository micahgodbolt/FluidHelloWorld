import * as  React from "react";
import { List, Dropdown, IDropdownProps, initializeIcons, IDropdownOption, Slider, IconButton, TextField, PrimaryButton, Stack } from "@fluentui/react";
import { IExampleItem } from '@uifabric/example-data';
import { useItems, useComments } from "./redux/selectors";
import { useDispatch } from './redux/hooks'
import { addItem, deleteItem, updateItemHeight, updateItemLocation, addComment } from "./redux/actions";

initializeIcons();

export const FluentListView = () => {

  const items = useItems();
  const dispatch = useDispatch();
  const comments = useComments();
  const [inputText, setInputText] = React.useState('');

  const onRenderCell = (item?: IExampleItem) => {
    if (!item) {
      console.log("something bad happened");
      return;
    }

    const dropdownProps: IDropdownProps = {
      styles: { root: { display: 'inline-block', minWidth: 300 } },
      options: [
        { key: 'Los Angeles', text: 'Los Angeles' },
        { key: 'New York', text: 'New York' },
        { key: 'Portland', text: 'Portland' },
        { key: 'Seattle', text: 'Seattle' },
        { key: 'Chicago', text: 'Chicago' }
      ],
      selectedKey: item.location,
      onChange: (event: React.FormEvent<HTMLDivElement>, option: IDropdownOption | undefined): void => {
        if (option?.key !== undefined) {
          dispatch(updateItemLocation(item.key, option.key.toString()))
        }
      }
    }

    if (!item) {
      return null;
    }
    return (
      <div style={{ display: 'flex' }}>
        <Dropdown  {...dropdownProps} />
        <Slider
          styles={{ root: { flexGrow: 1 } }}
          value={item.height}
          min={100}
          max={300}
          onChanged={(e, value) => dispatch(updateItemHeight(item.key, value))}

        />
        <IconButton onClick={() => dispatch(deleteItem(item.key))} iconProps={{ iconName: 'Delete' }} />
      </div>
    )
  }

  const onRenderComment = (item: any) => {
    return <p>{item.value}</p>
  }

  return (
    <div>
      {items.length > 0 ? <List items={items} onRenderCell={onRenderCell} /> : <></>}<br /><br />
      <IconButton onClick={() => dispatch(addItem())} iconProps={{ iconName: "Add" }} /> <br /><br /><br /><br />
      {comments.length > 0 ? <List items={comments} onRenderCell={onRenderComment} /> : <></>}
      <Stack horizontal>
        <TextField value={inputText} onChange={(e, i) => setInputText(i!)} />
        <PrimaryButton onClick={() => {
          dispatch(addComment(inputText))
          setInputText('')
        }
        }
        >Enter</PrimaryButton>
      </Stack>
    </div>
  )

}



