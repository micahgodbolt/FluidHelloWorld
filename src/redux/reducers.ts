import { FluentList } from "../dataObject";

export const rootReducer = (context: FluentList, action: any) => {
  const { myDir, mySequence, myString } = context;
  if (!myDir) {
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
        context.emitEvent("directoryChanged");
      }
      return;
    }

    case "ADD_COMMENT": {
      if (mySequence) {
        mySequence.insert(mySequence.getItemCount(), [
          {
            value: action.payload.comment,
            timestamp: new Date(),
          },
        ]);
      }
      return;
    }
    case "UPDATE_TEXTFIELD": {
      const { text } = action.payload;
      if (myString) {
        myString.replaceText(0, myString.getLength(), text);
      }
      return;
    }
  }
};
