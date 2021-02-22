import pika, os, time, json
#from submodules.rabbit_utils.rabbit_consumer import data_consume
from submodules.rabbit_utils.rabbit_publisher import data_publish
from submodules.rabbit_utils.rabbit_connection import connect_rabbitmq
from submodules.data.data_collector import generate_data_frame
from submodules.data.data_minning import most_common_venues
from submodules.data.ml_model import clustering
from submodules.data.map_data import generate_map_data
from submodules.data.data_formatter import data_format


def data_consume(url, connection):

  channel = connection.channel()   

  channel.start_consuming()

  def callback(ch, method, properties, message_in):     
    message = message_in.decode('utf-8')
    print("Incoming message", message)
    
    # Collect geo data and veunes data
    venues_df, query_params = generate_data_frame(message)

    # Data minning: Get the most common venues
    venues_grouped, neighborhoods_venues_sorted = most_common_venues(venues_df)

    # Generate needed data for the maps
    map_data = generate_map_data(venues_df, neighborhoods_venues_sorted)

    # Create clusters applying K-means algorithm   
    clusters = clustering(venues_grouped, neighborhoods_venues_sorted)

    # Generate data schema
    data_schema = data_format(query_params, clusters, map_data)

    message_out = json.dumps(data_schema) 

    data_publish(message_out, connection)

    with open("NEW_DATA.json", "w") as outfile:  
      json.dump(data_schema, outfile) 
    
    # Ack to rabbit
    ch.basic_ack(delivery_tag = method.delivery_tag)
    print("Message sent")

  channel.basic_qos(prefetch_count=1)
  channel.basic_consume(queue="data-to_generate", 
                      on_message_callback=callback, 
                      auto_ack=False)
  
  channel.start_consuming()



url = os.environ.get("CLOUDAMQP_URL")

params = pika.URLParameters(url)

# Establish connection to CloudAMQP
status, connection = connect_rabbitmq(params)

if (status == True):
  data_consume(url, connection)
else:
  print("Failure")
import os
print(os.getenv("DB_USERNAME"))