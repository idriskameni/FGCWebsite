import browser_cookie3
import numpy as np
import requests
from requests.exceptions import RequestException


def get_classes(linia):
    """
    Interpolates additional points along a line defined by a list of points.

    :param line_points: A list of (longitude, latitude) tuples.
    :param num_extra_points: Number of extra points to generate between each pair of original points.
    :return: A list of (longitude, latitude) tuples including the original and the interpolated points.
    """

    num_extra_points = 1

    # Retrieve cookies
    cookies = browser_cookie3.edge(domain_name='.opendatasoft.com')
    cookie_dict = {c.name: c.value for c in cookies}

    try:
        # Define the URL
        url = f'https://fgc.opendatasoft.com/api/explore/v2.1/catalog/datasets/gtfs_routes/records?where=route_id%3D%22{linia}%22&limit=100'

        # Make the request
        response = requests.get(url, cookies=cookie_dict)

        # Check if the response was successful
        if response.ok:
            data = response.json()
            results = data.get('results')

        # Handle different response statuses
        elif response.status_code == 404:
            print("Error 404: Resource not found.")
            return {}
        elif response.status_code == 500:
            print("Error 500: Server error.")
            return {}
        else:
            print(f"Error {response.status_code}: {response.reason}")
            return {}

    except RequestException as e:
        print(f"An error occurred: {e}")
        return {}

    line_points = results[0].get('shape').get('geometry').get('coordinates')[0]

    if len(line_points) < 2 or num_extra_points < 1:
        # No interpolation possible
        return line_points

    # Initialize the list with the first point
    interpolated_points = [line_points[0]]

    for i in range(len(line_points) - 1):
        start_point = np.array(line_points[i])
        end_point = np.array(line_points[i + 1])

        # Linearly interpolate between start_point and end_point
        for j in range(1, num_extra_points + 1):
            fraction = j / (num_extra_points + 1)
            new_point = start_point + fraction * (end_point - start_point)
            interpolated_points.append(list(new_point))

        # Add the end point of the current segment
        interpolated_points.append(line_points[i + 1])

    # Create a dictionary mapping each point to a unique class number
    points_class_dict = {tuple(point): class_num for class_num, point in enumerate(interpolated_points)}

    return points_class_dict
