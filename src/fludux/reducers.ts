import { FluentList } from "../dataObject";
import { diffStringsRaw } from "jest-diff";

export const rootReducer = (dataObject: FluentList, action: any) => {
  const { myDir, mySequence, myString } = dataObject;
  if (!myDir || !mySequence || !myString) {
    return;
  }

  switch (action.type) {
    case "UPDATE_ITEM": {
      const {id, updates} = action.payload;
      const subDir = dataObject.myDir?.getSubDirectory(id);
      for (const key in updates) {
        subDir?.set(key, updates[key])
      }
      return;
    } 

    case "ADD_ITEM": {
      const { id, item } = action.payload;
      item.key = id;
      const subdir = myDir.createSubDirectory(item.key);
      for (const k in item) {
        subdir.set(k, item[k]);
      }
      return;
    }

    case "DELETE_ITEM": {
      const { id } = action.payload;
      if (myDir.hasSubDirectory(id)) {
        myDir.deleteSubDirectory(id);
        dataObject.emitEvent("directoryChanged");
      }
      return;
    }

    case "ADD_COMMENT": {
        mySequence.insert(mySequence.getItemCount(), [
          {
            value: action.payload.comment,
            timestamp: new Date(),
          },
        ]);
      return;
    }

    case "UPDATE_TEXTFIELD": {
      const { text } = action.payload;
      const diffs = diffStringsRaw(myString.getText(), text, true)
      let pos = 0;
      diffs.forEach((diff, i) => {
        switch (diff[0]) {
          case 0:
            pos += diff[1].length;
          break;
          case 1:
            myString.insertText(pos, diff[1])
            pos += diff[1].length;
          break;
          case -1:
            myString.removeText(pos, pos + diff[1].length)
          break;
        }
      })
      return;
    }
  }
};
