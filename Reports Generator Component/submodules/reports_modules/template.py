import jinja2
from submodules.reports_modules.data_processor import cluster_processor

def PopulateTemplate(data_in):

  data = cluster_processor(data_in)

  html = jinja2.Environment(  
        loader=jinja2.FileSystemLoader(searchpath='')).get_template(
        './submodules/reports_modules/report_template/report_template.html').render(data = data)
  
  return html