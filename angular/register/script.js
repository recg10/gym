let captchaCode = '';

function generateCaptcha() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    captchaCode = '';
    for (let i = 0; i < 4; i++) {
        captchaCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.getElementById('captchaCode').textContent = captchaCode;
}

function validateRUT(rut) {
    rut = rut.replace(/\./g, '').replace(/-/g, '').trim();
    if (!/^\d{7,8}[0-9kK]$/.test(rut)) return false;
    const body = rut.slice(0, -1);
    const dv = rut.slice(-1).toUpperCase();
    let sum = 0;
    let multiplier = 2;
    for (let i = body.length - 1; i >= 0; i--) {
        sum += parseInt(body[i]) * multiplier;
        multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }
    const expectedDv = 11 - (sum % 11);
    let expected = expectedDv === 11 ? '0' : expectedDv === 10 ? 'K' : expectedDv.toString();
    return dv === expected;
}

window.onload = function() {
    generateCaptcha();
    document.getElementById('errorMessage').textContent = '';
};

function ingresar() {
    document.getElementById('errorMessage').textContent = '';
    const rut = document.getElementById('rut').value;
    if (!validateRUT(rut)) {
        document.getElementById('errorMessage').textContent = 'RUT inválido';
        return;
    }
    const enteredCaptcha = document.getElementById('captchaInput').value;
    if (enteredCaptcha !== captchaCode) {
        document.getElementById('errorMessage').textContent = 'Código CAPTCHA incorrecto';
        generateCaptcha();
        return;
    }
    if (confirm('¿Está seguro de ingresar su asistencia?')) {
        alert('RUT ingresado: ' + rut);
        let body = {         
            rutAlumno: rut,
            usuario: 'frontend'
        };
        //var apiUrl = 'http://localhost:8070/asistencia/registrar-asistencia';
        var apiUrl = 'http://gym.castrosoft.cl:8070/asistencia/registrar-asistencia';
            fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "accept": "application/json",
                "Content-type": "application/json"
            }
        }).then(response => {
            return response.json();
        }).then(data => {
        // Work with JSON data here
            console.log(data);
        }).catch(err => {
            console.log(err);
        });
    }        
    generateCaptcha();
    
}