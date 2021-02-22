from ..logger.logging import add_log
import pika, time


def connect_rabbitmq(params):
  connections_attempts = 1

  try:
    connection = pika.BlockingConnection(params)
    add_log("rabbit", "info", "Connection established")
    return True, connection
  except:
    add_log("rabbit", "warning",  "Trying to connect to the service in five intents")

  while (connections_attempts <= 5):
    try:
      connection = pika.BlockingConnection(params)
      add_log("rabbit", "warning",  "Connection established at the attempt {0}".format(connections_attempts))
      return True, connection
    except Exception:      
      #add_log("rabbit", "info",  "Connection attempt {0}".format(connections_attempts))
      connections_attempts += 1
      time.sleep(8)
      continue

  add_log("rabbit", "error",  "Error to connect, please check if the service service is running or if the credentials are correct")

  return False, "Error"