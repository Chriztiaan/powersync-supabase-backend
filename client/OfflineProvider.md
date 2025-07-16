```tsx
import {
  createBaseLogger,
  LogLevel,
  PowerSyncContext,
  PowerSyncDatabase,
  SQLJSOpenFactory,
  column,
  Schema,
  Table,
} from "@powersync/react-native";

import React from "react";

const todos = new Table(
  {
    list_id: column.text,
    photo_id: column.text,
    created_at: column.text,
    completed_at: column.text,
    description: column.text,
    created_by: column.text,
    completed_by: column.text,
    completed: column.integer,
  },
  { indexes: { list: ["list_id"] } }
);

const lists = new Table({
  created_at: column.text,
  name: column.text,
  owner_id: column.text,
});

const AppSchema = new Schema({
  todos,
  lists,
});

export const powerSync = new PowerSyncDatabase({
  schema: AppSchema,
  database: new SQLJSOpenFactory({
    dbFilename: "app.db",
  }),
});

export const SystemProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <PowerSyncContext.Provider value={powerSync as any}>
      {children}
    </PowerSyncContext.Provider>
  );
};

export default SystemProvider;
```
