/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { DataObject, DataObjectFactory } from "@fluidframework/aqueduct";
import { ISharedDirectory, SharedDirectory } from "@fluidframework/map";
import { createListItems, IExampleItem } from "@uifabric/example-data";
import { SharedObjectSequence, SharedString } from "@fluidframework/sequence";

export class FluentList extends DataObject {
  public myDir: ISharedDirectory | undefined;
  public mySequence: SharedObjectSequence<any> | undefined;
  public myString: SharedString | undefined;

  protected async initializingFirstTime() {
    // Shared Directory
    const directory = SharedDirectory.create(this.runtime);
    createListItems(10).forEach((v: IExampleItem) => {
      const subdir = directory.createSubDirectory(v.key);
      for (const k in v) {
        subdir.set(k, v[k]);
      }
    });
    this.root.set("fluentDirectory", directory.handle);

    // Shared Sequence
    const fluentSequence = SharedObjectSequence.create<any>(this.runtime);
    fluentSequence.insert(0, [
      {
        value: "Say Something",
        timestamp: new Date(),
      },
    ]);
    this.root.set("fluentSequence", fluentSequence.handle);

    // Shared String
    const fluentString = SharedString.create(this.runtime);
    fluentString.insertText(0, "Starting Text");
    this.root.set("fluentString", fluentString.handle);
  }

  protected async hasInitialized() {
    this.myDir = await this.root.get("fluentDirectory").get();
    this.mySequence = await this.root.get("fluentSequence").get();
    this.myString = await this.root.get("fluentString").get();

    this.myDir?.on("valueChanged", () => {
      this.emit("directoryChanged");
    });

    this.mySequence?.on("sequenceDelta", () => {
      this.emit("sequenceChanged");
    });

    this.myString?.on("sequenceDelta", () => {
      this.emit("stringChanged");
    });
  }

  public emitEvent = (event: string) => {
    this.emit(event);
  };
}

export const FluentListInstantiationFactory = new DataObjectFactory(
  "fluentlist",
  FluentList,
  [
    SharedDirectory.getFactory(),
    SharedObjectSequence.getFactory(),
    SharedString.getFactory(),
  ],
  {}
);
