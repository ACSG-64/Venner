import requests
import json
import time

def collect_data(df_id): 

  attempts = 1

  while(attempts <= 5):

    request = requests.get("https://codedoor-fswd-data-provider-service.andrescamilocamilo.repl.co/query_id/{0}".format(df_id))

    if(request.status_code == 200):
      data = (request.content.decode('utf8'))     

      if (data.lower() != "false"):
        data = json.loads(data)
        return data
      else:
        return False
    
    print("Trying to establish a connection with the Data Provider microservice. => Attempt", attempts, "of 5")    
    time.sleep(7)
    attempts += 1

  
  return False


