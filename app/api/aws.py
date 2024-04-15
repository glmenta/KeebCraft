import boto3
import botocore
from botocore.client import Config
import os
import uuid

import logging

from botocore.exceptions import ClientError


BUCKET_NAME = os.environ.get("S3_BUCKET")
S3_LOCATION = f"https://{BUCKET_NAME}.s3.amazonaws.com/"
ALLOWED_EXTENSIONS_IMAGES = {'jpg', 'png', 'jpeg'}

s3 = boto3.client(
    "s3",
    aws_access_key_id=os.environ.get("S3_KEEB_KEY"),
    aws_secret_access_key=os.environ.get("S3_KEEB_SECRET"),
    config=Config(signature_version='s3v4'),
    region_name='us-east-2'
)
fs2_var = os.environ.get("FS2_TEST")
testing_key = os.environ.get("S3_KEY")
print('this is the fs2_var',fs2_var, testing_key)
def if_allowed_image(filename):
    return "." in filename and \
        filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS_IMAGES


def file_unique_name(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_name = uuid.uuid4().hex
    return f'{unique_name}.{ext}'


def upload_S3(file, acl="private"):
    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        return {"errors": str(e)}

    return {"url": f"{S3_LOCATION}{file.filename}"}


def create_presigned_url(object_name, bucket_name=BUCKET_NAME, expiration=3600):
    try:
        response = s3.generate_presigned_url(
            'get_object',
            Params={
                'Bucket': bucket_name,
                'Key': object_name,
                },
            ExpiresIn=expiration
            )
    except ClientError as e:
        logging.error(e)
        return None

    return response
