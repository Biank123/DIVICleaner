﻿# DIVICleaner
El código toma el html con código divi sobrante y lo corrige en un html con etiquetas correctas y sin el código extra:

##CÓDIGO CON SHORTCODE DE DIVI PARA TOMAR DE EJEMPLO:

#PÁRRAFO INÚTIL: 
[et_pb_section admin_label="section" transparent_background="off" background_color="#ffffff" allow_player_pause="off" inner_shadow="off" parallax="off" parallax_method="off" padding_mobile="off" make_fullwidth="off" use_custom_width="off" width_unit="on" make_equal="off" use_custom_gutter="off"][et_pb_row admin_label="row" make_fullwidth="off" use_custom_width="off" width_unit="on" use_custom_gutter="off" padding_mobile="off" allow_player_pause="off" parallax="off" parallax_method="off" make_equal="off" parallax_1="off" parallax_method_1="off" column_padding_mobile="on"][et_pb_column type="4_4"][et_pb_text admin_label="Text" background_layout="light" text_orientation="justified" use_border_color="off" border_color="#ffffff" border_style="solid"] 

#IMAGEN CON URL A REEMPLAZAR POR HREF: 
<p>[/et_pb_text][/et_pb_column][/et_pb_row][et_pb_row admin_label="Row"][et_pb_column type="1_4"][et_pb_image admin_label="Image" src="https://lacasadejuana.cl/wp-content/uploads/2016/12/Coca-Ruiz.png" show_in_lightbox="off" url_new_window="off" use_overlay="off" animation="off" sticky="off" align="left" force_fullwidth="off" always_center_on_mobile="on" use_border_color="off" border_color="#ffffff" border_style="solid" url="perezmenaelisa.wix.com/elisamalicia"]</p>

#ESPACIO: 
<p>&nbsp;</p>

#PÁRRAFO INÚTIL 2: 
<p>[/et_pb_text][et_pb_text admin_label="Texto" background_layout="light" text_orientation="left" use_border_color="off" border_color="#ffffff" border_style="solid"]</p>

#PÁRRAFO INÚTIL 3:
<p><strong><em> </em></strong></p>

#IMAGEN SIN URL: 
<p>[/et_pb_text][/et_pb_column][et_pb_column type="1_3"][et_pb_image admin_label="Image" src="https://lacasadejuana.cl/wp-content/uploads/2017/11/salas_ene_02.jpeg" show_in_lightbox="off" url_new_window="off" use_overlay="off" animation="left" sticky="off" align="left" force_fullwidth="off" always_center_on_mobile="on" use_border_color="off" border_color="#ffffff" border_style="solid"]<br />[/et_pb_image][et_pb_text admin_label="Text" background_layout="light" text_orientation="justified" use_border_color="off" border_color="#ffffff" border_style="solid"]</p>

#PÁRRAFO INÚTIL 4: 
<p>[/et_pb_text][/et_pb_column][/et_pb_row][/et_pb_section]</p>

#PÁRRAFO NORMAL: 
<p>Lo que vale para un espacio en que habitamos, debería valer también para un espacio abierto, como un parque. En un parque, esa sensación de que el orden es bueno se experimenta muy fácilmente en el que quizá sea uno de los parques más ordenados del mundo: el Jardin des Tuileries en el centro de Paris. El jardín, que separa el Museo de Louvre de la Place de la Concorde, es un lugar de paseo para parisinos y turistas, y se pueden ver estatuas de Maillol y de Rodin. Además, en el ala surponiente del parque, el Musée de l’Orangerie exhibe las obras de Monet, entre muchas otras. El Jardín de Tuileries es obviamente espectacular y acuna el tesoro invisible de los acontecimientos históricos y artísticos más importantes de Francia y de Europa.</p>

#VARIAS IMÁGENES EN UN MISMO PÁRRAFO: 
<p>[/et_pb_text][et_pb_image admin_label="Image" src="https://lacasadejuana.cl/wp-content/uploads/2017/06/dato_lobo_02.jpg" show_in_lightbox="off" url_new_window="off" use_overlay="off" animation="left" sticky="off" align="left" force_fullwidth="off" always_center_on_mobile="on" use_border_color="off" border_color="#ffffff" border_style="solid"]<br />[/et_pb_image][et_pb_image admin_label="Image" src="https://lacasadejuana.cl/wp-content/uploads/2018/01/robles_enero_02.jpg" show_in_lightbox="off" url_new_window="off" use_overlay="off" animation="left" sticky="off" align="left" force_fullwidth="off" always_center_on_mobile="on" use_border_color="off" border_color="#ffffff" border_style="solid"]<br />[/et_pb_image][et_pb_text admin_label="Text" background_layout="light" text_orientation="justified" use_border_color="off" border_color="#ffffff" border_style="solid"]</p>

