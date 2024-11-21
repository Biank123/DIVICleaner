document.addEventListener("DOMContentLoaded", () => {
// Función para pegar del portapapeles
function pasteHTML() {
    navigator.clipboard.readText().then(text => {
        document.getElementById("dirtyHTML").value = text;
    }).catch(err => alert("Error al pegar: " + err));
}

// Función para copiar el código limpio
function copyCleanHTML() {
    const cleanHTML = document.getElementById("cleanHTML").value;
    navigator.clipboard.writeText(cleanHTML).then(() => {
        alert("HTML limpio copiado al portapapeles.");
    }).catch(err => alert("Error al copiar: " + err));
}

// Función para limpiar el html
function cleanHTML() {
    const dirtyHTML = document.getElementById("dirtyHTML").value;
    const cleanHTMLTextarea = document.getElementById("cleanHTML");

    // objeto de los elementos eliminados al limpiar el html (vacíos)
    const eliminados = {
        emptyParagraphs: [],
        diviBlocks: [],
        imagesExtracted: [],
        imagesWithLinksExtracted: [],
        reactIdsRemoved: [],
        videosExtracted: [] 
    };

    // Función para limpiar párrafos vacíos <p>&nbsp;</p>
    function cleanEmptyParagraphs(content) {
        const pattern = /<p[^>]*>(?:\s|&nbsp;)*<\/p>/gi;
        const matches = content.match(pattern) || [];
        eliminados.emptyParagraphs.push(...matches);
        return content.replace(pattern, '');
    }

    // Función para extraer imágenes sin url
    function extractImages(content) {
        const imgPattern = /\[et_pb_image[^\]]*src="([^"]+)"[^\]]*\]/gi;
        const matches = [...content.matchAll(imgPattern)];
        matches.forEach(match => eliminados.imagesExtracted.push(match[1]));
        return content.replace(imgPattern, (match, src) => `<img src="${src}">`);
    }

    // Función para extraer imágenes con url
    function extractImagesWithLinks(content) {
        const imgWithUrlPattern = /\[et_pb_image[^\]]*src="([^"]+)"[^\]]*url="([^"]+)"[^\]]*\]/gi;
        const matches = [...content.matchAll(imgWithUrlPattern)];
        matches.forEach(match => eliminados.imagesWithLinksExtracted.push({ src: match[1], url: match[2] }));
        return content.replace(imgWithUrlPattern, (match, src, url) => `<a href="${url}" target="_blank"><img src="${src}"></a>`);
    }

    // Función para limpiar bloques de código de divi 
    function cleanDiviBlocks(content) {
        const patterns = [
            /\[et_pb_text[^\]]*\](?:\s|&nbsp;)*\[\/et_pb_text\]/gi,
            /\[et_pb_section[^\]]*\](?:\s|&nbsp;)*\[\/et_pb_section\]/gi,
            /\[et_pb_row[^\]]*\](?:\s|&nbsp;)*\[\/et_pb_row\]/gi,
            /\[et_pb_column[^\]]*\](?:\s|&nbsp;)*\[\/et_pb_column\]/gi,
            /\[et_pb_\w+[^\]]*\]/gi,
            /\[\/et_pb_\w+\]/gi
        ];
        patterns.forEach(pattern => {
            const matches = content.match(pattern) || [];
            eliminados.diviBlocks.push(...matches);
            content = content.replace(pattern, '');
        });
        return content;
    }

    // Función para los data-reactid extra en cada span
    function removeDataReactId(content) {
        const pattern = /\sdata-reactid="[^"]*"/gi;
        const matches = content.match(pattern) || [];
        eliminados.reactIdsRemoved.push(...matches);
        return content.replace(pattern, '');
    }

    // Función para extraer videos
    function extractVideos(content) {
        const videoPattern = /\[et_pb_video[^\]]*src="([^"]+)"[^\]]*\]/gi;
        const matches = [...content.matchAll(videoPattern)];
        matches.forEach(match => eliminados.videosExtracted.push(match[1]));
        return content.replace(videoPattern, (match, src) => `<video controls><source src="${src}" type="video/mp4"></video>`);
    }

    //Toma el valor que tiene el HTML sopa
    let cleanedHTML = dirtyHTML; 

    cleanedHTML = removeDataReactId(cleanedHTML); // Procesa data-reactid
    cleanedHTML = extractImagesWithLinks(cleanedHTML); // Procesa imágenes con links
    cleanedHTML = extractImages(cleanedHTML); // Procesa imágenes básicas
    cleanedHTML = extractVideos(cleanedHTML); // Procesa videos
    cleanedHTML = cleanDiviBlocks(cleanedHTML); // Procesa bloques divi
    cleanedHTML = cleanEmptyParagraphs(cleanedHTML); // Procesa párrafos vacíos

    // para limpiar el contenido de posibles saltos de línea innecesarios, espacios extra y otros caracteres no deseados
    cleanedHTML = cleanedHTML.replace(/\n\s*\n/g, '\n').replace(/\s+/g, ' ').trim();

    // Para el reporte de lo realizado al limpiar el código sopa
    let reportContent = "<ul>";

    // Para cada elemento en el objeto de eliminados...
    for (const key in eliminados) {
        if (eliminados[key].length) {
            // Añade la categoría 
            reportContent += `<li><span class="category">${key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</span><ul>`;

            eliminados[key].forEach(item => {
                if (typeof item === 'object') {
                    // Si el elemento es un objeto (con propiedades src y url)
                    reportContent += `<li><span class="item">src: <span class="url">${item.src}</span>, url: <span class="url">${item.url}</span></span></li>`;
                } else {
                    // Si es solo un string (texto)
                    reportContent += `<li><span class="item">${item}</span></li>`;
                }
            });

            // Se cierra la lista de elementos 
            reportContent += "</ul></li>";
        }

        // Al construir el reporte, si el bloque tiene mucho texto largo, se le añade una clase extra
        eliminados[key].forEach(item => {
            let itemClass = '';
            if (typeof item === 'string' && item.length > 100) { // Ajusta el valor a tu necesidad
                itemClass = 'long-item'; // Clase para los bloques más largos
            }
            if (typeof item === 'object') {
                reportContent += `<div class="item ${itemClass}">src: ${item.src}, url: ${item.url}</div>`;
            } else {
                reportContent += `<div class="item ${itemClass}">${item}</div>`;
            }
        });
    }

    // Cerramos la lista principal del reporte
    reportContent += "</ul>";

    // Insertamos el reporte generado en el div correspondiente
    document.getElementById('report-list').innerHTML = reportContent.trim();
    cleanHTMLTextarea.value = cleanedHTML;

}

// Función para previsualizar el html limpio
function previewHTML() {
    const cleanHTML = document.getElementById("cleanHTML").value;
    const previewWindow = window.open('', '_blank'); // Para que se abra en otra pestaña
    previewWindow.document.write(cleanHTML);
    previewWindow.document.close();
}
document.getElementById("pasteButton").addEventListener("click", pasteHTML);
document.getElementById("copyButton").addEventListener("click", copyCleanHTML);
document.getElementById("cleanButton").addEventListener("click", cleanHTML);
document.getElementById("previewButton").addEventListener("click", previewHTML);
})

