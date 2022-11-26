FROM python:3.11.0

WORKDIR /tmp

COPY requirements.txt .

RUN pip install --upgrade pip

RUN pip install -r requirements.txt

WORKDIR /app

EXPOSE 3000

CMD python3 -um src.app