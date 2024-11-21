import re

# Función para limpiar el HTML
def clean_html(dirty_html):
    # Diccionario de elementos eliminados
    eliminados = {
        "emptyParagraphs": [],
        "diviBlocks": [],
        "imagesExtracted": [],
        "imagesWithLinksExtracted": [],
        "reactIdsRemoved": [],
        "videosExtracted": []  # Nuevo campo para videos
    }

    # Función para limpiar párrafos vacíos
    def clean_empty_paragraphs(content):
        pattern = r'<p[^>]*>(?:\s|&nbsp;)*<\/p>'
        matches = re.findall(pattern, content) or []
        eliminados["emptyParagraphs"].extend(matches)
        return re.sub(pattern, '', content)

    # Función para extraer imágenes sin URL
    def extract_images(content):
        img_pattern = r'\[et_pb_image[^\]]*src="([^"]+)"[^\]]*\]'
        matches = re.findall(img_pattern, content)
        eliminados["imagesExtracted"].extend(matches)
        return re.sub(img_pattern, r'<img src="\1">', content)

    # Función para extraer imágenes con URL
    def extract_images_with_links(content):
        img_with_url_pattern = r'\[et_pb_image[^\]]*src="([^"]+)"[^\]]*url="([^"]+)"[^\]]*\]'
        matches = re.findall(img_with_url_pattern, content)
        for match in matches:
            eliminados["imagesWithLinksExtracted"].append({"src": match[0], "url": match[1]})
        return re.sub(img_with_url_pattern, r'<a href="\2" target="_blank"><img src="\1"></a>', content)

    # Función para extraer videos
    def extract_videos(content):
        # Definimos el patrón para identificar videos, como YouTube, Vimeo, o simplemente un iframe
        video_pattern = r'\[et_pb_video[^\]]*src="([^"]+)"[^\]]*\]'
        matches = re.findall(video_pattern, content)
        eliminados["videosExtracted"].extend(matches)
        return re.sub(video_pattern, r'<video src="\1" controls></video>', content)

    # Función para limpiar bloques de código divi
    def clean_divi_blocks(content):
        patterns = [
            r'\[et_pb_text[^\]]*\](?:\s|&nbsp;)*\[\/et_pb_text\]',
            r'\[et_pb_section[^\]]*\](?:\s|&nbsp;)*\[\/et_pb_section\]',
            r'\[et_pb_row[^\]]*\](?:\s|&nbsp;)*\[\/et_pb_row\]',
            r'\[et_pb_column[^\]]*\](?:\s|&nbsp;)*\[\/et_pb_column\]',
            r'\[et_pb_\w+[^\]]*\]',
            r'\[\/et_pb_\w+\]'
        ]
        for pattern in patterns:
            matches = re.findall(pattern, content) or []
            eliminados["diviBlocks"].extend(matches)
            content = re.sub(pattern, '', content)
        return content

    # Función para eliminar data-reactid
    def remove_data_reactid(content):
        pattern = r'\sdata-reactid="[^"]*"'
        matches = re.findall(pattern, content) or []
        eliminados["reactIdsRemoved"].extend(matches)
        return re.sub(pattern, '', content)

    # Limpiar el HTML
    cleaned_html = dirty_html
    cleaned_html = remove_data_reactid(cleaned_html)
    cleaned_html = extract_images_with_links(cleaned_html)
    cleaned_html = extract_images(cleaned_html)
    cleaned_html = extract_videos(cleaned_html)  # Llamada a la función de videos
    cleaned_html = clean_divi_blocks(cleaned_html)
    cleaned_html = clean_empty_paragraphs(cleaned_html)

    # Limpiar saltos de línea y espacios innecesarios
    cleaned_html = re.sub(r'\n\s*\n', '\n', cleaned_html)
    cleaned_html = re.sub(r'\s+', ' ', cleaned_html).strip()

    # Generar el reporte
    report_content = "<ul>"
    for category, items in eliminados.items():
        if items:
            report_content += f"<li><span class='category'>{category.replace('([A-Z])', r' \1').upper()}:</span><ul>"
            for item in items:
                if isinstance(item, dict):
                    report_content += f"<li><span class='item'>src: <span class='url'>{item['src']}</span>, url: <span class='url'>{item['url']}</span></span></li>"
                else:
                    report_content += f"<li><span class='item'>{item}</span></li>"
            report_content += "</ul></li>"

    report_content += "</ul>"

    return cleaned_html, report_content


# Ejemplo de uso
dirty_html = '''<p>[/et_pb_image][et_pb_text admin_label="Text" background_layout="light" text_orientation="justified" use_border_color="off" border_color="#ffffff" border_style="solid"]</p>
<p><strong><em>Las áreas densas, compuestas principalmente de edificios de departamentos, son aquellas que más requieren de espacios verdes públicos, como plazas y parques. En la imagen se observa el barrio de Pocitos, en Montevideo, Uruguay.</em></strong></p>
<p>[/et_pb_text][et_pb_image admin_label="Image" src="https://lacasadejuana.cl/wp-content/uploads/2018/02/uri_feb_11.jpg" show_in_lightbox="off" url_new_window="off" use_overlay="off" animation="off" sticky="off" align="left" force_fullwidth="off" always_center_on_mobile="on" use_border_color="off" border_color="#ffffff" border_style="solid" url="perezmenaelisa.wix.com/elisamalicia"]</p>
<p>&nbsp;</p>
<p>[/et_pb_image][/et_pb_column][/et_pb_row][et_pb_row admin_label="Row"][et_pb_column type="1_4"][et_pb_image admin_label="Image" src="https://lacasadejuana.cl/wp-content/uploads/2016/12/colodro_retrato.jpg" show_in_lightbox="off" url_new_window="off" use_overlay="off" animation="off" sticky="off" align="left" force_fullwidth="off" always_center_on_mobile="on" use_border_color="off" border_color="#ffffff" border_style="solid" url="perezmenaelisa.wix.com/elisamalicia"]</p>
<p>&nbsp;</p>''' 
cleaned_html, report = clean_html(dirty_html)

# Imprimir el reporte HTML
with open("reporte.html", "w") as file:
    file.write(report)

# Imprimir el HTML limpio
with open("cleaned_html.html", "w") as file:
    file.write(cleaned_html)

    print(cleaned_html)
