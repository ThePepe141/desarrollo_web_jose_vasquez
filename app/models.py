from . import db
from datetime import datetime, timezone

class Region(db.Model):
    __tablename__  = "region"
    __table_args__ = {"schema": "tarea2"}

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(200), nullable=False)

class Comuna(db.Model):
    __tablename__  = "comuna"
    __table_args__ = {"schema": "tarea2"}

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(200), nullable=False)
    region_id = db.Column(db.Integer, db.ForeignKey("tarea2.region.id"), nullable=False)

class Actividad(db.Model):
    __tablename__  = "actividad"
    __table_args__ = {"schema": "tarea2"}

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    celular = db.Column(db.String(15))
    comuna_id = db.Column(db.Integer, db.ForeignKey("tarea2.comuna.id"), nullable=False)
    sector = db.Column(db.String(100))
    dia_hora_inicio = db.Column(db.DateTime, nullable=False)
    dia_hora_termino = db.Column(db.DateTime)
    descripcion = db.Column(db.String(500))

    comuna = db.relationship("Comuna", backref="actividades", lazy=True)
    temas = db.relationship("ActividadTema", backref="actividad", lazy=True)
    contactos = db.relationship("Contacto", backref="actividad", lazy=True)
    fotos = db.relationship("Foto", backref="actividad", lazy=True)

class ActividadTema(db.Model):
    __tablename__  = "actividad_tema"
    __table_args__ = {"schema": "tarea2"}

    id = db.Column(db.Integer, primary_key=True)
    tema= db.Column(db.Enum("música", "deporte", "ciencias", "religión", "política", "tecnología", "juegos", "baile", "comida", "otro"), nullable=False)
    glosa_otro = db.Column(db.String(15))
    actividad_id = db.Column(db.Integer, db.ForeignKey("tarea2.actividad.id"), nullable=False)

class Contacto(db.Model):
    __tablename__  = "contactar_por"
    __table_args__ = {"schema": "tarea2"}

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.Enum("whatsapp", "telegram", "instagram", "tiktok", "x", "otra"), nullable=False)
    identificador = db.Column(db.String(150), nullable=False)  #input del usuario
    actividad_id = db.Column(db.Integer, db.ForeignKey("tarea2.actividad.id"), nullable=False)

class Foto(db.Model):
    __tablename__  = "foto"
    __table_args__ = {"schema": "tarea2"}

    id = db.Column(db.Integer, primary_key=True)
    nombre_archivo = db.Column(db.String(300), nullable=False)
    ruta_archivo = db.Column(db.String(300), nullable=False)
    actividad_id = db.Column(db.Integer, db.ForeignKey("tarea2.actividad.id"), nullable=False)

class Comentario(db.Model):
    __tablename__ = "comentario"
    __table_args__ = {"schema": "tarea2"}

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(200), nullable=False)
    texto = db.Column(db.String(500), nullable=False)
    fecha = db.Column(db.DateTime, nullable=False, default=lambda: datetime.now(timezone.utc))
    actividad_id = db.Column(db.Integer, db.ForeignKey("tarea2.actividad.id"), nullable=False)

    actividad = db.relationship("Actividad", backref="comentarios", lazy=True)