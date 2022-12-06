FROM python:3.11.0-slim

WORKDIR /tmp

COPY requirements.txt .

RUN pip install --upgrade pip

RUN pip install -r requirements.txt

WORKDIR /app

EXPOSE 3000

COPY src src

CMD gunicorn -b 0.0.0.0:3001 --timeout 600 src.wsgi:app --access-logfile -