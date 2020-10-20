/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { DataObject, DataObjectFactory } from "@fluidframework/aqueduct";
import { ISharedDirectory, SharedDirectory } from "@fluidframework/map";
import { createListItems, IExampleItem } from '@uifabric/example-data';
import { SharedObjectSequence } from "@fluidframework/sequence";


export class FluentList extends DataObject {
    public myDir: ISharedDirectory | undefined;
    public comments: SharedObjectSequence<any> | undefined;

    protected async initializingFirstTime() {

        const directory = SharedDirectory.create(this.runtime);
        createListItems(10).forEach((v: IExampleItem) => {
            const subdir = directory.createSubDirectory(v.key)
            for (const k in v) {
                subdir.set(k, v[k])
            }
        });
        this.root.set("fluentDirectory", directory.handle);


        const commentHistory = SharedObjectSequence.create<any>(this.runtime);
        commentHistory.insert(0, [{
            value: "Say Something",
            timestamp: new Date(),
        }]);
        this.root.set('commentHistory', commentHistory.handle);
    }


    protected async hasInitialized() {
        this.myDir = await this.root.get("fluentDirectory").get();
        this.comments = await this.root.get("commentHistory").get();

        this.myDir?.on("valueChanged", () => {
            this.emit("directoryChanged");
        });

        this.comments?.on("sequenceDelta", () => {
            console.log('changed')
            this.emit("commentsChanged");
        });
    }

    public emitEvent = (event: string) => {
        this.emit(event);
    }

}


export const FluentListInstantiationFactory = new DataObjectFactory(
    "fluentlist",
    FluentList,
    [SharedDirectory.getFactory(), SharedObjectSequence.getFactory()],
    {},
);


