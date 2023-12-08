import browser_cookie3
import requests
from requests.exceptions import RequestException

def get_routes():
    """
    Fetch train routes data from a remote API.

    Returns:
        list or None: A list of train route records if the request is successful, or None if there's an error.
    """
    # Retrieve cookies
    cookies = browser_cookie3.edge(domain_name='.opendatasoft.com')
    cookie_dict = {c.name: c.value for c in cookies}

    try:
        # Define the URL
        url = 'https://dadesobertes.fgc.cat/api/explore/v2.1/catalog/datasets/gtfs_routes/records?limit=100'

        # Make the request
        response = requests.get(url, cookies=cookie_dict)

        # Check if the response was successful
        if response.ok:
            data = response.json()
            return data.get('results')

        # Handle different response statuses
        elif response.status_code == 404:
            print("Error 404: Resource not found.")
            return None
        elif response.status_code == 500:
            print("Error 500: Server error.")
            return None
        else:
            print(f"Error {response.status_code}: {response.reason}")
            return None

    except RequestException as e:
        print(f"An error occurred: {e}")
        return None
