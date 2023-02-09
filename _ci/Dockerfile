FROM harbor.avlyun.org/public/node:14 as builder
WORKDIR /project
# 安装依赖
COPY package.json yarn.lock .npmrc /project/
RUN yarn install
# 构建
COPY . /project/
ENV PROJECT_NAME privacy-compliance-trial-fe
RUN yarn build

FROM harbor.avlyun.org/inf/fe
EXPOSE 8080
ENV PROJECT_NAME fos-dev
COPY --from=builder /project/build /usr/share/nginx/html
COPY _ci/default.conf.tmpl /etc/nginx/conf.d/default.conf.tmpl
