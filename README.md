# 🏗 Under Construction 🚧

## API
### `GET /api/symptoms`
Retrieves a paginated list of symptoms, sorted in descending frequency.

| param         | Description          | required  |
| ------------- |:--------------------:| ---------:|
| page          | Page number          | false     |

Sample response:
```json
GET /api/symptoms/

HTTP 200 OK
Allow: GET, HEAD, OPTIONS
Content-Type: application/json
Vary: Accept

{
    "count": 3,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": 2,
            "name": "itchy rash",
            "count": 3
        },
        {
            "id": 1,
            "name": "sore throat",
            "count": 0
        },
        {
            "id": 3,
            "name": "runny nose",
            "count": 0
        }
    ]
}
```

### `GET /api/diagnostics`
Retrieves a paginated list of sdiagnostics for the provided symptoms, sorted in descending frequency.

| param           | Description                                              | required  |
| --------------- |:--------------------------------------------------------:| ---------:|
| symptom         | Id of the symptom for which we want a diagnosis          | true      |

Sample response:
```json
GET /api/diagnoses/?symptom=2

HTTP 200 OK
Allow: GET, POST, HEAD, OPTIONS
Content-Type: application/json
Vary: Accept

{
    "count": 10,
    "next": "http://127.0.0.1:8000/api/diagnoses/?page=2&symptom=2",
    "previous": null,
    "results": [
        {
            "condition": {
                "id": 10,
                "name": " sunburn",
                "count": 2
            },
            "count": 2,
            "symptom_count": 3
        },
        {
            "condition": {
                "id": 11,
                "name": " irritant contact dermatitis",
                "count": 1
            },
            "count": 1,
            "symptom_count": 3
        },
        {
            "condition": {
                "id": 12,
                "name": " non-specific dermatitis (skin inflammation)",
                "count": 0
            },
            "count": 0,
            "symptom_count": 3
        },
        {
            "condition": {
                "id": 13,
                "name": " hives",
                "count": 0
            },
            "count": 0,
            "symptom_count": 3
        },
        {
            "condition": {
                "id": 14,
                "name": " benign skin growth",
                "count": 0
            },
            "count": 0,
            "symptom_count": 3
        }
    ]
}
```

### `POST /api/diagnostics`
Increments the counts for the provided diagnosis. Body must include valid symptom and condition ids:

```json
{
    "condition": "11",
    "symptom": "2"
}
```