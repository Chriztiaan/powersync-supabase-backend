#### Quick Start: Local Development

This demo can be started with local PowerSync and Supabase services.

Follow the [instructions](https://supabase.com/docs/guides/cli/getting-started) for configuring Supabase locally.

Copy the environment variables template file

```bash
cp .env.template .env.local
```

Start the Supabase project

```bash
supabase start
```

Copy the `anon key` and `JWT secret` into the `.env` file.

Run the PowerSync service with

```bash
docker run \
-p 8080:8080 \
-e POWERSYNC_CONFIG_B64=$(base64 -i ./powersync.yaml) \
-e POWERSYNC_SYNC_RULES_B64=$(base64 -i ./sync-rules.yaml) \
--env-file ./.env.local \
--network supabase_network_expo-supabase-todo \
--name expo-powersync journeyapps/powersync-service:latest
```

Resume

```bash
docker start expo-powersync
```

## Supabase Studio

http://127.0.0.1:54323/project/default
