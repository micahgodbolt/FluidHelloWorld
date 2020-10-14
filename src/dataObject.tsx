/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { DataObject, DataObjectFactory } from "@fluidframework/aqueduct";
import { SharedMap } from "@fluidframework/map";
import { createListItems, IExampleItem } from '@uifabric/example-data';

interface IFluentList {
    deleteItem: (itemKey: string) => void
    createItem: (item: IExampleItem) => void
}


export class FluentList extends DataObject implements IFluentList {
    private myMap: SharedMap | undefined;

    protected async initializingFirstTime() {
        const items = SharedMap.create(this.runtime);
        createListItems(10).forEach((v: IExampleItem) => items.set(v.key, v));
        this.root.set("fluentlist", items.handle);
    }


    protected async hasInitialized() {
        this.myMap = await this.root.get("fluentlist").get();
    }

    public get itemKeys() {
        if (!this.myMap) {
            throw new Error("Map not initialized");
        }
        return Array.from(this.myMap.keys());
    }


    private updateItemLocation = (itemKey: string, value: string) => {
        if (this.myMap) {
            const newItem = { ...this.myMap.get(itemKey), location: value }
            this.myMap?.set(itemKey, newItem)
        }
    };

    private updateItemHeight = (itemKey: string, value: string) => {
        if (this.myMap) {
            const newItem = { ...this.myMap.get(itemKey), height: value }
            this.myMap?.set(itemKey, newItem)
        }
    };

    public location = (itemKey: string) => {
        return {
            get: () => this.myMap?.get(itemKey).location,
            set: (value: string) => this.updateItemLocation(itemKey, value)
        }
    }

    public height = (itemKey: string) => {
        return {
            get: () => this.myMap?.get(itemKey).height,
            set: (value: string) => this.updateItemHeight(itemKey, value)
        }
    }

    public readonly deleteItem = (itemKey: string) => {
        if (this.myMap && this.myMap.get(itemKey)) {
            this.myMap?.delete(itemKey)
        }
    };

    public readonly createItem = (item: IExampleItem) => {
        if (this.myMap) {
            item.key = Date.now().toString();
            this.myMap?.set(item.key, item)
        }
    };

}


export const FluentListInstantiationFactory = new DataObjectFactory(
    "fluentlist",
    FluentList,
    [SharedMap.getFactory()],
    {},
);


