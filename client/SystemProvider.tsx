import { SupabaseConnector } from '@/library/powersync/SupabaseConnector';
import { createBaseLogger, LogLevel, PowerSyncContext, PowerSyncDatabase, SQLJSOpenFactory } from '@powersync/react-native';
import { AppSchema } from './AppSchema';

import React from 'react';

const SupabaseContext = React.createContext<SupabaseConnector | null>(null);
export const useSupabase = () => React.useContext(SupabaseContext);

export const powerSync = new PowerSyncDatabase({
    schema: AppSchema,
    database: new SQLJSOpenFactory({
        dbFilename: 'app.db'
    })
});

export const connector = new SupabaseConnector();
powerSync.connect(connector);

const logger = createBaseLogger();
logger.useDefaults();
logger.setLevel(LogLevel.DEBUG);

export const SystemProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <PowerSyncContext.Provider value={powerSync as any}>
            <SupabaseContext.Provider value={connector}>{children}</SupabaseContext.Provider>
        </PowerSyncContext.Provider>
    );
};

export default SystemProvider;
