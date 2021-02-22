# Reports generator component - Venner
This component is responsible for generating PDF reports of the results of a query. To do so, it fills an HTML template with data and then converts it to PDF.

## Communication
Dispatches a message from a RabbitMQ queue with the ID of the document from which the data will be extracted to create the report.
It requests the document to the microservice "Data provider" through an HTTPS request.
It publishes the document in the "Reports manager" server and it returns the path where the document was stored.
Finally, another RabbitMQ queue sends the document save path as a message.

##  Technologies
* Python.
  * Pandas.
  * Jinja2.
  * XHtml2PDF.
* RabbitMQ.
