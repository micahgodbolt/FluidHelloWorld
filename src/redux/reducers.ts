import { FluentList } from "../dataObject";

export const rootReducer = (context: FluentList, action: any) => {
  const {myDir: data} = context;
  if (!data) {return};
  
  switch (action.type) {
    case "HEIGHT": {
      const { id, height } = action.payload;
      const entry = data.getSubDirectory(id)
      if (entry) {
        entry.set('height', height)
      }
      return;
    }
    
    case "LOCATION": {
      const { id, location } = action.payload;
      const entry = data.getSubDirectory(id)
      if (entry) {
        entry.set('location', location)
      }
      return;
    }

    case "ADD": {
      const { id, item } = action.payload;
      item.key = id;
      const subdir = data.createSubDirectory(item.key)
      for (const k in item) {
          subdir.set(k, item[k])
      }
      return;
    }

    case "DELETE": {
      const { id } = action.payload;
      if (data.hasSubDirectory(id)) {
        data.deleteSubDirectory(id)
        context.emitEvent('changed');
      }
      return;
    }    
  }
}