/**
 * Created by Changeden on 2017/7/13.
 */
export const os = (() => {
    const ua = navigator.userAgent;
    const isWindowsPhone = /(?:Windows Phone)/.test(ua);
    const isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone;
    const isAndroid = /(?:Android)/.test(ua);
    const isFireFox = /(?:Firefox)/.test(ua);
    const isChrome = /(?:Chrome|CriOS)/.test(ua);
    const isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua));
    const isPhone = /(?:iPhone)/.test(ua) && !isTablet;
    const isIOS = /(?:iOS)/.test(ua);
    const isPc = !isPhone && !isAndroid && !isSymbian;
    return {
        isTablet: isTablet,
        isPhone: isPhone || isIOS,
        isAndroid: isAndroid,
        isMobile: isPhone || isAndroid || isTablet || isIOS,
        isPC: isPc
    };
})();
export const setShotCutIcon = () => {
    let document = window.document;
    let iconData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0U1REMxODZDNTQyMTFFN0IwQkVGNzY5QzFGNTA5MEQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0U1REMxODdDNTQyMTFFN0IwQkVGNzY5QzFGNTA5MEQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3RTVEQzE4NEM1NDIxMUU3QjBCRUY3NjlDMUY1MDkwRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3RTVEQzE4NUM1NDIxMUU3QjBCRUY3NjlDMUY1MDkwRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnVgLfYAABQVSURBVHjavFsJmBTV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';
    let icon = document.createElement('link');
    icon.rel = 'icon';
    icon.type = 'image/png';
    icon.href = iconData;
    document.head.appendChild(icon);
};

export function to (url) {
    window.location.href = url;
}

export function refresh () {
    window.location.reload();
}

export function open (url) {
    window.open(url);
}

export const cssSupports = (() => {
    let div = document.createElement('div');
    let vendors = 'Khtml O Moz Webkit'.split(' ');
    let len = vendors.length;
    return function (prop) {
        if (prop in div.style) {
            return true;
        }
        if ('-ms-' + prop in div.style) {
            return true;
        }
        prop = prop.replace(/^[a-z]/, (val) => {
            return val.toUpperCase();
        });
        while (len--) {
            if (vendors[len] + prop in div.style) {
                return true;
            }
        }
        return false;
    };
})();
export const isTest = (() => {
    let hostname = window.location.hostname;
    if (hostname.indexOf('192.168.1') === 0) {
        return true;
    } else return hostname.indexOf('localhost') === 0;
})();