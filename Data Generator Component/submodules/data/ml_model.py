from sklearn.cluster import KMeans
import json



def clustering(venues_grouped, neighborhoods_venues_sorted):
  # set number of clusters
  kclusters = 5

  venues_grouped_clustering = venues_grouped.drop('Neighborhood', 1)

  # run k-means clustering
  kmeans = KMeans(n_clusters=kclusters, random_state=0).fit(venues_grouped_clustering)
  
  # add clustering labels
  neighborhoods_venues_sorted.insert(0, 'Cluster Labels', kmeans.labels_)
  
  # Clusters
  cluster_one = neighborhoods_venues_sorted[(neighborhoods_venues_sorted['Cluster Labels'] == 0)].drop(['Cluster Labels'],axis=1).to_json(orient="records") 

  cluster_two = neighborhoods_venues_sorted[(neighborhoods_venues_sorted['Cluster Labels'] == 1)].drop(['Cluster Labels'],axis=1).to_json(orient="records") 

  cluster_three = neighborhoods_venues_sorted[(neighborhoods_venues_sorted['Cluster Labels'] == 2)].drop(['Cluster Labels'],axis=1).to_json(orient="records") 

  cluster_four = neighborhoods_venues_sorted[(neighborhoods_venues_sorted['Cluster Labels'] == 3)].drop(['Cluster Labels'],axis=1).to_json(orient="records") 

  cluster_five = neighborhoods_venues_sorted[(neighborhoods_venues_sorted['Cluster Labels'] == 4)].drop(['Cluster Labels'],axis=1).to_json(orient="records") 

  clusters = [json.loads(cluster_one), json.loads(cluster_two), json.loads(cluster_three), json.loads(cluster_four), json.loads(cluster_five)]

  return clusters