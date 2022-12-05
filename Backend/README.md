# Beer recommendation API

## Env variables

> Make sure that env variables are set

```text
MYSQL_DATABASE=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_ROOT_PASSWORD=
MYSQL_HOSTNAME=
MYSQL_PORT=
OPENAI_API_KEY=
```

## Usage

### Docker

```shell
docker-compose up --build
```

### Shell

```shell
# Start the database
docker-compose up -d db

# Start the api
python3 -m venv venv
source venv/bin/activate
python3 -m pip install -r requirements
python3 -m src.app
```

## Create the database

You need to create the database and populate it.

```shell
# Start the database
docker-compose up -d db

# Populate it
source venv/bin/activate
python3 -m pip install -r requirements
python3 -m src.Scripts.init_database -f < path to the folder that contains the json files >
python3 -m src.Scripts.populate_review_db -f < path to the .txt file that contains reviews >
```

## Adminer

```txt
    server: db
    user: same as the value in .env file
    password: same as the value in .env file
    database: same as the value in .env file
```
