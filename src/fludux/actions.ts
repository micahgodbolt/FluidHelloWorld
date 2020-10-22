import { createListItems, IExampleItem } from "@uifabric/example-data";


export const updateItem = (id: string, updates: Partial<Omit<IExampleItem, "id">>) => ({
  type: "UPDATE_ITEM",
  payload: {
    id,
    updates,
  },
});

export const addItem = () => ({
  type: "ADD_ITEM",
  payload: {
    id: Date.now().toString(),
    item: createListItems(1)[0],
  },
});

export const deleteItem = (id: string) => ({
  type: "DELETE_ITEM",
  payload: {
    id,
  },
});

export const addComment = (comment: string) => ({
  type: "ADD_COMMENT",
  payload: {
    comment,
  },
});

export const updateTextField = (text: string | undefined) => ({
  type: "UPDATE_TEXTFIELD",
  payload: {
    text,
  },
});
