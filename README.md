# Runtime Behavior and Managment

## Host

  http://<APP_ID>.appspot.com/

## Credential/Secret Managment

Set `GOOGLE_APPLICATION_CREDENTIALS` to local path to secrets file for use in
development env. Required(?) for local process to access various Google Cloud
Services, like Storage.  
Make HTTP req to another service in the app: `The simplest approach is to send
HTTP requests to a service by including its name in the URL:
<service-name>.app-id.appspot.com`. NOT ENCRYPTED, apparently.

## Health Checking

Special default health check route: `/_ah/health`. Respond with `200` or `404`,
otherwise App Engine will bounce the process after N failures.

## Routing to Services

The dispatch file can contain up to 20 routing rules. When specifying the URL
string, neither the hostname nor the path can be longer than 100 characters.


## Microservices within the Project/App

App Engine SSL does not cover deep domains, so the `VERSION.SERVICE.APP_ID.appspot.com`
pattern needs to be flattened with `-dot-`. Thus
`VERSION-dot-SERVICE-dot-APP_ID.appspot.com`.

Not that splitting traffic between two versions of the API requires setting the API
version number in the deployment version identifier. Thus
`http://user-service-v1.my-app.appspot.com/user-service/v1/` and
`http://user-service-v2.my-app.appspot.com/user-service/v2/`

Note also max number of serivces per project (25 ish?)

https://cloud.google.com/appengine/docs/standard/python/designing-microservice-api

A culture around strong, versioned contracts is probably the most challenging
organizational aspect of a stable, microservices-based application.
Development teams must internalize an understanding of a breaking change
versus a non-breaking change. They must know when a new major release is
required. They must understand how and when an old contract can be taken out
of service. Teams must employ appropriate communication techniques, including
deprecation and turn-down notices, to ensure awareness of changes to
microservice contracts. While this may sound daunting, building these
practices into your development culture will yield great improvements in
velocity and quality over time.

# Cloud Storage

## Make a Storage Bucket

```
  gsutil mb gs://bucket-<APP_ID>
  gsutil defacl set public-read gs://bucket-<APP_ID>
```

## Sync Assets to Bucket

```
  gsutil -m rsync -r ./assets gs://bucket-<APP_ID>
```

## GET Assets from Bucket

```
  GET https://storage.googleapis.com/bucket-<APP_ID>/assets/<ASSET_FILE_NAME>
```

## Work with Bucket in App

See https://cloud.google.com/appengine/docs/flexible/nodejs/using-cloud-storage

```
const storage = require('@google-cloud/storage')()
const bucket  = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET) // bucket name
// assuming a file is around here somewhere
// .file() creates a file reference to be the handle for the binary data we're about to send up
const blob    = bucket.file(req.file.filename)
const stream  = blob.createWriteStream() // woo!

stream.on('error', err => ())
stream.on('finish', () => ()) // publicUrl: `https://storage.googleapis.com/${bucket.name}/${blob.name}`
stream.end(req.file.buffer) // feed the buffered data to end, or pipe it across
```

## Google Cloud Repo Tools

What do?

# Cloud Datastore (NoSQL)

See https://cloud.google.com/appengine/docs/flexible/nodejs/using-cloud-datastore

# Cloud SQL

See https://cloud.google.com/appengine/docs/flexible/nodejs/using-cloud-sql-postgres

# CRON

See https://cloud.google.com/appengine/docs/flexible/nodejs/scheduling-jobs-with-cron-yaml
