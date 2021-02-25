let {
  add_user,
  get_dataframe,
  create_document,
  delete_document
} = require('../../data_ops/index.js');
let {report_to_generate} = require('../../rabbitmq/index.js')

async function create_report(user_id, df_id, db) {

  try {
    let report = await add_user(user_id, df_id, db);
    return report;
  } catch (err) {

    try {
      let df = await get_dataframe(df_id);

      try {
        await create_document(df);
        let report = add_user(user_id, df_id, db);

        try {
          await report_to_generate(df_id);
          return await report;
        } catch (err) {
          delete_document(df_id);
          throw ("Unable to start generating the report");
        }

      } catch (err) {
        throw ("Unable to add the user");
      }

    } catch (err) {
      throw ("Unable to retreive the necessary data");
    }
  }

}

exports.create_report = create_report;