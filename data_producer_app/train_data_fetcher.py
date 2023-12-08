import requests

def get_train_positions(cookies):
    """
    Fetches train positions from a specified URL and returns the data.

    Sends a GET request to the train data API using provided cookies for authentication.
    If the request is successful, it parses and returns the train position data. 
    In case of an unsuccessful request, it returns an empty list.

    Parameters:
        cookies (RequestsCookieJar): Cookies used for authenticating the request.

    Returns:
        list: A list of train positions if the request is successful, otherwise an empty list.
    """
    # API endpoint for fetching train positions
    url = "https://fgc.opendatasoft.com/api/explore/v2.1/catalog/datasets/posicionament-dels-trens/records?limit=100"

    # Send GET request to the API with the provided cookies
    response = requests.get(url, cookies=cookies)

    # Check if the response is successful (HTTP status code 200)
    if response.status_code != 200:
        return []  # Return an empty list in case of an unsuccessful request
    else:
        response_data = response.json()
        # Extract and return the 'results' part of the response data
        return response_data.get('results', [])  # Assumes 'results' key in response
