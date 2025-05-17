from flask import Blueprint, render_template, request, redirect, url_for, flash
from .models import db, Region, Comuna, Actividad, ActividadTema, Contacto, Foto
from datetime import datetime
from werkzeug.utils import secure_filename
import os

UPLOAD_FOLDER = os.path.join("app", "static", "uploads")
ALLOWED_EXTENSIONS = {"jpg", "png", "jpeg"}

def allowed_files(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

main = Blueprint("main", __name__)

@main.route("/")
def index():
    actividades = Actividad.query.order_by(Actividad.dia_hora_inicio.desc()).limit(5).all()
    return render_template("index.html", actividades=actividades)

@main.route("/add", methods=["GET", "POST"])
def add():
    if request.method == "POST":
        errores = []

        nombre = request.form.get("nombre", "").strip()
        email = request.form.get("email", "").strip()
        celular = request.form.get("celular", "").strip()
        comuna_id = request.form.get("comuna")
        sector = request.form.get("sector", "").strip()
        descripcion = request.form.get("descripcion", "").strip()

        #validaciones
        if not nombre:
            errores.append("Nombre es obligatorio")
        if len(nombre)>200:
            errores.append("Nombre excede el máximo de caracteres")
        if not email:
            errores.append("Email es obligatorio")
        if len(email) > 100:
            errores.append("Email excede máximo de caracteres")
        if "@" not in email:
            errores.append("Email inválido")
        if not celular:
            errores.append("Celular es obligatorio")
        if len(celular) > 15:
            errores.append("celular excede el máximo de caracteres")
        if not comuna_id:
            errores.append("Comuna es obligatorio")
        if len(sector) > 100:
            errores.append("Sector excede el máximo de caracteres")
        if len(descripcion) > 500:
            errores.append("Descripción excede el máximo de caracteres")

        contactos = []
        for clave in request.form:
            if clave.startswith("input-"):
                metodo = clave.replace("input-", "")
                valor = request.form.get(clave).strip()
                if metodo not in ['whatsapp', 'telegram', 'x', 'instagram', 'tiktok', 'otra']:
                    errores.append(f"Medio de contacto inválido: {metodo}")
                elif not (4 <= len(valor) <= 150):
                    errores.append(f"El identificador para {metodo} debe tener entre 4 y 150 caracteres")
                else:
                    contactos.append((metodo, valor))
        
        inicio_str = request.form.get("inicio", "").strip()
        if not inicio_str:
            errores.append("Fecha de inicio es obligatorio")
        try:
            inicio = datetime.fromisoformat(inicio_str)
        except:
            errores.append("Fecha de inicio del evento inválida")
            inicio = None
        
        fin_str = request.form.get("fin", "").strip()
        fin = None
        if fin_str:
            try:
                fin = datetime.fromisoformat(fin_str)
                if fin <= inicio:
                    errores.append("Fecha de término debe ser posterior a la de inicio")
            except:
                errores.append("Fecha de término inválida")
        
        temas_seleccionados = request.form.getlist("tema")
        temas = []
        if not temas_seleccionados:
            errores.append("Temas es obligatorio (mínimo 1 tema)")
        else:
            for tema in temas_seleccionados:
                if tema == "otro":
                    tema_otro = request.form.get("input-tema", "").strip()
                    if not (3 <= len(tema_otro) <= 15):
                        errores.append("Tema 'otro' debe tener entre 3 a 15 caracteres")
                    else:
                        temas.append(("otro", tema_otro))
                else:
                    temas.append((tema, None))
        
        fotos = request.files.getlist("foto")
        fotos_validas = []
        for foto in fotos:
            if foto and allowed_files(foto.filename):
                filename = secure_filename(foto.filename)
                ruta_destino = os.path.join(UPLOAD_FOLDER, filename)
                foto.save(ruta_destino)
                fotos_validas.append(filename)
            else:
                errores.append("Archivo inválido")
        #print("ERRORES DETECTADOS:", errores)
        if errores:
            flash("Se encontraron errores en el formulario: " + "; ".join(errores), "error")
            return render_template("add_activity.html")
        
        nueva_actividad = Actividad(
            nombre=nombre,
            email=email,
            celular=celular,
            comuna_id=comuna_id,
            sector=sector,
            descripcion=descripcion,
            dia_hora_inicio=inicio,
            dia_hora_termino=fin
        )

        db.session.add(nueva_actividad)
        db.session.commit()

        for metodo, valor in contactos:
            db.session.add(Contacto(
                nombre=metodo,
                identificador=valor,
                actividad_id=nueva_actividad.id
            ))

        for tema, glosario in temas:
            db.session.add(ActividadTema(
                tema=tema,
                glosa_otro=glosario,
                actividad_id = nueva_actividad.id
            ))
        
        for foto in fotos_validas:
            db.session.add(Foto(
                nombre_archivo=foto,
                ruta_archivo=os.path.join("uploads", foto),
                actividad_id=nueva_actividad.id
            ))
        db.session.commit()
        flash("Actividad agregada exitosamente", "success")
        #print("Agregado correctamente, redirigiendo a /")
        return redirect(url_for("main.index"))
    
    #method=="GET"
    return render_template("add_activity.html")

@main.route("/activities")
def activities():
    #listado de actividades
    pagina = request.args.get("page", 1, type=int)
    por_pagina = 5
    actividades_pagina = Actividad.query.order_by(Actividad.dia_hora_inicio.desc()).paginate(page=pagina, per_page=por_pagina)
    return render_template("activities.html", actividades=actividades_pagina)

@main.route("/activity/<int:id>")
def watch_activity(id):
    actividad = Actividad.query.get_or_404(id)
    return render_template("details.html", actividad=actividad)

@main.route("/statistics")
def statistics():
    return render_template("statistics.html")