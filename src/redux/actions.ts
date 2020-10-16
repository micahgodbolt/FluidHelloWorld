import { createListItems } from '@uifabric/example-data';

export const updateItemHeight = (id: string, height: number) => ({
  type: "HEIGHT",
  payload: {
    id,
    height
  }
})

export const updateItemLocation = (id: string, location: string) => ({
  type: "LOCATION",
  payload: {
    id,
    location
  }
})

export const addItem = () =>({
  type: "ADD",
  payload: {
    id: Date.now().toString(),
    item: createListItems(1)[0]
  }
})

export const deleteItem = (id: string) => ({
  type: "DELETE",
  payload: {
    id
  }
})