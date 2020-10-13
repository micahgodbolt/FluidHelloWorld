import * as  React from "react";
import { List, Dropdown, IDropdownProps, initializeIcons, IDropdownOption, Slider, IconButton } from "@fluentui/react";
import { IExampleItem, createListItems } from '@uifabric/example-data';

initializeIcons();

export const FluentListView = ({model} : {model: any}) => {
  const { items, updateItemLocation, updateItemHeight, deleteItem, createItem, myMap } = model;
  const [localItems, setItems] = React.useState(items);

  React.useEffect(() => {
    myMap.on("valueChanged", () => {
      setItems(model.items)
    });
}, [myMap]);




  const onRenderCell = (item?: IExampleItem) => {
    const dropdownProps: IDropdownProps = {
      styles:{root:{display: 'inline-block', minWidth: 300}},
      options:[
        {key: 'Los Angeles', text: 'Los Angeles'},
        {key: 'New York', text: 'New York'},
        {key: 'Portland', text: 'Portland'},
        {key: 'Seattle', text: 'Seattle'},
        {key: 'Chicago', text: 'Chicago'}
      ],
      selectedKey: item?.location, 
      onChange: (event: React.FormEvent<HTMLDivElement>, option: IDropdownOption | undefined): void => {
        updateItemLocation(item?.key, option?.key)
      }
    }
  
    if (!item) {
      return null;
    }
    return(
    <div style={{display: 'flex'}}>
      <Dropdown  {...dropdownProps} /> 
      <Slider 
        styles={{root: {flexGrow: 1}}} 
        value={item.height} 
        min={100} 
        max={300} 
        onChanged={(e, value) => updateItemHeight(item?.key, value)}  
      />
      <IconButton onClick={() => deleteItem(item.key) } iconProps={{iconName: 'Delete'}} />   
      </div>
    )
  }


  return (
  <div>
      {localItems.length > 0 ? <List items={localItems} onRenderCell={onRenderCell} /> : <></>}<br/><br/>
      <IconButton onClick={() =>  createItem(createListItems(1)[0])} iconProps={{iconName:"Add"}} />
  </div>
  )
  
}



