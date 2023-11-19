import pandas as pd
import psycopg2
from sklearn.preprocessing import MinMaxScaler, LabelEncoder
from sklearn.model_selection import train_test_split
from keras.models import Sequential
from keras.layers import LSTM, Dense
import numpy as np


# Function to read SQL query from file
def read_sql_query(file_path):
    with open(file_path, 'r') as file:
        return file.read()


# Function to format and execute the SQL query
def execute_query(query, values, db_params):
    try:
        # Establish a database connection
        conn = psycopg2.connect(**db_params)
        cur = conn.cursor()

        # Format the query with the provided values
        formatted_query = query.format(*values)

        # Execute the query
        cur.execute(formatted_query)
        result = cur.fetchall()
        conn.commit()

        print("Query executed successfully")
        return result
    except Exception as e:
        print("An error occurred:", e)
    finally:
        cur.close()
        conn.close()


def create_sequences(data, sequence_length):
    X, y = [], []
    for i in range(len(data) - sequence_length):
        seq = data.iloc[i:i + sequence_length]
        target = data.iloc[i + sequence_length]
        X.append(seq[['epoch', 'linia_encoded', 'train_id_encoded']])  # add relevant features
        y.append(target[['latitude', 'longitude']])
    return np.array(X), np.array(y)


# Replace these with your actual database connection details
db_params = {
    "dbname": "fgc",
    "user": "postgres",
    "password": "devdesktoppass",
    "host": "localhost",
    "port": "5432"
}

# Path to your SQL file
sql_file_path = 'queries/select_train_positions.sql'

# Read the query from the file
query_template = read_sql_query(sql_file_path)

results = execute_query(query_template, (), db_params)

df = pd.DataFrame(results, columns=['timestamp', 'linia', 'train_id', 'latitude', 'longitude'])
df['timestamp'] = pd.to_datetime(df['timestamp'])
df['epoch'] = (df['timestamp'] - pd.Timestamp("1970-01-01")) // pd.Timedelta('1s')
df['epoch'] = df['epoch'].astype('float32')

label_encoder = LabelEncoder()
df['linia_encoded'] = label_encoder.fit_transform(df['linia'])
df['train_id_encoded'] = label_encoder.fit_transform(df['train_id'])

scaler = MinMaxScaler()
df[['latitude', 'longitude']] = scaler.fit_transform(df[['latitude', 'longitude']])

print(df.head())

sequence_length = 5  # example length
X, y = create_sequences(df, sequence_length)

X = X.astype('float32')
y = y.astype('float32')

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print(X.shape, y.shape)

model = Sequential()
model.add(LSTM(units=50, return_sequences=True, input_shape=(X_train.shape[1], X_train.shape[2])))
model.add(LSTM(units=50))
model.add(Dense(2))  # for predicting latitude and longitude

model.compile(optimizer='adam', loss='mean_squared_error')
model.fit(X_train, y_train, epochs=10, batch_size=64)

# Evaluate the model
model.evaluate(X_test, y_test)

# Make future predictions (you need to provide input sequence X_future)
linia_future = label_encoder.fit_transform(['S1'])[0]  # Getting the first element
train_id_future = label_encoder.fit_transform(['6c4bdae602747613ef|6a2dc7e402'])[0]  # Same here

single_future_point = np.array([[[1700421536.0, linia_future, train_id_future]]], dtype='float32')

# Replicate the data point to create a sequence of length 5
X_future = np.repeat(single_future_point, 5, axis=0).reshape(1, 5, 3)

print(X_future)

# Now predict using the model
predicted_locations = model.predict(X_future)
predicted_locations = scaler.inverse_transform(predicted_locations)

print(predicted_locations)
