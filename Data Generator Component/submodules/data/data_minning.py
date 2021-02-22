import pandas as pd
import numpy as np

def hot_encoding(df_venues):
  print("HOT ENCODING")
  
  venues_onehot = pd.get_dummies(df_venues[['Venue Category']], prefix="", prefix_sep="")

  # add neighborhood column back to dataframe
  venues_onehot['Neighborhood'] = df_venues['Neighborhood'] 

  # move neighborhood column to the first column HERE MIGHT BE THE PROBLEM
  # fixed_columns = [venues_onehot.columns[-1]] + list(venues_onehot.columns[:-1])

  fixed_columns = venues_onehot
  venues_onehot = venues_onehot#[fixed_columns]

  # gruping venues by Neighborhood
  venues_grouped = venues_onehot.groupby('Neighborhood').mean().reset_index()
  
  print(venues_grouped.columns)

  while (len(venues_grouped.columns) < 11):
    venues_grouped.insert(len(venues_grouped.columns), "N/A", 0)

  print(venues_grouped.columns)

  return venues_grouped



def top_most_common_venues(row, num_top_venues):
  print(row)
  row_categories = row.iloc[1:]
  row_categories_sorted = row_categories.sort_values(ascending=False)
  
  return row_categories_sorted.index.values[:10]


def venues_sorted(venues_grouped):
  num_top_venues = 10

  indicators = ['st', 'nd', 'rd']

  # create columns according to number of top venues
  columns = ['Neighborhood']
  for ind in np.arange(num_top_venues):
    try:
      columns.append('{0}{1} Most Common Venue'.format(ind+1, indicators[ind]))
    except:
      columns.append('{0}th Most Common Venue'.format(ind+1))

  # create a new dataframe
  neighborhoods_venues_sorted = pd.DataFrame(columns=columns)
  neighborhoods_venues_sorted['Neighborhood'] = venues_grouped['Neighborhood']

  print(venues_grouped.columns)

  for ind in np.arange(venues_grouped.shape[0]):
      neighborhoods_venues_sorted.iloc[ind, 1:] = top_most_common_venues(venues_grouped.iloc[ind, :], num_top_venues)

  return neighborhoods_venues_sorted



def most_common_venues(df_venues):
  print("MOST CV")
  print(df_venues.shape)
  venues_grouped = hot_encoding(df_venues)

  neighborhoods_venues_sorted = venues_sorted(venues_grouped)   

  return venues_grouped, neighborhoods_venues_sorted


  
