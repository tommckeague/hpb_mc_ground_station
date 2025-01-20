import serial
from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS
import time

print('SCRIPT COMMENCING')

try:
    # Influx db init
    url = "http://localhost:8086"
    token = "hypower"
    org = "hypower"
    bucket = "cesium_bucket"
    client = InfluxDBClient(url=url, token=token, org=org)
    write_api = client.write_api(write_options=SYNCHRONOUS)

    altitude_count = 0
    q3 = 0

    while altitude_count < 1000:
        time.sleep(1)

        data_points = [
            "longitude,host=host1 value=-0.118092",
            "latitude,host=host1 value=51.509865",
            f"altitude,host=host1 value={altitude_count}",   
            "quaternions,host=host1 q0=1",
            "quaternions,host=host1 q1=1",  
            "quaternions,host=host1 q2=1",        
            f"quaternions,host=host1 q3={q3}",  
        ]
        write_api.write(bucket, org, data_points)
        altitude_count = altitude_count + 1
        # q3 = q3 + 1


except KeyboardInterrupt:
    # Gracefully exit on Ctrl+C
    print("Exiting program...")

finally:
    client.close()


# longitude = from(bucket: "cesium_bucket")
#   |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
#   |> filter(fn: (r) => r["_measurement"] == "longitude")
#   |> filter(fn: (r) => r["_field"] == "value")
#   |> filter(fn: (r) => r["host"] == "host1")

# latitude = from(bucket: "cesium_bucket")
#   |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
#   |> filter(fn: (r) => r["_measurement"] == "latitude")
#   |> filter(fn: (r) => r["_field"] == "value")
#   |> filter(fn: (r) => r["host"] == "host1")

# altitude = from(bucket: "cesium_bucket")
#   |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
#   |> filter(fn: (r) => r["_measurement"] == "altitude")
#   |> filter(fn: (r) => r["_field"] == "value")
#   |> filter(fn: (r) => r["host"] == "host1")

# quaternion_q0 = from(bucket: "cesium_bucket")
#   |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
#   |> filter(fn: (r) => r["_measurement"] == "quaternions")
#   |> filter(fn: (r) => r["_field"] == "q0")
#   |> filter(fn: (r) => r["host"] == "host1")

# quaternion_q1 = from(bucket: "cesium_bucket")
#   |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
#   |> filter(fn: (r) => r["_measurement"] == "quaternions")
#   |> filter(fn: (r) => r["_field"] == "q1")
#   |> filter(fn: (r) => r["host"] == "host1")

# quaternion_q2 = from(bucket: "cesium_bucket")
#   |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
#   |> filter(fn: (r) => r["_measurement"] == "quaternions")
#   |> filter(fn: (r) => r["_field"] == "q2")
#   |> filter(fn: (r) => r["host"] == "host1")

# quaternion_q3 = from(bucket: "cesium_bucket")
#   |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
#   |> filter(fn: (r) => r["_measurement"] == "quaternions")
#   |> filter(fn: (r) => r["_field"] == "q3")
#   |> filter(fn: (r) => r["host"] == "host1")

# table1 = union(tables: [longitude, latitude, altitude])
#   |> pivot(rowKey: ["_time"], columnKey: ["_measurement"], valueColumn: "_value")

# table2 = union(tables: [quaternion_q0, quaternion_q1, quaternion_q2, quaternion_q3])
#   |> pivot(rowKey: ["_time"], columnKey: ["_field"], valueColumn: "_value")

# join(
#   tables: {table1: table1, table2: table2},
#   on: ["_time"]
# )

# |> drop(columns: ["host_table1", "host_table2", "_field", "_measurement", "_start_table1", "_start_table2", "_stop_table1", "_stop_table2"])

# |> map(fn: (r) => ({
#     _time: r._time,
#     "1": r.longitude,
#     "2": r.latitude,
#     "3": r.altitude,
#     "4": r.q0,
#     "5": r.q1,
#     "6": r.q2,
#     "7": r.q3
# }))

# |> rename(columns: {
#     "1": "1_Longitude",
#     "2": "2_Latitude",
#     "3": "3_Altitude",
#     "4": "4_x",
#     "5": "5_y",
#     "6": "6_z",
#     "7": "7_s"
# })