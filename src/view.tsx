import * as  React from "react";
import { List, Dropdown, IDropdownProps, initializeIcons, IDropdownOption, Slider, IconButton } from "@fluentui/react";
import { createListItems } from '@uifabric/example-data';
import { FluentList } from "./dataObject"

initializeIcons();

export const FluentListView = ({ model }: { model: FluentList }) => {
  const { directoryKeys, location, height, deleteItem, createItem } = model;
  const [localItems, setItems] = React.useState(directoryKeys);

  React.useEffect(() => {
    const changed = () => {
      setItems(model.directoryKeys)
    };
    model.on("changed", changed);

    return () => {
      model.off("changed", changed)
    }
  }, [model]);


  const onRenderCell = (item?: string) => {
    if (!item) {
      console.log("something bad happened");
      return;
    }

    const itemHeight = height(item);
    const itemLocation = location(item);

    if (!itemHeight || !itemLocation) {
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
      selectedKey: itemLocation.get(),
      onChange: (event: React.FormEvent<HTMLDivElement>, option: IDropdownOption | undefined): void => {
        if (option?.key !== undefined) {
          itemLocation.set(option?.key as string)
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
          value={itemHeight.get()}
          min={100}
          max={300}
          onChanged={(e, value) => itemHeight.set(value)}

        />
        <IconButton onClick={() => deleteItem(item)} iconProps={{ iconName: 'Delete' }} />
      </div>
    )
  }


  return (
    <div>
      {localItems.length > 0 ? <List items={localItems} onRenderCell={onRenderCell} /> : <></>}<br /><br />
      <IconButton onClick={() => createItem(createListItems(1)[0])} iconProps={{ iconName: "Add" }} />
    </div>
  )

}



