import {supabase} from "../../../../supabaseClient";
import {CssTheme} from "@ui/themes/css-theme";
import {Settings} from "@ui/settings/settings";
import {User} from "@ui/types/user";
import {Localization} from "@ui/i18n/localization";
export async function fetchThemeData(): Promise<Pick<BootstrapData, 'themes'>> {
    const { data, error } = await supabase
        .from('theme_settings')
        .select('*')
        .eq('id', 1)
        .single();

    if (error || !data) {
        console.error('Error fetching theme data, using local fallback:', error);
        return {
            themes: localThemes,
        };
    }

    return {
        themes: [data as CssTheme],
    };
}

interface BootstrapData {
    themes?: CssTheme[];
    sentry_release?: string;
    is_mobile_device?: boolean;
    settings?: Settings;
    user?: User | null;
    i18n?: Localization;
}

const localThemes: CssTheme[] = [
    {
        id: 1,
        name: "Dark",
        is_dark: true,
        default_light: false,
        default_dark: true,
        type: "site",
        values: {
            "--be-foreground-base": "255 255 255",
            "--be-primary-light": "243 38 71",
            "--be-primary": "243 38 71",
            "--be-primary-dark": "243 38 71",
            "--be-on-primary": "246 246 246",
            "--be-background": "31 34 45",
            "--be-background-alt": "36 37 53",
            "--be-background-chip": "76 79 85",
            "--be-paper": "36 36 41",
            "--be-disabled-bg-opacity": "12%",
            "--be-disabled-fg-opacity": "30%",
            "--be-hover-opacity": "8%",
            "--be-focus-opacity": "12%",
            "--be-selected-opacity": "16%",
            "--be-text-main-opacity": "100%",
            "--be-text-muted-opacity": "70%",
            "--be-divider-opacity": "12%"
        },

    },
    {
        id: 2,
        name: "Light",
        is_dark: false,
        default_light: true,
        default_dark: false,
        type: "site",
        values: {
            "--be-foreground-base": "0 0 0",
            "--be-primary-light": "251 146 60",
            "--be-primary": "249 115 22",
            "--be-primary-dark": "234 88 12",
            "--be-on-primary": "255 255 255",
            "--be-background": "255 255 255",
            "--be-background-alt": "246 248 250",
            "--be-background-chip": "233 236 239",
            "--be-paper": "255 255 255",
            "--be-disabled-bg-opacity": "12%",
            "--be-disabled-fg-opacity": "26%",
            "--be-hover-opacity": "4%",
            "--be-focus-opacity": "12%",
            "--be-selected-opacity": "8%",
            "--be-text-main-opacity": "87%",
            "--be-text-muted-opacity": "60%",
            "--be-divider-opacity": "12%"
        },

    }
];
