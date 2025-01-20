from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import serial
from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS
import time


# Fast API

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins, replace with your frontend URL in production
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],  # Allow the listed methods
    allow_headers=["*"],  # Allow all headers
)

class Item(BaseModel):
    test: float

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/change_state_actuator_1")
async def process_data(item: Item):
    # Here you can process the item.q or perform any other actions
    # For demonstration, just returning the received data
    print(item)
    data = item.test
    print(data)

    try:
        # Influx db init
        url = "http://localhost:8086"
        token = "hypower"
        org = "hypower"
        bucket = "upload_test"
        client = InfluxDBClient(url=url, token=token, org=org)
        write_api = client.write_api(write_options=SYNCHRONOUS)

        data_points = [
            f"actuator_1,host=host1 requested_state={data}",
        ]
        write_api.write(bucket, org, data_points)
    finally:
        client.close()
    return {"message": "Data received", "q": item.test}

@app.post("/change_state_actuator_2")
async def process_data(item: Item):
    # Here you can process the item.q or perform any other actions
    # For demonstration, just returning the received data
    print(item)
    data = item.test
    print(data)

    try:
        # Influx db init
        url = "http://localhost:8086"
        token = "hypower"
        org = "hypower"
        bucket = "upload_test"
        client = InfluxDBClient(url=url, token=token, org=org)
        write_api = client.write_api(write_options=SYNCHRONOUS)

        data_points = [
            f"actuator_2,host=host1 requested_state={data}",
        ]
        write_api.write(bucket, org, data_points)
    finally:
        client.close()
    return {"message": "Data received", "q": item.test}


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8001)
