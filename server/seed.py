import requests
from app import app, db, User, Plant, CareLog, CareTask, UserPlant
from faker import Faker
import json
import time
from PIL import Image
from io import BytesIO
import os
from config import api_key
from random import random, randint, sample, choice as rc
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

def download_and_save_image(url, save_path):
    response = requests.get(url)
    image = Image.open(BytesIO(response.content))

    # Convert the image to RGB mode (JPEG supports RGB mode)
    image = image.convert('RGB')

    # Save the image as JPEG using an absolute path
    image.save(save_path, format='JPEG')

def seed_users():
    users = []
    # Use an absolute path for save_dir
    save_dir = os.path.abspath("../client/public/path_to_save_images")

    # Create the directory if it doesn't exist
    if not os.path.exists(save_dir):
        os.makedirs(save_dir)

    for _ in range(5):
        fake_img_url = fake.image_url(width=200, height=200)  # Generate a fake image URL with desired width and height
        user_img_filename = f"user_{fake.random_number()}.jpg"  # Generate a random filename for the image
        user_img_save_path = os.path.join(save_dir, user_img_filename)

        download_and_save_image(fake_img_url, user_img_save_path)

        user = User(
            name=fake.name(),
            username=fake.user_name(),
            email=fake.email(),
            password_hash="password",
            img=f'/path_to_save_images/{user_img_filename}'  # Save the local image path in the img field
        )
        users.append(user)

        preset_user = User(
        id=11,
        name="Evan Manzanares",
        username="test",
        email="test@test.com",
        password_hash="password",
        img="/path_to_save_images/user_11.jpg"
    )
    users.append(preset_user)

    return users


def seed_plants():
   
    with app.app_context():
        
        data = fetch_data_from_api()
        # new_data= fetch_data_from_api_id(data)
        combined_data = data

        if combined_data:
            try:
                for item in data:
                    time.sleep(.5)
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
        for _ in range(100):
            user = fake.random_element(users)
            care_task = CareTask(
                name=fake.word(),
                desc=fake.text(),
                completed=fake.boolean(),
                user=user
            )
            db.session.add(care_task)

        db.session.commit()
        print("Seeding care tasks completed successfully.")


def seed_user_plants(users):
    num_plants_per_user = randint(5, 10)

    with app.app_context():
        for user in users:
            random_plants = sample(Plant.query.all(), num_plants_per_user)

            # Create a dictionary to store CareTask objects for each user-plant association
            care_tasks = {}

            for plant in random_plants:
                # Create a CareTask record for the plant and user association
                care_task = CareTask(name=fake.word(), desc=fake.text(), completed=fake.boolean(), user=user)
                care_task = db.session.merge(care_task)
                care_tasks[plant.id] = care_task
                

            # Flush the session to commit the CareTask objects to the database
            db.session.flush()

            for plant in random_plants:
                # Create the UserPlant record with the corresponding care_task_id
                user_plant = UserPlant(user_id=user.id, plant_id=plant.id, care_task_id=care_tasks[plant.id].id)
                db.session.add(user_plant)

        db.session.commit()





if __name__ == "__main__":
    with app.app_context():
        print("Clearing db...")
        UserPlant.query.delete()
        User.query.delete()
        # CareTask.query.delete()
        db.create_all()

        print("Seeding users...")
        users = seed_users()
        db.session.add_all(users)
        db.session.commit()

        # print("Seeding plants...")
        # seed_plants()

        # print("Seeding care tasks...")
        # seed_care_tasks()

        print("Seeding user plants...")
        seed_user_plants(users)


        print("Done seeding!")
        
