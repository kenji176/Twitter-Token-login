window.onload = function () {

    function deleteAllCookies() {
        const cookies = document.cookie.split(';')
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i]
            const eqPos = cookie.indexOf('=')
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
            document.cookie = name + '=;max-age=0'
        }
    }

    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        deleteAllCookies()
        for (var key in message) {
            if (key == "token") {
                if (!(message.token == 'reset')) {
                    let token = message.token;
                    const text = 'auth_token=' + token;
                    document.cookie = text;
                    window.location.href = "https://twitter.com/home";
                }
            }
        }
        return true;
    })
}