/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { DataObject, DataObjectFactory } from "@fluidframework/aqueduct";
import { ISharedDirectory, SharedDirectory } from "@fluidframework/map";
import { createListItems, IExampleItem } from '@uifabric/example-data';

interface IFluentList {
    deleteItem: (itemKey: string) => void
    createItem: (item: IExampleItem) => void
}


export class FluentList extends DataObject implements IFluentList {
    public myDir: ISharedDirectory | undefined;


    protected async initializingFirstTime() {

        const directory = SharedDirectory.create(this.runtime);
        createListItems(10).forEach((v: IExampleItem) => {

            const subdir = directory.createSubDirectory(v.key)
            for (const k in v) {
                subdir.set(k, v[k])
            }
        });
        this.root.set("fluentDirectory", directory.handle);
    }


    protected async hasInitialized() {
        this.myDir = await this.root.get("fluentDirectory").get();
    }

    public get directoryKeys() {
        if (!this.myDir) {
            throw new Error("Map not initialized");
        }
        // subdirectories are arrays of [key, SharedMap]
        return Array.from(this.myDir.subdirectories()).map(item => item[0])
    }

    public location = (itemKey: string) => {
        const entry = this.myDir?.getSubDirectory(itemKey)
        if (entry) {
            return {
                get: () => entry.get('location'),
                set: (value: string) => entry.set('location', value)
            }
        }
    }

    public height = (itemKey: string) => {
        const entry = this.myDir?.getSubDirectory(itemKey)
        if (entry) {
            return {
                get: () => entry.get('height'),
                set: (value: number) => entry.set('height', value)
            }
        }
    }

    public readonly deleteItem = (itemKey: string) => {
        if (this.myDir && this.myDir.hasSubDirectory(itemKey)) {
            this.myDir.deleteSubDirectory(itemKey)
        }
    };

    public readonly createItem = (item: IExampleItem) => {
        if (this.myDir) {
            item.key = Date.now().toString();
            const subdir = this.myDir.createSubDirectory(item.key)
            for (const k in item) {
                subdir.set(k, item[k])
            }
        }
    };

}


export const FluentListInstantiationFactory = new DataObjectFactory(
    "fluentlist",
    FluentList,
    [SharedDirectory.getFactory()],
    {},
);


