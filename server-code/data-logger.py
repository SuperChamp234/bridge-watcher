import paho.mqtt.client as mqttClient
import time
import json


def write_json(new_data, filename='../my-app/public/data/data.json'):
    with open(filename,'r+') as file:
          # First we load existing data into a dict.
        file_data = json.load(file)
        # Join new_data with file_data inside emp_details
        file_data["data"].append(new_data)
        # Sets file's current position at offset.
        file.seek(0)
        # convert back to json.
        json.dump(file_data, file, indent = 4)

def on_connect(client, userdata, flags, rc):

    if rc == 0:

        print("Connected to broker")

        global Connected                #Use global variable
        Connected = True                #Signal connection

    else:

        print("Connection failed")

def on_message(client, userdata, message):
    print("Message received: "  + message.payload.decode("utf-8"))
    write_json(eval(message.payload.decode("utf-8")))

Connected = False   #global variable for the state of the connection

broker_address= "bridgewatcher.centralindia.cloudapp.azure.com"  #Broker address
port = 1883                         #Broker port
user = "BridgeWatcherAdmin"                    #Connection username
password = "BridgeWatcherAdmin"            #Connection password
topic = "test"

client = mqttClient.Client("PythonCLI")               #create new instance
client.username_pw_set(user, password=password)    #set username and password
client.on_connect= on_connect                      #attach function to callback
client.on_message= on_message                      #attach function to callback
client.connect(broker_address,port,60) #connect
client.subscribe(topic) #subscribe
client.loop_forever() #then keep listening forever