# Laconia batch test

Laconia batch cannot handle async events properly. When there's a list of items to process it'll skip processing the last item. 

# Issue

**Expected Behavior**

We see 3 INFO JOKE lines:
1. Vs Code
2. Fleet
3. Eclipse

**Current Behavior**

There's only 2 INFO JOKE log line. The last item is not invoked. Also the second invocation errors.

**Steps to Reproduce**

1. Create a bucket in s3 and change the bucket name in the code
2. Create a file called test.json with test json content
3. Invoke the lambda function from the console

# Example

Test input

```json
[
    {
        "name": "VS Code"
    },
    {
        "name": "Fleet"
    },
    {
        "name": "Eclipse"
    }
]
```

Logs for the first 3 invocations


![alt](screenshots/firstinvocation.png)