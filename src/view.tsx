import * as  React from "react";
import { List, Dropdown, IDropdownProps, initializeIcons, IDropdownOption, Slider, IconButton } from "@fluentui/react";
import { IExampleItem, createListItems } from '@uifabric/example-data';

initializeIcons();

export const FluentListView = ({ model }: { model: any }) => {
  const { directoryKeys, location, height, deleteItem, createItem, myDir } = model;
  const [localItems, setItems] = React.useState(directoryKeys);

  React.useEffect(() => {
    myDir.on("valueChanged", () => {
      setItems(model.directoryKeys)
    });
  }, [myDir]);


  const onRenderCell = (item?: IExampleItem) => {
    const itemHeight = height(item);
    const itemLocation = location(item);

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
        itemLocation.set(option?.key)
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



