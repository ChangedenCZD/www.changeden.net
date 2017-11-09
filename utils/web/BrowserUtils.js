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
    let iconData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAACSVBMVEUAAADiUSPaTB3ORRr/ViD9VR/TRxvVRhrXSh3pTh3fShvhTB26Pxj5VB/cShzSRxviTR27VDPQRRn5VSDIQxn5VR/+ViH9WCLpUCDLcFH/VyDaSRv/WCL1Uh6HZ1blTBz4Ux/RRRjIQhnlTR3aSx7CPxfXRxnEQhnjTR36ViDRRBjLRBrbSh3JQRbEPxX/Vx/eSx3WSBujVjvlTBvYRhfLRRryUh/oTh35VCDTSh+RWkLoTh7WSBuORy78VyHlWSr/Vh/MWjTjTB1qYlbu5uTzUR16cWTfXjXQRhvqTh3VSh7gTB3+VSDNQxfgTB3XRhjaTB/YSRznTh7wSxfPRhu1PRf6VCDPUSfGSB/QQxfcRBTtUB/WQhTMQBPgTyDsUB+0PBb0UyD/VB3BPxbcTB3KQBXgTR/cTB3DSCG4OxTgTBzaShzmTh7EWDa+WTXkTBzvUR/zUB3zUB3xUh/LUy2wRyXxTRm4UC3tVSXnTh25VzXaSx7wTxy4PhjLRRqPNxviRhW+WjqyWTroTx7PRhuXOhzRUinBQhnaShzwThm7PxjcRBTWSBvCSiK8PxjmTh7sTx7JRBrdVyv/ViH2VCD5VSD5ThjTXzqiRyj+WCL/qIvpTx7SXjm9X0GSVDy6RB+gPR3tUB+haE/oUCDDUS31bD3/VyLdRBSCSDHJQhepYkblZTzTRBeba1PHQxrvn4bZShzeSBmYb1rxUh/IPxOaZk9aTUHVSBzSRhr/nn/WopLpTRt1ZFbORhuuQR/9sZeadF6RbFb2nH9y2vARAAAAw3RSTlMAAgm2GAe5saibmpaTkY6Ihn91ZlBEQDYzMigaExIP6N7Vy8nHxbatqaimn5qTjoKCgXZvaGdmW1pXVEc/KiYgGhcXEhAPCwXx6+ng397Y09DQz8zKyMfExMHBv728ubi2tLGxsK+urqysp6Wjn56dnJyal5WUk5GQkI6Li4mIhYWCgoGAf358e3p6eHd2dnV0cnFxb21ramppYmJgX19fX1RTUlFPTkxISEdGRUE/PTc3NjAwLSwsJiQjIR4eHRgVCgndrKrGAAABlUlEQVQoz0XRw3ZlURRG4bnPtW3Etu1KyrZt27Zt23ZV/GQZ4+x7k68zG2v1flSDwF+kz/fo+4cUX3iW1/NuARDLzgiuyhyF6le+RWu+4AGIOveaN1esSRw6NIbcHVNKonzfkrv6qtG+rQmpfnebIORa9NwSFEDE0Ivq6xXZx2NbUb09KXu+RbYxVY3g/2EARh9BcmQIwrU2HTVP5EdRM4Byv+LSXTR6P08PKKh+FHg812+U6mPKQcuh49VLLyskKEUrzjQEz9XCC5O7br0gSZQ5tbhLHTrqasoaTsRIasyepsU7//Qr/mj0vqowCbrMxY4ov5csTwmLHBNVfqSH0ye02zvpvHhndkvhJD/eaqTytIAo1IELurOmBmg3+pAGiO/j3c9yIOLdDtZUQdLRrp2bngGInLybG3wMe3Rszh5UGvMMGyM61matW9YPfElrtqaUMMJYMHPcN67ZDCasY/KQ4qec+2fxKf1j10R78fhAT/pWpKb84pWTWz8sqOdNZaVbG5m7i4TQg9vvadsYQu7jegkMAV2/Vcn9dBLvAAAAAElFTkSuQmCC';
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