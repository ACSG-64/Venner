import pymongo, os



#clientDB = pymongo.MongoClient("mongodb+srv://ai_service:CDfswd64@vennerdb.nlif3.mongodb.net/VennerDB?retryWrites=true&w=majority")

clientDB = pymongo.MongoClient(os.getenv("ATLAS_URL"))

db = clientDB.get_database("VennerDB")
collection = db.GeoData


def query(country, state, city, borough):
  
  cursor = collection.aggregate([ 
    { "$match": { "country": country }},
    { "$match": { "state": state }},
    { "$match": { "city": city }},
    { "$unwind": "$boroughs" }, 
    { "$match": { "boroughs.borough": borough }},
    { "$project" : {"boroughs" : 1 }}
   ]) 

  return list(cursor)


