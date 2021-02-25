import re

def clean_data(data):
  # Allow only alphanumeric characters and commas
  filter_regex = re.findall("[,.a-zA-Z0-8 ]", data)

  # Convert listo to string
  clean_string = "".join(filter_regex)
  
  #Replace multiple white spaces with a single white space
  clean_string= re.sub('\s+',' ',clean_string)

  return clean_string