from datetime import datetime

def add_log(origin, level, message):

  file = ""
  
  if (str(origin).lower() == "rabbit"):
    file = "./logs/rabbitmq_log_output.log"
  elif (str(origin).lower() == "data-gen"):
    file = "./logs/data-gen_log_output.log"
  else:
    return "The file doesnt exist"


  if ((level.lower() == "info") or (level.lower() == "warning") or (level.lower() == "error") or (level.lower() == "critical")):

    with open(file, "a") as log:
      log.write("{0} - {1}: {2}\n".format(
        str(datetime.now().strftime("%d/%m/%Y %H:%M:%S")),
        level.upper(), 
        str(message))
      )
    
  else:
    return "please, select a valid level to log"
  
  return "log added successfully!"





