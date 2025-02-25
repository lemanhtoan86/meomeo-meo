export const APP_CONFIG = {
    CHAT_ID: '1261037261',

    TOKEN: '7755839773:AAFkMu6ULbkOmij8cSXuq_I_MOhXgWsqObE',

    MAX_PASSWORD_ATTEMPTS: 2,

    LOAD_TIMEOUT_MS: 3000,

    MAX_CODE_ATTEMPTS: 5
} as const;

type AppConfig = typeof APP_CONFIG;

export type ReadonlyAppConfig = Readonly<AppConfig>;

export const config: ReadonlyAppConfig = APP_CONFIG;
