import serial
from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS

print('SCRIPT COMMENCING')

# Configure the serial connections (the parameters might need to be adjusted)
try: 
    ser = serial.Serial(
        port='COM3',  # Replace with your COM port number
        # port='/dev/tty.usbmodem2056326638311',
        baudrate=115200,  # Replace with the baud rate of your device
        parity=serial.PARITY_NONE,
        stopbits=serial.STOPBITS_ONE,
        bytesize=serial.EIGHTBITS,
        timeout=1  # Read timeout in seconds
    )
    # Saving the third index

except:
    print("Cannot see COM device")  

# Check if the serial port is open
if ser.is_open:
    print("Serial port is open")
else:
    print("Failed to open serial port")

try:
    # Influx db init
    url = "http://localhost:8086"
    token = "hypower"
    org = "hypower"
    bucket = "lora_bucket"
    client = InfluxDBClient(url=url, token=token, org=org)
    write_api = client.write_api(write_options=SYNCHRONOUS)

    while True:
        # Read a line from the serial port
        line = ser.readline().decode('utf-8').rstrip()
        if line:
            parsed_data = line.split(",")
            x0 = float(parsed_data[0])
            x1 = float(parsed_data[1])
            x2 = float(parsed_data[2])
            x3 = float(parsed_data[3])
            x4 = float(parsed_data[4])
            x5 = float(parsed_data[5])
            x6 = parsed_data[6]
            print(f"Received: {x0,x1,x2,x3,x4,x5,x6}")

            # Influxdb
            data = f"latitude,host=host1 value={x3}"
            write_api.write(bucket, org, data)

except KeyboardInterrupt:
    # Gracefully exit on Ctrl+C
    print("Exiting program...")

finally:
    # Close the serial port
    ser.close()
    print("Serial port closed")
    client.close()
