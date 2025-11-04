# Build stage
FROM node:22.20.0 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Set environment variable for build
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
