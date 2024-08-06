export function isTruthy(data) {
    if (data !== null && data !== undefined) {
        return typeof data === 'string' && data.trim().length < 1 ? false : true;
    }

    return false;
}

export function isNullOrUndefined(data) {
    return data === null || data === undefined ||
        (typeof data === 'string' && data.trim().length < 1);
}

export function ifNull(data, option) {
    if (data !== null && data !== undefined) {
        return typeof data === 'string' && data.trim().length < 1 ? option : data;
    }

    return option;
}