import boto3
import botocore
import os
import uuid

BUCKET_NAME = os.environ.get("S3_BUCKET")
S3_LOCATION = f"https://{BUCKET_NAME}.s3.amazonaws.com/"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}

s3 = boto3.client(
  's3',
  aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"),
  aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY")
)

def get_unique_filename(filename):
  ext = filename.rsplit('.', 1)[1].lower()
  unique_filename = uuid.uuid4().hex
  return f"{unique_filename}.{hex}"

def upload_file(file, acl="public-read"):
  print("Bucket Name", BUCKET_NAME)
  try:
    s3.upload_file_obj(
      file,
      BUCKET_NAME,
      file.filename,
      extra_args={
        "ACL": acl,
        "ContentType": file.content_type
      }
    )
  except Exception as e:
    print("AWS error message:", str(e))
    return {"errors": str(e)}

  return {"url": f"{S3_LOCATION}{file.filename}"}

def delete_file_from_s3(image_url):
  #aws requires filename, so split out of url
  key = image_url.rsplit("/", 1)[1]
  try:
    s3.delete_object(
      Bucket=BUCKET_NAME,
      Key=key
    )
  except Exception as e:
    print("AWS error message:", str(e))
    return {"errors": str(e)}

  return True
