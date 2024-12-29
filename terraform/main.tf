provider "aws" {
  region = "us-east-1" # Change to your preferred region
}

# Create the S3 bucket
resource "aws_s3_bucket" "react_app_bucket" {
  bucket = "my-react-app-bucket-for-testing-1" # Replace with a unique bucket name

  # Enable static website hosting
  website {
    index_document = "index.html"
    error_document = "index.html"
  }

  tags = {
    Name        = "ReactAppBucket"
    Environment = "Production"
  }
}

# Disable Block Public Access settings
resource "aws_s3_bucket_public_access_block" "public_access_block" {
  bucket                  = aws_s3_bucket.react_app_bucket.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# Apply a bucket policy to allow public read access to objects
resource "aws_s3_bucket_policy" "public_policy" {
  bucket = aws_s3_bucket.react_app_bucket.id

  policy = jsonencode({
    Version   = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.react_app_bucket.arn}/*"
      }
    ]
  })
}

# Upload React build files to S3
resource "aws_s3_object" "react_build_files" {
  for_each = fileset("../build", "**/*")

  bucket       = aws_s3_bucket.react_app_bucket.id
  key          = each.value
  source       = "../build/${each.value}"
  content_type = lookup(var.mime_types, regexall("\\.[^.]*$", each.value)[0], "application/octet-stream")
}

# MIME types for common file extensions
variable "mime_types" {
  default = {
    ".html" = "text/html"
    ".css"  = "text/css"
    ".js"   = "application/javascript"
    ".json" = "application/json"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".svg"  = "image/svg+xml"
  }
}


# CloudFront Distribution
resource "aws_cloudfront_distribution" "react_app_distribution" {
  origin {
    domain_name = "${aws_s3_bucket.react_app_bucket.bucket_regional_domain_name}"
    origin_id   = "S3-${aws_s3_bucket.react_app_bucket.id}"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.origin_access_identity.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${aws_s3_bucket.react_app_bucket.id}"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  tags = {
    Name        = "ReactAppDistribution"
    Environment = "Production"
  }
}

# CloudFront Origin Access Identity to restrict direct S3 access
resource "aws_cloudfront_origin_access_identity" "origin_access_identity" {
  comment = "Access Identity for React App S3 Bucket"
}