import pandas as pd
import json

def cluster_processor(data):

  for i in range(len(data["clusters"])):

    cluster  = json.dumps(data["clusters"][i])
    data["clusters"][i] = pd.read_json(cluster, orient="records").to_html(index=False)

  return data