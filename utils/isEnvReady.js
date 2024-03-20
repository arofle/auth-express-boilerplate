
export default function isEnvReady() {
    if (!process.env.SECRET) {
        return false
    }

    if (!process.env.REFRESH_TOKEN_EXPIRATION) {
        return false
    }

    if (!process.env.SERVER_STAGE) {
        return false
    }

    if (!process.env.PORT) {
        return false
    }

    if (!process.env.HOST) {
        return false
    }

    if (!process.env.SMTP_HOST) {
        return false
    }

    if (!process.env.SMTP_PORT) {
        return false
    }

    if (!process.env.EMAIL_SMTP_USER) {
        return false
    }

    if (!process.env.EMAIL_SMTP_PASSWORD) {
        return false
    }

    if (!process.env.SMTP_USE_TLS) {
        return false
    }

    if (!process.env.EMAIL_FROM) {
        return false
    }

    if (!process.env.WEBSITE_DOMAIN_FOR_EMAIL_MESSAGES) {
        return false
    }

    return true
}