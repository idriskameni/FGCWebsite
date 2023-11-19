import requests


def get_train_positions():

    url = "https://fgc.opendatasoft.com/api/explore/v2.1/catalog/datasets/posicionament-dels-trens/records?limit=100"
    response = requests.get(url)

    if response.status_code != 200:

        return []
    
    else:

        response_data = response.json()
        results = response_data.get('results')
        print(results)

        return results