from flask import jsonify
import requests
import ast

url = "https://dadesobertes.fgc.cat/api/explore/v2.1/catalog/datasets/gtfs_routes/records?limit=100"
response = requests.get(url)
data = response.json()  # Assuming the data is in JSON format
result = []
for element in data.get('results'):
    json_element = ast.literal_eval(str(element))
    result.append(json_element)

print(result)