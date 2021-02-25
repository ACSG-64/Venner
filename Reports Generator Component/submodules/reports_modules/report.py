from xhtml2pdf import pisa 

def generateFile(template, outputFileName):
  result_file = open(outputFileName, "w+b")

  # convert HTML to PDF
  pisa_status = pisa.CreatePDF(
            template,                # the HTML to convert
            dest=result_file)           # file handle to recieve result

  # close output file
  result_file.close()                 # close output file

  # return False on success and True on errors
  return pisa_status.err

