import requests
from app import app, db, User, Plant, CareLog, CareTask
from faker import Faker
import json
import time
from config import api_key
import random
fake = Faker()


def fetch_data_from_api():
    url = "https://house-plants2.p.rapidapi.com/all"

    headers = {
        "X-RapidAPI-Key": api_key,
        "X-RapidAPI-Host": "house-plants2.p.rapidapi.com"
    }
    response = requests.get(url, headers=headers)

    # print(response.json())
    if response.status_code == 200:
        return response.json()
    else:
        print("Failed to fetch data from the API.")
        return None
    
fetch_data_from_api()

def  fetch_data_from_api_id(item):
    print(item)
    url = f"https://house-plants2.p.rapidapi.com/id/{item['id']}"

    headers = {
        "X-RapidAPI-Key": "7b2bd6aca3msh488231a5ba6aab5p1548ddjsn38401aaedc1a",
        "X-RapidAPI-Host": "house-plants2.p.rapidapi.com"
    }
    response = requests.get(url, headers=headers)

    print(response.json())
    if response.status_code == 200:
        return response.json()
    else:
        print("Failed to fetch data from the API.")
        return None



def seed_users():
    users = []
    for _ in range(10):
        user = User(
            name=fake.name(),
            username=fake.user_name(),
            email=fake.email(),
            password_hash="password"
        )
        users.append(user)

    return users

def seed_plants():
   
    with app.app_context():
        
        data = fetch_data_from_api()
        # new_data= fetch_data_from_api_id(data)
        combined_data = data

        if combined_data:
            try:
                for item in data:
                    time.sleep(1)
                    new_data = fetch_data_from_api_id(item)
                    plant = Plant(
                        
                        latin=new_data.get("Latin name", ""),
                        img=new_data.get("Img", ""),
                        family=new_data.get("Family", ""),
                        common_names = json.dumps(new_data.get("Common name", [])),
                        category=new_data.get("Categories", ""),
                        origin= json.dumps(new_data.get("Origin", [])),
                        climate=new_data.get("Climat", ""),
                        ideal_light=new_data.get("Light ideal", ""),
                        watering=new_data.get("Watering", ""),
                    )
                    db.session.add(plant)
                db.session.commit()
                
                print("Seeding plants completed successfully.")
            except Exception as e:
                db.session.rollback()
                print("Seeding plants failed. Error:", e)
        else:
            print("Seeding plants failed.")



def seed_care_tasks():
    # Create the application context
    with app.app_context():
        users = User.query.all()
        plants = Plant.query.all()

        for user in users:
            # Get a random number of plants to add to the user's collection (e.g., between 5 and 10)
            num_plants = random.randint(5, 10)
            # Shuffle the list of plants to get random plants
            random_plants = random.sample(plants, num_plants)

            for plant in random_plants:
                # Create a care task for each plant and associate it with the user
                care_task = CareTask(
                    name=fake.word(),
                    desc=fake.text(),
                    completed=fake.boolean(),
                    user=user
                )
                # Associate the random plant with the care task
                care = Care(plant=plant, care_task=care_task)
                db.session.add(care_task)
                db.session.add(care)

        db.session.commit()
        print("Seeding care tasks completed successfully.")

if __name__ == "__main__":
    with app.app_context():
        print("Clearing db...")
        db.drop_all()
        db.create_all()

        print("Seeding users...")
        users = seed_users()
        db.session.add_all(users)
        db.session.commit()

        print("Seeding plants...")
        seed_plants()

        print("Seeding care tasks...")
        seed_care_tasks()

        print("Done seeding!")
