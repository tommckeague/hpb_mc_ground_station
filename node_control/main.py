import os
import sys
import time
from helpers import connect_mqtt, publish_mqtt, close_mqtt, ping_ip

try:
    GROUND_STATION_HOST_IP = os.getenv('GROUND_STATION_HOST_IP')
    FUELLING_STATION_PI_IP = os.getenv('FUELLING_STATION_PI_IP')
    HEARTBEAT_INTERVAL = os.getenv('HEARTBEAT_INTERVAL')
    HEARTBEAT_INTERVAL = int(HEARTBEAT_INTERVAL)

    broker = 'mosquitto'
    port = 1883
    client_id = 'publish-hostcomp'
    client = connect_mqtt(client_id, broker, port)
    print(client)
    topic = 'heartbeat/host_to_fuelling_station'
except Exception as e:
    print(f'Error in initialising node_control because: {e}')
    raise


while True:
    if ping_ip(FUELLING_STATION_PI_IP, 2):
        print(f"{FUELLING_STATION_PI_IP} is alive")
        publish_mqtt(client, topic, '100')
    else:
        print(f"{FUELLING_STATION_PI_IP} is down")
        publish_mqtt(client, topic, '0')
        
    sys.stdout.flush()
    time.sleep(HEARTBEAT_INTERVAL)