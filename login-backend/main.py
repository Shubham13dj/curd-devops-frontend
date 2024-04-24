from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from pydantic import BaseModel
from typing import Annotated
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import json

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)
class RegisterUser(BaseModel):
    username: str | None = None
    email: str | None = None
    password: str | None = None


@app.post("/regitration")
async def login(data: RegisterUser):
    new_data = data.model_dump
    username = data.username
    email = data.email
    password = data.password

    # Read existing data from the JSON file, if any
    existing_data = {}
    try:
        with open('user_data.json', 'r') as json_file:
            existing_data = json.load(json_file)
    except FileNotFoundError:
        pass

    # Check if the new data already exists
    if email not in existing_data:
        new_user_data = {}
        new_user_data["username"] = username
        new_user_data["email"] = email
        new_user_data["password"] = password
        # Add the new data to the existing data
        existing_data[email] = new_user_data

        # Write the updated data back to the file
        with open('user_data.json', 'w') as json_file:
            json.dump(existing_data, json_file, indent=4)
        return {"message": "User registered successfully", "user_data": new_data}
    else:
        raise HTTPException(status_code=400, detail="User already exists")

class Login(BaseModel):
    email: str | None = None
    password: str | None = None
@app.post("/")
async def get_data(data:Login):
    email = data.email
    password = data.password
    existing_data = {}
    try:
        with open("user_data.json", "r") as file:
            existing_data = json.load(file)
    except FileNotFoundError:
        pass
    if email in existing_data and password == existing_data.get(email).get("password"):
        # passwords = existing_data.get(email)
        # # If the email exists, check if the password matches
        # print(passwords)
        # print(password)
        # if password == existing_data.get(email).get("password"):
        #     print("hello")
        return {"message": "Login successful"}

        # else:
        #     raise HTTPException(status_code=401, detail="Unauthorized")
    else:
        raise HTTPException(status_code=401, detail="Unauthorized")

    