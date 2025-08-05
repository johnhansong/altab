import boto3
import logging
import botocore
import os
import uuid

BUCKET_NAME = os.environ.get("S3_BUCKET")
S3_LOCATION = f"https://{BUCKET_NAME}.s3.amazonaws.com/"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}

if not BUCKET_NAME:
  raise ValueError("S3_BUCKET environment variable not set")

boto3.set_stream_logger('boto3', level=logging.DEBUG)
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger('botocore')


s3 = boto3.client(
  's3',
  region_name='us-east-2',
  aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"),
  aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY")
)

def allowed_file(filename):
  return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def get_unique_filename(filename):
  ext = filename.rsplit('.', 1)[1].lower()
  unique_filename = uuid.uuid4().hex
  return f"{unique_filename}.{ext}"

def upload_file_to_S3(file, acl="public-read"):
  filename = get_unique_filename(file.filename)
  file.stream.seek(0)
  logger.debug(f"Bucket Name: {BUCKET_NAME}")
  try:
    s3.upload_fileobj(
      file,
      BUCKET_NAME,
      filename,
      ExtraArgs={
        "ACL": acl,
        "ContentType": file.content_type
      }
    )
  except boto3.exceptions.S3UploadFailedError as e:
    logger.error("Upload failed:", e)
    return {"errors": str(e)}
  except Exception as e:
    logger.error("AWS error message:", str(e))
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
