document.addEventListener('DOMContentLoaded', () => {
    const auth = document.getElementById('auth');
    const Login_btn = document.getElementById('btn');
    const status = document.getElementById('status');

    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, (e) => {
        const url = e[0].url;
        var patten = /http.*\/\/.*twitter.com\/.*/;
        if (url.match(patten)) {
            status.classList.toggle('text-success');
            Login_btn.disabled = false;
            auth.disabled = false;
        } else {
            status.classList.toggle('text-danger');
            Login_btn.disabled = true;
            auth.disabled = true;
        }
        return true;
    });

    function Login() {
        if (auth.value == "") {
            alert("情報が不足しています");
        } else {
            sendToContents(auth.value)
        }
        return true;
    }

    function sendToContents(text) {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                    token: text
                },
                function (response) {});
        });
    }
    Login_btn.addEventListener('click', Login);
    return true;
})