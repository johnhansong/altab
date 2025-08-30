FROM node:20-alpine AS frontend
WORKDIR /frontend
COPY react-vite/package*.json ./
RUN npm ci
COPY react-vite/ ./
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}
RUN npm run build  # -> /frontend/dist


FROM python:3.9.18-alpine3.18

RUN apk add build-base

RUN apk add postgresql-dev gcc python3-dev musl-dev

ARG FLASK_APP=app
ARG FLASK_ENV=production
ARG SCHEMA

ENV FLASK_APP=${FLASK_APP}
ENV FLASK_ENV=${FLASK_ENV}
ENV SCHEMA=${SCHEMA}

WORKDIR /var/www

COPY requirements.txt .
RUN pip install -r requirements.txt
RUN pip install psycopg2

COPY . .

# RUN flask db upgrade
# RUN flask seed all

# CMD flask db upgrade && flask seed all && gunicorn app:app
CMD sh -c "flask db upgrade && flask seed all && gunicorn app:app"
