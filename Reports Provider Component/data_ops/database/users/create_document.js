const {db_client} = require('../../../data_ops/index');

async function create_document(df){
  
  // Expire after 45 days from the creation of the dataframe
  let df_creation_date = new Date(df["createdAt"]);
  let expiration_date = df_creation_date + 3888000000;

  let rep_document = {
    "expireAt": expiration_date,
    "creation-date": df["creation-date"],
    "expiration-date": expiration_date.toLocaleDateString(),
    "data-frame-id": df_id,
    "country": df["country"],
    "state": df["state"],
    "city": df["city"],
    "borough": df["borough"],
    "report-path": "",
    "users-allowed": []
  }

  await db_client.db("VennerDB").collection("PDF_Reports").insertOne(rep_document);

}

exports.create_document = create_document;