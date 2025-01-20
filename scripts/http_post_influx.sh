#!/bin/bash

ORG="hypower"
BUCKET="upload_test"
API_TOKEN="hypower"
URL="http://localhost:8086/api/v2/write"
PRECISION="ns"

data_points=(
    "longitude,host=host1 value=10"
)

# Join the data points with newline characters
data_binary=$(printf "%s\n" "${data_points[@]}")

curl --request POST \
"${URL}?org=${ORG}&bucket=${BUCKET}&precision=${PRECISION}" \
  --header "Authorization: Token ${API_TOKEN}" \
  --header "Content-Type: text/plain; charset=utf-8" \
  --header "Accept: application/json" \
  --data-binary "${data_binary}"
