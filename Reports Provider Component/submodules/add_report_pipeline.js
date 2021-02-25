let check_one = false;
let check_two = false;

async function add_report(params, db_client, db_ops){

  // Check if the report exists 
  let status_r = await db_ops.report_existence(params.df_id, db_client);
  console.log("¿EXISTE? " + params.df_id + " " + status_r);
  console.log(check_two)
  if(status_r ==  true){
    // If so, add user id to the report
    let success_upd = await db_ops.update_document_user(params.df_id, params.user_id, db_client); 
    console.log(check_two)
    if(success_upd == true){
      check_one = true;
    } 
    else {
      check_one = false;
    }
  } 
  else{
    console.log(check_two)
    // If not, check if data_frame exists before to add a document
    let status_df = await db_ops.data_frame_existence(params.df_id, db_client);
    if (status_df == true){
      // Then add a document
      let success_crt = await db_ops.add_document(params.df_id, params.user_id, db_client);
      if (success_crt == true){
        check_two = true;
      } 
      else {
        check_two = false;
      }
    }
    else {
      check_two = false;
    }   
  }; 
    /*
    [TF] If check_one is True and check_two is False => the report exists and we can update the report
    [FT] If check_one is False and check_two is True => the report doesnt exists but the dataframe does so we added a document
    [FF] If check_one is False and check_two is False => the report doesnt exists and data frame doesnt exist and/or we cant add the document to the db
    */
    
    console.log("FIN" + [check_one, check_two])
    return ([check_one, check_two]);
}


exports.add_report = add_report;