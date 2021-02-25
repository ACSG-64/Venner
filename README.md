# Data generator component - Venner
Transforms cluster data into PDF reports for easy saving by the user.

## Tasks
* Transforms cluster data into PDF files.
* Sends PDFs to a server responsible for providing them to the user.

## Communication
* It receives the command to generate the PDFs by dispatching messages from a RabbitMQ queue containing the ID of the Dataframe.
* It queries to the Data Provider Microservice to start its task.
* Sends PDFs to a server responsible for providing them to the user.
* Publish in a RabibtMQ queue the path where the report was stored in the server.

## Technologies
* Python 3.
  * Pandas.
  * XHtml2PDF.
* RabbitMQ.
