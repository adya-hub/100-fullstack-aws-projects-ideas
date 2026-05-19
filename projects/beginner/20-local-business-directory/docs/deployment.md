# Deployment Guide — Local Business Directory

## AWS Architecture (Recommended)

1. **VPC** — Public/private subnets across 2 AZs
2. **RDS / DynamoDB** — Primary datastore (PostgreSQL)
3. **ECS Fargate** — Backend containers behind ALB
4. **Amplify / S3+CloudFront** — Next.js frontend
5. **Cognito** — User pools when using JWT + OAuth
6. **CloudWatch** — Logs, metrics, alarms

## Deploy Infrastructure

```bash
cd infrastructure/terraform
terraform init
terraform plan -var="project_name=local-business-directory"
terraform apply
```

## CI/CD

GitHub Actions workflow at repository root deploys on merge to `main`.
Configure `AWS_ROLE_ARN` and `AWS_REGION` repository secrets.

## Post-Deploy Checklist

- [ ] Run database migrations
- [ ] Seed initial admin user
- [ ] Configure Route53 DNS
- [ ] Enable WAF rules on CloudFront
- [ ] Set CloudWatch alarms for 5xx rate
