import * as React from "react";
import {
  initializeIcons,
  Stack,
} from "@fluentui/react";
import { SharedString, CommentList, DataList } from './components'

initializeIcons();

export const View = () => {
  return (
    <Stack gap={24}>
      <DataList />
      <CommentList />
      <SharedString />
    </Stack>
  );
};
