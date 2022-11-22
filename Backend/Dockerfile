FROM python:3.11.0
WORKDIR /tmp
COPY requirements.txt .
RUN pip install -r requirements.txt
WORKDIR /app
EXPOSE 5000
CMD python3 -m src.app