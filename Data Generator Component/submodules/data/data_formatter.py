import json

def data_format(query_params, clusters, venues):
  schema = {
    "creation-date": "",
    "expiration-date": "",
    "country": query_params[0],
    "state": query_params[1],
    "city": query_params[2],
    "borough": query_params[3],
    "clusters": clusters,
    "maps": venues,
  }

  return schema
