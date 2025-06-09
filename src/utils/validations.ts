import { t } from "i18next";

export const required = t('validation.required');

export const userName = {
    required,
    minLength: {
        value: 3,
        message: t('validation.minLength', { count: 3 })
    },
    maxLength: {
        value: 20,
        message: t('validation.maxLength', { count: 20 })
    },
}

export const email = {
    required,
    pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: t('validation.email')
    }
}

export const password = {
    required,
    minLength: {
        value: 8,
        message: t('validation.minLength', { count: 8 })
    }
}