import requests
import browser_cookie3


def get_train_positions():

    API_KEY = '3ac8eaafda6eedb394021ef52eec5e9ff28221dd07a6457454f655b1'

    headers = {
        'Authorization': f'Bearer {API_KEY}'
    }
    
    url = f"https://fgc.opendatasoft.com/api/explore/v2.1/catalog/datasets/posicionament-dels-trens/records?limit=100&apikey={API_KEY}"
    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        print(response)
        return []
    else:
        response_data = response.json()
        results = response_data.get('results', [])  # Ensure this matches the API's structure

        return results
    
if __name__ == "__main__":
    cookies = browser_cookie3.chrome(domain_name='.opendatasoft.com')
    print(cookies)