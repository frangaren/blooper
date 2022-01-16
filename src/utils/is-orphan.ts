export function isOrphan() {
    /** Based on https://github.com/openstyles/stylus/blob/0c8e69fb/content/install-hook-openusercss.js#L149-L168 */
    const lang = chrome.i18n && chrome.i18n.getUILanguage();
    if (lang === undefined) {
        return true;
    }
    return false;
}
