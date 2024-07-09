from app import app, db
from models import Doctor, Patient, Appointment
from datetime import datetime

with app.app_context():
    # drop existing tables
    db.drop_all()
    # create tables
    db.create_all()

    # clear session
    db.session.remove()

    # Create some doctors
    doctor1 = Doctor(name='Dr. Smith', specialization='Cardiology')
    doctor2 = Doctor(name='Dr. Johnson', specialization='Neurology')

    # Create some patients
    patient1 = Patient(name='Alice Johnson', age=29, gender='Female')
    patient2 = Patient(name='Bob Smith', age=45, gender='Male')

    # Add the direct many-to-many relationships
    doctor1.patients.append(patient1)
    doctor2.patients.append(patient2)

    # Create some appointments
    appointment1 = Appointment(date=datetime(2023, 7, 9, 10, 0), doctor=doctor1, patient=patient1)
    appointment2 = Appointment(date=datetime(2023, 7, 10, 11, 0), doctor=doctor2, patient=patient2)

    # Add the records to the session and commit them to the database
    db.session.add_all([doctor1, doctor2, patient1, patient2, appointment1, appointment2])
    db.session.commit()

    print("Database seeded!")
