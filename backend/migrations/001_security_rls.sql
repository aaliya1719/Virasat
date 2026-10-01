-- Virasat Supabase security migration
-- Apply with a migration-capable PostgreSQL role in Supabase.
-- Existing chat rows with NULL user_id remain inaccessible until explicitly handled.

ALTER TABLE public.chat_messages
    ADD COLUMN IF NOT EXISTS user_id text;

CREATE INDEX IF NOT EXISTS ix_chat_messages_user_id
    ON public.chat_messages (user_id);

ALTER TABLE public.regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.places ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.regions, public.places,
    public.content_items, public.content_media, public.media,
    public.content_sources, public.sources
    FROM anon, authenticated;

GRANT SELECT ON public.regions, public.places, public.content_items,
    public.content_media, public.media, public.content_sources, public.sources
    TO anon, authenticated;

REVOKE ALL ON public.chat_messages FROM anon;
REVOKE UPDATE, DELETE ON public.chat_messages FROM authenticated;
GRANT SELECT, INSERT ON public.chat_messages TO authenticated;

DROP POLICY IF EXISTS regions_public_read ON public.regions;
CREATE POLICY regions_public_read
    ON public.regions FOR SELECT TO anon, authenticated
    USING (true);

DROP POLICY IF EXISTS places_public_read ON public.places;
CREATE POLICY places_public_read
    ON public.places FOR SELECT TO anon, authenticated
    USING (true);

DROP POLICY IF EXISTS content_items_public_read ON public.content_items;
CREATE POLICY content_items_public_read
    ON public.content_items FOR SELECT TO anon, authenticated
    USING (true);

DROP POLICY IF EXISTS content_media_public_read ON public.content_media;
CREATE POLICY content_media_public_read
    ON public.content_media FOR SELECT TO anon, authenticated
    USING (true);

DROP POLICY IF EXISTS media_public_read ON public.media;
CREATE POLICY media_public_read
    ON public.media FOR SELECT TO anon, authenticated
    USING (true);

DROP POLICY IF EXISTS content_sources_public_read ON public.content_sources;
CREATE POLICY content_sources_public_read
    ON public.content_sources FOR SELECT TO anon, authenticated
    USING (true);

DROP POLICY IF EXISTS sources_public_read ON public.sources;
CREATE POLICY sources_public_read
    ON public.sources FOR SELECT TO anon, authenticated
    USING (true);

DROP POLICY IF EXISTS chat_messages_owner_read ON public.chat_messages;
CREATE POLICY chat_messages_owner_read
    ON public.chat_messages FOR SELECT TO authenticated
    USING (user_id = (select auth.uid())::text);

DROP POLICY IF EXISTS chat_messages_owner_insert ON public.chat_messages;
CREATE POLICY chat_messages_owner_insert
    ON public.chat_messages FOR INSERT TO authenticated
    WITH CHECK (user_id = (select auth.uid())::text);

-- No UPDATE or DELETE policies are created for archive or chat tables.
-- Therefore anon/authenticated PostgREST clients cannot mutate them.
