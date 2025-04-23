import {supabase} from "../../../../supabaseClient";
export async function fetchThemeData() {
    const { data, error } = await supabase
        .from('theme_settings')
        .select('*')
        .eq('id', 1)
        .single();

    if (error) {
        console.error('Error fetching theme data:', error);
        return null!;
    }

    return {
        "themes": [
           data
        ],
        settings: {
            themes: {
                default_id: 'light',
            },
            // Add other fields your `Settings` interface requires if needed
        },
        user: null,

        // Optional: Add empty values to satisfy the type
        sentry_release: '',
        is_mobile_device: false,
        i18n: {
            locale: 'en',
            translations: {},
        },
    };}
