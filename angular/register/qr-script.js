const size = Math.min(600, Math.min(window.innerWidth, window.innerHeight) * 0.8);
new QRCode(document.getElementById("qrcode"), {
    text: "http://gym.castrosoft.cl/",
    width: size,
    height: size
});