#DATA-reactid EN LOS SPAN: 
<p class="font_8" style="text-align: center;" data-reactid=".0.$SITE_ROOT.$desktop_siteRoot.$PAGES_CONTAINER.1.1.$SITE_PAGES.$c20ln_DESKTOP.1.$i9eqng4f_2.0.0.$child.$0.2.$1.$5.$0.0.r"><span data-reactid=".0.$SITE_ROOT.$desktop_siteRoot.$PAGES_CONTAINER.1.1.$SITE_PAGES.$c20ln_DESKTOP.1.$i9eqng4f_2.0.0.$child.$0.2.$1.$5.$0.0.r.0">Estudio Como<br /></span><span data-reactid=".0.$SITE_ROOT.$desktop_siteRoot.$PAGES_CONTAINER.1.1.$SITE_PAGES.$c20ln_DESKTOP.1.$i9eqng4f_2.0.0.$child.$0.2.$1.$5.$0.0.s.0">Estudio amante de la comida, especialistas en dirección de arte y food styling.Conócenos en:<br /><a href="https://estudiocomo.cl/" target="_blank" rel="noopener noreferrer" data-content="https://estudiocomo.cl" data-type="external" data-reactid=".0.$SITE_ROOT.$desktop_siteRoot.$PAGES_CONTAINER.1.1.$SITE_PAGES.$c20ln_DESKTOP.1.$i9eqng4f_2.0.0.$child.$0.2.$1.$5.$0.0.s.0.0.1.0">estudiocomo.cl</a> - @estudiocomo.cl – Facebook: Estudio_Como</span></p>

#IMÁGEN CON TEXT Y BR: 
<p>[/et_pb_text][et_pb_image admin_label="Imagen" src="https://lacasadejuana.cl/wp-content/uploads/2018/01/fer_enero_02.jpg" show_in_lightbox="off" url_new_window="off" use_overlay="off" animation="left" sticky="off" align="left" force_fullwidth="off" always_center_on_mobile="on" use_border_color="off" border_color="#ffffff" border_style="solid"]<br />[/et_pb_image][et_pb_text admin_label="Texto" background_layout="light" text_orientation="left" use_border_color="off" border_color="#ffffff" border_style="solid"]</p>

#IMÁGEN CON TEXT, BR, URL: 
<p>[/et_pb_text][et_pb_image admin_label="Image" src="https://lacasadejuana.cl/wp-content/uploads/2018/01/reyes_ene_02.jpg" show_in_lightbox="off" url_new_window="off" use_overlay="off" animation="off" sticky="off" align="left" force_fullwidth="off" always_center_on_mobile="on" use_border_color="off" border_color="#ffffff" border_style="solid" url="perezmenaelisa.wix.com/elisamalicia"]<br />[/et_pb_image][et_pb_text admin_label="Text" background_layout="light" text_orientation="justified" use_border_color="off" border_color="#ffffff" border_style="solid"]</p>

VIDEO:

IMÁGEN QUE DICE VIDEO: <p>[/et_pb_text][et_pb_video admin_label="Vídeo" /][/et_pb_column][/et_pb_row][et_pb_row admin_label="Row"][et_pb_column type="1_4"][et_pb_image admin_label="Image" src="https://lacasadejuana.cl/wp-content/uploads/2016/12/Antonia-Reyes.jpg" show_in_lightbox="off" url_new_window="off" use_overlay="off" animation="off" sticky="off" align="left" force_fullwidth="off" always_center_on_mobile="on" use_border_color="off" border_color="#ffffff" border_style="solid" url="perezmenaelisa.wix.com/elisamalicia"]<br />[/et_pb_image][/et_pb_column][et_pb_column type="3_4"][et_pb_text admin_label="Text" background_layout="light" text_orientation="left" use_border_color="off" border_color="#ffffff" border_style="solid"]</p>
