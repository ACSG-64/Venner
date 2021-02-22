import pandas as pd
import random, json

def generate_map_data(venues_df, neigh_ven_sort):
  venues_category = []
  venues_cat_color = []

  rows = ["1st Most Common Venue","2nd Most Common Venue","3rd Most Common Venue","4th Most Common Venue","5th Most Common Venue","6th Most Common Venue","7th Most Common Venue","8th Most Common Venue","9th Most Common Venue","10th Most Common Venue"]
  
  for row in rows:

    for data in neigh_ven_sort[row].unique():
      
      if (data not in venues_category):
        
        venues_category.append(data)

        while(True):

          color_number = random.randint(0,16777215)
          color = format(color_number,'x')
          color = str('#'+color)

          if (color not in venues_cat_color):
            venues_cat_color.append(color)
            break

  # Remove unnecesary columns
  venues_df.drop(["Neighborhood Latitude", "Neighborhood Longitude"],axis=1, inplace=True)

  # Add "color" column to our venues DF, then  colorize each venue category with the correspondent color
  venues_df["Color"] = None
  
  for i in range (len(venues_category)):
    venues_df.loc[venues_df['Venue Category'] == venues_category[i], 'Color'] = venues_cat_color[i]    
  
  venues_df.dropna(inplace = True)

  
  map_grouped = []

  for neighborhood in  venues_df["Neighborhood"].unique():
    neighborhood_group = venues_df[(venues_df['Neighborhood'] == neighborhood)].to_json(orient="records")  

    map_grouped.append(json.loads(neighborhood_group))

  # venues_df = venues_df.to_json(orient="records")  

  return map_grouped