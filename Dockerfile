FROM node:18.17.0 as build

ARG MODE=development

WORKDIR /app
COPY . .

RUN npm i --legacy-peer-deps

RUN if [ "$MODE" = "production" ] ; then npm run build:prod; else npm run build; fi

FROM nginx:alpine
COPY --from=build /app/out /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]