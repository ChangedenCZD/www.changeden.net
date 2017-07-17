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
    let iconData = 'data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADbklEQVRYhbWXT2hcVRTGf9/rYxhCCMMgIWAXjyBJCUGCyFTiH7ooUrKKmJSAIO5EXBRRERfSpQuXrrqUbkrSRdpd1YXEIMaFliIxSAkPCRJCDCGEMMSZ97l4M+00740zk0y+3X33vHN+775zz71H9EG+Hl21eQeIgE3BPS3F97t5Vxlns1EhCRlDzAOjgVijzjJ1trUc19oE/woYNYSCGvAL4mawGP/UCSDIOAypID4H3hPMGG444EuHTHk2CjP25mNgDGlI0gDSEDCBeaubFXjGoeejkqEiuIZUbjwug8sWsUMOgD8btiEwYvQaUDzht2x4pRuAZ1fAlIDnW4KnSseziJe9EBUBEigmUEEMohN+pKKkkd4B/keSJhGvJglR41EReD3X2CSYau8AIfuIf2wyydZwPI2ZBpApCF7Id+sq9k7PALoT72P9Dey1sR8TjKfGBMBQG7uqxXbPAACWt5Af5RmnWc5kcj2aBhVAU3l2FnuItVMByGzIfNf2DXPJ5kPjz4DBNlaDwLgXooudALKFaC4qWFwBvkYaywK4ajgEau0z3cfADvA4MfeUsKg6O0FOIcsAACRz0SjiA6RPOn1BJ9lex6wKbgse6m582Dqfuw0Fe5g17OOzAkiakHgX8b5b6khT2dI6GwUWJdLafiwonBUCqWh7TnDgOrvA782p7C64QAl4w+IjSe2S7BQMKgIzwEwyFz35qCxAwBXgU9FdKe2RIgIuCy7lAng+qgjeRprse/BmDDFRD7iaD5CeYJXzCt7Q8JNq2grghaiEGEd0LB5nkWBIMNwcP90FdZ4DyqTJcp4IIS33h6e/wIwApfMNnlVrHRigH3u+k+wqcNActibhFu2P4X5qG9jIAoTsIg7z3uizHgt+zADoTryD9Zd9jqtgqph1/uXnDEA6798g/zLSJ4L7iCXDUS4AYhV4gNnve2j7B4slxKNgOU5yAS4sxruC78FdtVU9RP8WuAWsBovxQetU5jiW2bD4BrsMehOddms6Ib1XrGBuB7CipTiTX7k3Is9HA4YXgS8spoBhpRWsi7g+AnYRWzYPA3PLsBHcjXMvN7kAAF5IW68k4QZwTabstIQW1LJyTpvRY4laoxnZBFYQD7ppTtsCnIC5SJ2XErgMTAhaW7d9w7rEHyT8qhqbWo6P2vk6qf8AeJsvqElhwKgAAAAASUVORK5CYII=';
    let icon = document.createElement('link');
    icon.rel = 'icon';
    icon.type = 'image/x-icon';
    icon.href = iconData;
    document.head.appendChild(icon);
};

export function to (url) {
    window.location.href = url;
}