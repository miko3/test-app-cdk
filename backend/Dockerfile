FROM rust:1.71 as builder
WORKDIR /usr/src/backend
COPY . .
RUN cargo install --path .

FROM centos:latest
COPY --from=builder /usr/local/cargo/bin/backend /usr/local/bin/backend
CMD ["backend"]