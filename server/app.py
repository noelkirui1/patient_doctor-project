#!/usr/bin/env python3

from flask import Flask, request, make_response
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS

from models import db, Doctor, Patient, Appointment

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///models.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

migrate = Migrate(app, db)
db.init_app(app)

api = Api(app)

# Index Resource
class Index(Resource):
  
    # Returns a welcome message for the Patient-Doctor Appointment System.
    def get(self):
        response_dict = {
            "message": "Welcome to the Patient-Doctor Appointment System!"
        }
        response = make_response(response_dict, 200)
        return response

# Doctors Resource
class Doctors(Resource):
    # Returns a list of all doctors.
    def get(self):
        response_dict_list = [doctor.to_dict() for doctor in Doctor.query.all()]
        response = make_response(response_dict_list, 200)
        return response
# Adds a new doctor.
    def post(self):
        new_doctor = Doctor(
            name=request.form.get('name'),
            specialization=request.form.get('specialization')
        )
        db.session.add(new_doctor)
        db.session.commit()
        response_dict = new_doctor.to_dict()
        response = make_response(response_dict, 201)
        return response

# DoctorByID Resource
class DoctorByID(Resource):
  
        # Retrieves details of a specific doctor by ID.
    def get(self, doctor_id):
        doctor = Doctor.query.get(doctor_id)
        if doctor:
            response_dict = doctor.to_dict()
            response = make_response(response_dict, 200)
        else:
            response = make_response({"error": "Doctor not found"}, 404)
        return response
# Updates details of a specific doctor by ID.
    def put(self, doctor_id):
        doctor = Doctor.query.get(doctor_id)
        if doctor:
            data = request.get_json()
            doctor.name = data.get('name', doctor.name)
            doctor.specialization = data.get('specialization', doctor.specialization)
            db.session.commit()
            response_dict = doctor.to_dict()
            response = make_response(response_dict, 200)
        else:
            response = make_response({"error": "Doctor not found"}, 404)
        return response
# Deletes a specific doctor by ID.
    def delete(self, doctor_id):
        doctor = Doctor.query.get(doctor_id)
        if doctor:
            db.session.delete(doctor)
            db.session.commit()
            response = make_response({"message": "Doctor deleted successfully"}, 200)
        else:
            response = make_response({"error": "Doctor not found"}, 404)
        return response

# Patients Resource
class Patients(Resource):
    
    # Returns a list of all patients.
    def get(self):
        response_dict_list = [patient.to_dict() for patient in Patient.query.all()]
        response = make_response(response_dict_list, 200)
        return response
# Adds a new patient.
    def post(self):
        new_patient = Patient(
            name=request.form.get('name'),
            age=request.form.get('age'),
            gender=request.form.get('gender')
        )
        db.session.add(new_patient)
        db.session.commit()
        response_dict = new_patient.to_dict()
        response = make_response(response_dict, 201)
        return response

# PatientByID Resource
class PatientByID(Resource):
  
#     Updates details of a specific patient by ID
    def get(self, patient_id):
        patient = Patient.query.get(patient_id)
        if patient:
            response_dict = patient.to_dict()
            response = make_response(response_dict, 200)
        else:
            response = make_response({"error": "Patient not found"}, 404)
        return response

    def put(self, patient_id):
        patient = Patient.query.get(patient_id)
        if patient:
            data = request.get_json()
            patient.name = data.get('name', patient.name)
            patient.age = data.get('age', patient.age)
            db.session.commit()
            response_dict = patient.to_dict()
            response = make_response(response_dict, 200)
        else:
            response = make_response({"error": "Patient not found"}, 404)
        return response
#  Deletes a specific patient by ID.
    def delete(self, patient_id):
        patient = Patient.query.get(patient_id)
        if patient:
            db.session.delete(patient)
            db.session.commit()
            response = make_response({"message": "Patient deleted successfully"}, 200)
        else:
            response = make_response({"error": "Patient not found"}, 404)
        return response

# Appointments Resource
class Appointments(Resource):
    
    #  Returns a list of all appointments.
    def get(self):
        response_dict_list = [appointment.to_dict() for appointment in Appointment.query.all()]
        response = make_response(response_dict_list, 200)
        return response
#  Adds a new appointment.
    def post(self):
        
        new_appointment = Appointment(
            doctor_id=request.form('doctor_id'),
            patient_id=request.form('patient_id'),
            date=request.form.get('date'),
            time=request.form.get('time')
        )
        db.session.add(new_appointment)
        db.session.commit()
        response_dict = new_appointment.to_dict()
        response = make_response(response_dict, 201)
        return response

# AppointmentByID Resource
class AppointmentByID(Resource):
    
#  Retrieves details of a specific appointment by ID.
    def get(self, appointment_id):
        appointment = Appointment.query.get(appointment_id)
        if appointment:
            response_dict = appointment.to_dict()
            response = make_response(response_dict, 200)
        else:
            response = make_response({"error": "Appointment not found"}, 404)
        return response
# Updates details of a specific appointment by ID.
    def put(self, appointment_id):
        appointment = Appointment.query.get(appointment_id)
        if appointment:
            data = request.get_json()
            appointment.doctor_id = data.get('doctor_id', appointment.doctor_id)
            appointment.patient_id = data.get('patient_id', appointment.patient_id)
            appointment.date = data.get('date', appointment.date)
            appointment.time = data.get('time', appointment.time)
            db.session.commit()
            response_dict = appointment.to_dict()
            response = make_response(response_dict, 200)
        else:
            response = make_response({"error": "Appointment not found"}, 404)
        return response
# Deletes a specific appointment by ID.
    def delete(self, appointment_id):
        appointment = Appointment.query.get(appointment_id)
        if appointment:
            db.session.delete(appointment)
            db.session.commit()
            response = make_response({"message": "Appointment deleted successfully"}, 200)
        else:
            response = make_response({"error": "Appointment not found"}, 404)
        return response
    
# Add resources to API
api.add_resource(Index, '/')
api.add_resource(Doctors, '/doctors')
api.add_resource(DoctorByID, '/doctors/<int:doctor_id>')
api.add_resource(Patients, '/patients')
api.add_resource(PatientByID, '/patients/<int:patient_id>')
api.add_resource(Appointments, '/appointments')
api.add_resource(AppointmentByID, '/appointments/<int:appointment_id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
