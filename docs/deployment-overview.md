# Deployment Overview

This guide describes the standard deployment path used across projects in this repository.

## Target architecture

| Component | AWS Service | Notes |
|-----------|-------------|--------|
| Frontend | Amplify Hosting or S3 + CloudFront | Next.js SSR/static export |
| API | ECS Fargate or Lambda + API Gateway | Express/NestJS containers |
| Database | RDS PostgreSQL or DynamoDB | Per project `architecture.md` |
| Cache | ElastiCache Redis | Sessions, rate limits, hot reads |
| Auth | Cognito or JWT + Secrets Manager | MFA for enterprise projects |
| Files | S3 | User uploads, exports, media |
| Email | SES | Transactional notifications |
| Async | SQS + Lambda / EventBridge | Workers, webhooks, AI jobs |
| DNS | Route53 + ACM | TLS certificates |
| Security | WAF, IAM, KMS | Least privilege, encryption |
| Observability | CloudWatch, X-Ray | Logs, metrics, traces |

## Deployment sequence

1. **Bootstrap state** — S3 backend + DynamoDB lock table for Terraform (one-time).
2. **Network** — VPC, public/private subnets, NAT, security groups.
3. **Data layer** — RDS/DynamoDB, ElastiCache, S3 buckets.
4. **Compute** — ECR images, ECS service or Lambda functions.
5. **Edge** — CloudFront distribution, WAF WebACL.
6. **Identity** — Cognito user pool, app client, hosted UI (if used).
7. **CI/CD** — GitHub OIDC role → ECR push → ECS rolling deploy.
8. **Smoke tests** — `/health`, auth flow, critical API paths.

## Environment promotion

| Environment | Purpose |
|-------------|---------|
| `dev` | Feature development, relaxed IAM |
| `staging` | Pre-production parity, integration tests |
| `prod` | Customer-facing, autoscaling, backups enabled |

## Rollback

- **ECS:** revert task definition to previous revision
- **Lambda:** alias traffic shift to previous version
- **Database:** restore RDS snapshot (document RPO/RTO per project)

See [examples/terraform](./examples/terraform/) for reusable modules.
