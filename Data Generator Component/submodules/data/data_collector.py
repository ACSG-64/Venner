import os
import requests
import pandas as pd
from submodules.data.db import query
from submodules.data.input_validation import clean_data

foursquare = {
  "FS_id": os.getenv("FOURSQUARE_ID"),
  "FS_secret": os.getenv("FOURSQUARE_SECRET"), 
  "FS_version": '20180605',
  "FS_limit": 100
}

def results_to_dataframe(results):
  neighborhood = []
  latitude = []
  longitude = []

  for obj in results[0]["boroughs"]["neighborhoods"]:
      neighborhood.append(obj['Neighborhood'])
      latitude.append(obj['Latitude'])
      longitude.append(obj['Longitude'])

  df = pd.DataFrame({"Neighborhood": neighborhood, "Latitude": latitude, "Longitude": longitude})

  return df


def getNearbyVenues(neighborhoods, latitudes, longitudes, radius=500):
    
    venues_list=[]
    for neighb, lat, lng in zip(neighborhoods, latitudes, longitudes):
            
        # create the API request URL
        url = 'https://api.foursquare.com/v2/venues/explore?&client_id={0}&client_secret={1}&v={2}&ll={3},{4}&radius={5}&limit={6}'.format(
            foursquare["FS_id"], 
            foursquare["FS_secret"], 
            foursquare["FS_version"], 
            lat, 
            lng, 
            radius, 
            foursquare["FS_limit"])
            
        # make the GET request
        results = requests.get(url).json()["response"]["groups"][0]["items"]
        
        # return only relevant information for each nearby venue
        venues_list.append([(
            neighb, 
            lat, 
            lng, 
            v['venue']['name'], 
            v['venue']['location']['lat'], 
            v['venue']['location']['lng'],  
            v['venue']['categories'][0]['name']) for v in results])

    nearby_venues = pd.DataFrame([item for venue_list in venues_list for item in venue_list])
    nearby_venues.columns = ['Neighborhood', 
                  'Neighborhood Latitude', 
                  'Neighborhood Longitude', 
                  'Venue', 
                  'Venue Latitude', 
                  'Venue Longitude', 
                  'Venue Category']
    
    return(nearby_venues)

def generate_data_frame(data):
  # Clean data
  cleaned_data = clean_data(str(data))

  # Extract the parameters required
  parameters = cleaned_data.split(",")[:4]
  for i in range (len(parameters)):
    parameters[i] = parameters[i].strip()

  # Query the database
  results_json = query(parameters[0], parameters[1], parameters[2], parameters[3])

  print(results_json)

  if (len(results_json) < 1):
    return "Invalid parameters"

  # Convert results to dataframe
  df = results_to_dataframe(results_json)

  # Foursquare query MAP GENERATION HERE
  venues = getNearbyVenues(
    neighborhoods=df['Neighborhood'],
    latitudes=df['Latitude'],
    longitudes=df['Longitude']
  )
  return venues, parameters