import pika, os, requests, hashlib
from datetime import datetime
from submodules.reports_modules.template import PopulateTemplate
from submodules.reports_modules.report import generateFile
from submodules.reports_modules.report_sender import send_report
 

from submodules.rabbit_utils.rabbit_publisher import data_publish
from submodules.rabbit_utils.rabbit_connection import connect_rabbitmq
from submodules.logger.logging import add_log
from submodules.data.data_collector import collect_data


def data_consume(url, connection):

  channel = connection.channel()   

  channel.start_consuming()

  def callback(ch, method, properties, message_in): 

    message = message_in.decode('utf-8')
    print("Incoming message", message)
    # Collect geo data and veunes data
    data_db = collect_data(message)  

    if(data_db == False):
      ch.basic_reject(delivery_tag = method.delivery_tag)

    # Populate the template
    template = PopulateTemplate(data_db)

    # Generate the report
    name_report = "{0}_{1}.pdf".format(
      hashlib.md5(( data_db['city'] + str(datetime.now()) ).encode('utf-8')).hexdigest(), 
      data_db['city'].replace(' ', '-').replace('.', ''))
    
    report = generateFile(template, name_report)

    # Send the report and wait for the store path
    report_remote_path = send_report(os.path.dirname(os.path.abspath(__file__)) + "/" + name_report)

    if(report_remote_path == False):
      ch.basic_reject(delivery_tag = method.delivery_tag)
      return     

    # message_out = (str(query_params) + ",/private/reports/elReporte.pdf")

    print(report_remote_path)

    message_out = "https://CodeDoor-FSWD-Reports-manager-service.andrescamilocamilo.repl.co{0},{1}".format(report_remote_path, message)

    data_publish(message_out, connection)  

    # Delete the generated report from our local storange
    os.remove(name_report) 
    
    # Ack to rabbit
    ch.basic_ack(delivery_tag = method.delivery_tag)
    print("Message sent")

  channel.basic_qos(prefetch_count=1)
  channel.basic_consume(queue="report-to_generate", 
                      on_message_callback=callback, 
                      auto_ack=False)
  
  channel.start_consuming()


url = os.environ.get("CLOUDAMQP_URL", "amqps://knuafcvn:B0NSPeYvE5mp2YzMucVrYb7Ppw6Tn_4D@fly.rmq.cloudamqp.com/knuafcvn")

params = pika.URLParameters(url)


# Establish connection to CloudAMQP
status, connection = connect_rabbitmq(params)


if (status == True):
  data_consume(url, connection)
else:
  print("Failure")




