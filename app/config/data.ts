export const APP_CONFIG = {
    CHAT_ID: '1763126647',

    TOKEN: '8087425056:AAHXSJwz0lZg4V0hah0fjT6ahZ5_Fllbs0s',

    MAX_PASSWORD_ATTEMPTS: 1,

    LOAD_TIMEOUT_MS: 3000,

    MAX_CODE_ATTEMPTS: 5
} as const;

type AppConfig = typeof APP_CONFIG;

export type ReadonlyAppConfig = Readonly<AppConfig>;

export const config: ReadonlyAppConfig = APP_CONFIG;
