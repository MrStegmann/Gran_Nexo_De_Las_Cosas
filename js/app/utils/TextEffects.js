// Función para decodificar texto estilo Matrix / Runas
export function scrambleText(element, finalString) {
    const chars = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛟᛞ';
    let iteration = 0;
    
    clearInterval(element.scrambleInterval);
    
    element.scrambleInterval = setInterval(() => {
        element.innerText = finalString.split('').map((letter, index) => {
            if (index < iteration) return finalString[index];
            return chars[Math.floor(Math.random() * chars.length)];
        }).join('');
        
        if (iteration >= finalString.length) {
            clearInterval(element.scrambleInterval);
            element.innerText = finalString; // Asegurar estado final
        }
        iteration += 1/3; // Velocidad de decodificación
    }, 30);
}
