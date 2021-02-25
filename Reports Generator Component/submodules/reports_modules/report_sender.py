import requests
import json
import time

def send_report(report_file): 

  attempts = 1

  try: 
    report = {'report': open(report_file, 'rb')}
  except:
    return False

  while(attempts <= 5):
    post_report = requests.post('https://CodeDoor-FSWD-Reports-manager-service.andrescamilocamilo.repl.co/upload_pdf', files = report)

    print(post_report.status_code)

    if(post_report.status_code == 200):
      return post_report.text
    
    print("Trying to establish a connection with the [Reports Manager] microservice. => Attempt", attempts, "of 5")    
    time.sleep(7)
    attempts += 1

  
  return False
