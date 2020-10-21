import { FluentList } from "../dataObject";
import { diffStringsRaw } from "jest-diff";

export const rootReducer = (dataObject: FluentList, action: any) => {
  const { myDir, mySequence, myString } = dataObject;
  if (!myDir || !mySequence || !myString) {
    return;
  }

  switch (action.type) {
    case "HEIGHT": {
      const { id, height } = action.payload;
      const entry = myDir.getSubDirectory(id);
      if (entry) {
        entry.set("height", height);
      }
      return;
    }

    case "LOCATION": {
      const { id, location } = action.payload;
      const entry = myDir.getSubDirectory(id);
      if (entry) {
        entry.set("location", location);
      }
      return;
    }

    case "ADD": {
      const { id, item } = action.payload;
      item.key = id;
      const subdir = myDir.createSubDirectory(item.key);
      for (const k in item) {
        subdir.set(k, item[k]);
      }
      return;
    }

    case "DELETE": {
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
