<<<<<<< HEAD
<<<<<<< HEAD
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
=======
# Venner
Venner is a web app that provides strategic information to users about the most common venues in a particular location.
=======
# Reports generator component - Venner
This component is responsible for generating PDF reports of the results of a query. To do so, it fills an HTML template with data and then converts it to PDF.
>>>>>>> 7f671cfc404def6c60d75a7fd0c96b4147dd4b64

## Communication
1. Dispatches a message from a RabbitMQ queue with the ID of the document from which the data will be extracted to create the report.
2. It requests the document to the microservice "Data provider" through an HTTPS request.
3. It publishes the document in the "Reports manager" server and it returns the path where the document was stored.
4. Finally, another RabbitMQ queue sends the document save path as a message.

<<<<<<< HEAD
>>>>>>> be4edb6c8081ee1ed0ea875bec2aea7e63c96ec5
=======
##  Technologies
* Python.
  * Pandas.
  * Jinja2.
  * XHtml2PDF.
* RabbitMQ.
>>>>>>> 7f671cfc404def6c60d75a7fd0c96b4147dd4b64
