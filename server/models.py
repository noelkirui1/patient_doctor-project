
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s"
})
db = SQLAlchemy(metadata=metadata)

# Association table for direct many-to-many relationship
# This table acts as an intermediary between the Doctor and Patient tables,
# facilitating a direct many-to-many relationship.
doctor_patient = db.Table('doctor_patient',
    db.Column('doctor_id', db.Integer, db.ForeignKey('doctor.id'), primary_key=True),
    db.Column('patient_id', db.Integer, db.ForeignKey('patient.id'), primary_key=True)
)

class Doctor(db.Model, SerializerMixin):
    __tablename__ = 'doctor'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    specialization = db.Column(db.String(100), nullable=False)
    
    # One-to-many relationship with Appointment
    # A doctor can have multiple appointments
    appointments = db.relationship('Appointment', back_populates='doctor', cascade='all, delete-orphan')
    
    # Many-to-many relationship with Patient
    # A doctor can have many patients and a patient can have many doctors
    patients = db.relationship('Patient', secondary=doctor_patient, back_populates='doctors')

    # Serialize rules to avoid recursion
    __serialize_rules__ = ('-appointments.doctor', '-patients.doctors')
class Patient(db.Model, SerializerMixin):
    __tablename__ = 'patient'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    
    # One-to-many relationship with Appointment
    # A patient can have multiple appointments
    appointments = db.relationship('Appointment', back_populates='patient', cascade='all, delete-orphan')
    
    # Many-to-many relationship with Doctor
    # A patient can have many doctors and a doctor can have many patients
    doctors = db.relationship('Doctor', secondary=doctor_patient, back_populates='patients')
     # Serialize rules to avoid recursion
    __serialize_rules__ = ('-appointments.patient', '-doctors.patients')

class Appointment(db.Model, SerializerMixin):
    __tablename__ = 'appointment'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, nullable=False)
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctor.id'), nullable=False)
    patient_id = db.Column(db.Integer, db.ForeignKey('patient.id'), nullable=False)
    
    # Many-to-one relationship with Doctor
    # Each appointment is linked to a single doctor
    doctor = db.relationship('Doctor', back_populates='appointments')
    
    # Many-to-one relationship with Patient
    # Each appointment is linked to a single patient
    patient = db.relationship('Patient', back_populates='appointments')
    # Serialize rules to avoid recursion
    __serialize_rules__ = ('-doctor.appointments', '-patient.appointments')