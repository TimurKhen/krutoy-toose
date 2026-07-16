# STAGE 1: Setup & Build
FROM node:alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci
RUN npm install -g @angular/cli
COPY . .
RUN ng build --configuration production

# STAGE 2: Copy to nginx
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/krutoi-toose/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
