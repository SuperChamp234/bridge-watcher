import paho.mqtt.client as mqttClient
import time
import json

data = {
        "timestamp": "2021-12-18",
        "load": "28.5",
        "compression": "52.9",
        "tension": "182.3"
        }

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

broker_address= "20.204.109.105"  #Broker address
port = 1883                         #Broker port
user = "BridgeWatcherAdmin"                    #Connection username
password = "BridgeWatcherAdmin"            #Connection password
topic = "test"

client = mqttClient.Client("PythonTest")               #create new instance
client.username_pw_set(user, password=password)    #set username and password
client.on_connect= on_connect                      #attach function to callback
client.on_publish= on_publish
client.connect(broker_address,port,60) #connect
client.publish("test", json.dumps(data))
client.disconnect()