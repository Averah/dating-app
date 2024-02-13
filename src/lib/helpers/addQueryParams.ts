export function getQueryParams(params: Record<string, string | null | undefined>) {
    const searchParams = new URLSearchParams(window.location.search);
    Object.entries(params).forEach(([name, value]) => {
        if (value !== undefined && value !== null) {
            searchParams.set(name, value);
        }
    });
    return `?${searchParams.toString()}`;
}

/**
 * Функция добавления параметров строки запроса в URL
 * @param params
 */
export function addQueryParams(params: Record<string, string | null | undefined>) {
    window.history.pushState(null, '', getQueryParams(params));
}
