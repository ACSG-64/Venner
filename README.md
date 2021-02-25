# Data generator component - Venner
This component is in charge of exploring the places of a particular location using the Foursqare API and converting them into data to be stored in Mongo DB.

## Tasks
* Explore the most common places in a given location.
* Extract the top 10 most common types of places by neighborhoods.
* Segment the information obtained from the previous point into similar groups by applying the K-means clustering algorithm.
* Establish the geographic information of each place found in the point that belong to the top 10 most common types of places by neighborhoods.

## Communication
* It receives the command to generate the information by dispatching messages from a RabbitMQ queue containing the name of the place.
* It queries the basic geographic location of the place in the database to start its task.
* Since it cannot write to the database, it posts a message to a RabbitMQ coda with the data generated and formatted to be added to the database by another component.

## Technologies
* Python 3.
  * Pandas.
  * Scikit-learn.
* Foursquare API.
* Mongo DB (Atlas).
* RabbitMQ.
