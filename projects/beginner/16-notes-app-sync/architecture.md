# Architecture — Synced Notes Application

      ## System Context

      ```mermaid
      flowchart TB
        subgraph Client
          WEB[Next.js Web App]
        end
        subgraph AWS
          CF[CloudFront]
          AG[API Gateway / ALB]
          API[Backend Service]
          DB[(PostgreSQL)]
          AUTH[Auth Provider]
        end
        WEB --> CF --> AG --> API
        API --> DB
        WEB --> AUTH
        API --> AUTH
      ```

      ## AWS Services

        - S3
- OpenSearch
- RDS

      ## Request Flow

      1. User authenticates via JWT.
      2. Browser calls REST/GraphQL API with JWT or session cookie.
      3. API validates input, applies rate limits, executes domain logic.
      4. Data persisted in PostgreSQL; assets stored in S3 when applicable.
      5. Async work (email, indexing, AI) dispatched via SQS/EventBridge.

      ## Security

      - Secrets in AWS Secrets Manager / SSM Parameter Store
      - Encryption at rest (KMS) and in transit (TLS 1.2+)
      - IAM least-privilege roles per service
      - WAF on CloudFront for public endpoints
      - Structured audit logging to CloudWatch

      ## Scalability

      - Stateless API containers behind ALB or Lambda concurrency
      - Read replicas / ElastiCache for hot read paths
      - S3 + CloudFront for static assets and media
      - Horizontal pod autoscaling on EKS/ECS where deployed
