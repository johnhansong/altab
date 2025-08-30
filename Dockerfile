FROM node:20-alpine AS frontend
WORKDIR /frontend
COPY react-vite/package*.json ./
RUN npm ci
COPY react-vite/ ./
RUN npm run build  # produces /frontend/dist

FROM python:3.9.18-alpine3.18

# RUN apk add build-base
# RUN apk add postgresql-dev gcc python3-dev musl-dev

RUN apk add --no-cache build-base postgresql-dev

# ARG FLASK_APP=app
# ARG FLASK_ENV=production
# ARG SCHEMA

# ENV FLASK_APP=${FLASK_APP}
# ENV FLASK_ENV=${FLASK_ENV}
# ENV SCHEMA=${SCHEMA}

WORKDIR /var/www

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
# RUN pip install -r requirements.txt
# RUN pip install psycopg2

COPY . .

RUN rm -rf /var/www/react-vite/dist
COPY --from=frontend /frontend/dist /var/www/react-vite/dist
ENV RUN_SEEDS=false
CMD sh -c 'flask db upgrade && \
  if [ "$RUN_SEEDS" = "true" ]; then flask seed all; fi && \
  gunicorn -b 0.0.0.0:$PORT app:app'

# RUN flask db upgrade
# RUN flask seed all

# CMD flask db upgrade && flask seed all && gunicorn app:app
# CMD sh -c "flask db upgrade && flask seed all && gunicorn app:app"
