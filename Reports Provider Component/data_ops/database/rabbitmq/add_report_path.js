const {db_client} = require('../../../data_ops/index');

async function add_report_path(df_id, report_path) {

  let query = {
    "data-frame-id": df_id
  };
  let reportField = {
    $set: {
      "report-path": report_path
    }
  }

  await db_client.db("VennerDB").collection("PDF_Reports").updateOne(query, reportField);

}

exports.add_report_path = add_report_path;