import paho.mqtt.client as mqttClient
import time
import json
from datetime import datetime
import random as rd
from time import sleep
now = datetime.now()

def on_connect(client, userdata, flags, rc):

    if rc == 0:

        print("Connected to broker")

        global Connected                #Use global variable
        Connected = True                #Signal connection

    else:

        print("Connection failed")
def on_publish(client,userdata,result):             #create function for callback
    print("data published \n")

Connected = False   #global variable for the state of the connection

broker_address= "bridgewatcher.centralindia.cloudapp.azure.com"  #Broker address
port = 1883                         #Broker port
user = "BridgeWatcherAdmin"                    #Connection username
password = "BridgeWatcherAdmin"            #Connection password
topic = "test"

client = mqttClient.Client("PythonTest")               #create new instance
client.username_pw_set(user, password=password)    #set username and password
client.on_connect= on_connect                      #attach function to callback
client.on_publish= on_publish
client.connect(broker_address,port,60) #connect
while(True):
    data = {
            "timestamp":  now.strftime("%d/%m/%Y %H:%M:%S"),
            "load": str(rd.randint(25,30)),
            "compression": str(rd.randint(20,35)),
            "tension": str(rd.randint(20,35)),
            }
    client.publish("test", json.dumps(data))
    sleep(30)
client.disconnect()