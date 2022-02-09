FROM node:16-alpine

# Install chromium
ENV CHROME_BIN="/usr/bin/chromium-browser" \
    NODE_ENV="production"

RUN apk add --no-cache  chromium --repository=http://dl-cdn.alpinelinux.org/alpine/v3.10/main

WORKDIR /app

# Copy content of host current directory
# into working directory
COPY . /app

RUN npm install --quiet

# Expose a port
EXPOSE 3000

CMD ["npm", "run", "dev"]

