import i18next from "i18next";
import Backend from 'i18next-fs-backend';
import * as middleware from "i18next-http-middleware";
import { join } from "path";

const localesPath = join(process.cwd(), 'src', 'locales');

i18next
    .use(Backend)
    .use(middleware.LanguageDetector)
    .init({
        backend: {
            loadPath: join(localesPath, "{{lng}}/{{ns}}.json"),
        },
        fallbackLng: 'en',
        preload: ['en', 'ar'],
        ns: ['common'],
        defaultNS: 'common',
        detection: {
            order: ["querystring", "header", "cookie"],
            lookupQuerystring: "lang",
            caches: false,
        },
        interpolation: {
            escapeValue: false,
        },
    });

export default { i18next, middleware };