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

const thoughts = new Table({
  content: column.text,
  created_at: column.text,
  created_by: column.text,
});

const reactions = new Table(
  {
    thought_id: column.text,
    user_id: column.text,
    emoji: column.text,
    created_at: column.text,
  },
  { indexes: { thought: ["thought_id"] } }
);

export const AppSchema = new Schema({
  thoughts,
  reactions,
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
