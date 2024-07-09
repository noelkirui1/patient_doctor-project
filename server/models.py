from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from datetime import datetime

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s"
})
db = SQLAlchemy(metadata=metadata)

# # Association table for direct many-to-many relationship
# doctor_patient = db.Table('doctor_patient',
#     db.Column('doctor_id', db.Integer, db.ForeignKey('doctor.id'), primary_key=True),
#     db.Column('patient_id', db.Integer, db.ForeignKey('patient.id'), primary_key=True)
# )

class Doctor(db.Model, SerializerMixin):
    __tablename__ = 'doctor'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    specialization = db.Column(db.String(100), nullable=False)
    
    appointments = db.relationship('Appointment', back_populates='doctor', cascade='all, delete-orphan')
    # patients = db.relationship('Patient', secondary=doctor_patient, back_populates='doctors')

    patient_names = association_proxy('patients', 'name')
    # Serialize rules to avoid recursion
    serialize_rules = ('-appointments.doctor', '-patients.doctors')
    
    def __repr__(self):
        return f'<Doctor{self.id}, {self.name}, {self.specialization}>'

class Patient(db.Model, SerializerMixin):
    __tablename__ = 'patient'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.String, nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    
    appointments = db.relationship('Appointment', back_populates='patient', cascade='all, delete-orphan')

    # doctors = db.relationship('Doctor', secondary=doctor_patient, back_populates='patients')

    doctor_names = association_proxy('doctors', 'name')
    # Serialize rules to avoid recursion
    serialize_rules = ('-appointments.patient', '-doctors.patients')

    def __repr__(self):
        return f'<Patient{self.id}, {self.name}, {self.age}, {self.gender}>'

class Appointment(db.Model, SerializerMixin):
    __tablename__= 'appointment'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, nullable=False)
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctor.id'), nullable=False)
    patient_id = db.Column(db.Integer, db.ForeignKey('patient.id'), nullable=False)
    
    doctor = db.relationship('Doctor', back_populates='appointments')
    patient = db.relationship('Patient', back_populates='appointments')
   

    # Serialize rules to avoid recursion
    serialize_rules = ('-doctor.appointments', '-patient.appointments')

    def __repr__(self):
        return f'<Appointment{self.id}, {self.date}>'