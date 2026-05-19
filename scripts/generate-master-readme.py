#!/usr/bin/env python3
"""Generate README.md from projects manifest."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
manifest = json.loads((ROOT / "projects" / "manifest.json").read_text())

rows = []
for p in manifest:
    aws = ", ".join(p["aws"][:4]) + ("…" if len(p["aws"]) > 4 else "")
    tech = ", ".join(p["frontend"][:2] + p["backend"][:1])
    outcomes = p["outcomes"][0]
    rows.append(
        f"| {p['index']:02d} | [{p['name']}](./projects/{p['level']}/{p['folder']}) | "
        f"{p['level'].title()} | {tech} | {aws} | {outcomes} |"
    )

table = "\n".join(rows)

readme = f"""<div align="center">

# 100 Full Stack AWS Projects

**Production-grade full stack applications for cloud-native engineers, startup builders, and portfolio builders.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Projects](https://img.shields.io/badge/Projects-100-success)](./projects)
[![AWS](https://img.shields.io/badge/AWS-Cloud--Native-FF9900?logo=amazonaws&logoColor=white)](https://aws.amazon.com)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)

[Learning Roadmap](#learning-roadmap) ·
[All Projects](#all-100-projects) ·
[Setup](#setup-guide) ·
[Deploy](#deployment-guide) ·
[Contribute](#contributing)

</div>

---

## Description

This repository is a curated library of **100 unique, real-world full stack projects** spanning **Beginner → Intermediate → Advanced → Enterprise** difficulty. Each project includes a **Next.js** frontend, **Node.js** API, **Docker** local stack, **Terraform** infrastructure, **architecture documentation**, and **AWS deployment guides**.

Built for engineers who want **resume-worthy portfolio work**, **interview preparation**, and **hands-on AWS experience** using the same patterns found at high-growth startups and cloud-native enterprises.

## Features

- **100 unique applications** — SaaS, marketplaces, AI platforms, DevOps tooling, enterprise systems
- **Consistent structure** — `frontend/`, `backend/`, `infrastructure/`, `docs/` in every project
- **Modern UI** — Tailwind CSS, glassmorphism dashboards, dark mode, Framer Motion
- **Security-first APIs** — JWT/OAuth, validation (Zod), rate limiting, Helmet, structured logging
- **AWS-native** — Cognito, Lambda, ECS/EKS, RDS, DynamoDB, S3, CloudFront, Bedrock, and more
- **DevOps ready** — Docker Compose, GitHub Actions, Terraform, AWS CDK stubs, monitoring patterns

## Tech Stack

| Layer | Technologies |
|-------|----------------|
| **Frontend** | Next.js 14, React 18, TypeScript, Tailwind CSS, Shadcn UI patterns, Zustand, Framer Motion |
| **Backend** | Node.js, Express.js, NestJS, GraphQL, REST, WebSockets |
| **Data** | PostgreSQL, MongoDB, Redis, DynamoDB, OpenSearch |
| **Auth** | JWT, OAuth 2.0, Auth.js, Amazon Cognito, Clerk-compatible patterns |
| **Cloud** | Amazon Web Services (30+ services across projects) |
| **DevOps** | Docker, Kubernetes, GitHub Actions, Terraform, AWS CDK, Nginx, CloudWatch |

## AWS Services Used

Across the monorepo you will work with:

`EC2` · `S3` · `CloudFront` · `Lambda` · `API Gateway` · `DynamoDB` · `RDS` · `Cognito` · `IAM` · `ECS` · `EKS` · `Amplify` · `SES` · `SNS` · `SQS` · `EventBridge` · `CloudWatch` · `Route53` · `VPC` · `Elastic Beanstalk` · `Step Functions` · `AppSync` · `Rekognition` · `Textract` · `Bedrock` · `OpenSearch` · `ElastiCache`

## Learning Roadmap

```mermaid
flowchart LR
  A[Beginner<br/>25 projects] --> B[Intermediate<br/>25 projects]
  B --> C[Advanced<br/>25 projects]
  C --> D[Enterprise<br/>25 projects]
```

| Phase | Focus | You will learn |
|-------|--------|----------------|
| **Beginner** | CRUD, auth, dashboards | REST design, PostgreSQL/DynamoDB, Cognito basics |
| **Intermediate** | SaaS features, real-time | WebSockets, search, payments, multi-role apps |
| **Advanced** | AI, streaming, platform engineering | Bedrock, media pipelines, K8s, cost tooling |
| **Enterprise** | Compliance, scale, governance | SSO/SCIM, multi-region, GRC, service mesh |

**Recommended path:** Complete 2–3 beginner projects end-to-end, then pick intermediate projects aligned with your target role (e.g. ecommerce, fintech, AI). Advance to enterprise projects when comfortable with Terraform and multi-service AWS deployments.

## Repository Structure

```
100-fullstack-aws-projects/
├── projects/
│   ├── beginner/          # Projects 01–25
│   ├── intermediate/      # Projects 26–50
│   ├── advanced/          # Projects 51–75
│   └── enterprise/        # Projects 76–100
├── .github/workflows/     # CI/CD templates
├── docs/                  # Shared architecture & DevOps guides
├── scripts/               # Repository generators
├── CONTRIBUTING.md
├── LICENSE
└── README.md
```

Each project contains:

```
<project>/
├── README.md
├── architecture.md
├── docker-compose.yml
├── .env.example
├── frontend/              # Next.js app
├── backend/               # Express/NestJS API
├── infrastructure/        # Terraform + CDK
└── docs/                  # OpenAPI, deployment, screenshots
```

## All 100 Projects

| # | Project | Level | Tech | AWS Services | Learning Outcome |
|---|---------|-------|------|--------------|------------------|
{table}

## Setup Guide

### Prerequisites

- **Node.js** 20 LTS
- **Docker** & **Docker Compose**
- **AWS CLI** v2 with configured profile
- **Terraform** 1.6+ (for infrastructure modules)

### Clone and explore

```bash
git clone https://github.com/your-org/100-fullstack-aws-projects.git
cd 100-fullstack-aws-projects
```

### Run any project locally

```bash
cd projects/beginner/01-personal-expense-tracker
cp .env.example .env
docker compose up -d
cd backend && npm install && npm run dev
cd ../frontend && npm install && npm run dev
```

- Web UI: http://localhost:3000  
- API: http://localhost:4000  
- Health: http://localhost:4000/health  

## Deployment Guide

1. Provision infrastructure: `cd infrastructure/terraform && terraform apply`
2. Build and push container images to **ECR**
3. Deploy API to **ECS Fargate** or **Lambda** (serverless projects)
4. Host frontend on **Amplify** or **S3 + CloudFront**
5. Configure **Route53**, **ACM** certificates, and **WAF**
6. Set **CloudWatch** alarms for latency and 5xx errors

See [docs/deployment-overview.md](./docs/deployment-overview.md) and per-project `docs/deployment.md`.

## DevOps

| Tool | Location |
|------|----------|
| GitHub Actions CI | [.github/workflows/ci.yml](./.github/workflows/ci.yml) |
| Terraform example | [docs/examples/terraform/](./docs/examples/terraform/) |
| Docker Compose | Each project `docker-compose.yml` |
| Kubernetes sample | [docs/examples/kubernetes/](./docs/examples/kubernetes/) |

## Cloud Architecture

High-level pattern used across most projects:

```mermaid
flowchart TB
  Users[Users] --> CF[CloudFront]
  CF --> FE[Next.js Frontend]
  Users --> AG[API Gateway / ALB]
  AG --> API[Node.js API]
  API --> DB[(RDS / DynamoDB)]
  API --> Cache[(ElastiCache / Redis)]
  API --> S3[S3 Assets]
  API --> Q[SQS / EventBridge]
  Q --> L[Lambda Workers]
  Cognito[Cognito / JWT] --> Users
  API --> CW[CloudWatch Logs & Metrics]
```

## Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for branch naming, code standards, and PR checklist.

## Screenshots

Add screenshots to each project's `docs/screenshots/` directory. The UI uses a consistent dark glassmorphism design system inspired by Vercel, Linear, and the AWS Console.

## License

MIT License — see [LICENSE](./LICENSE).

## Contact

- **Issues:** GitHub Issues for bugs and feature requests
- **Discussions:** Architecture questions and roadmap ideas
- **Maintainer:** Open an issue with tag `question` for mentorship-style guidance

---

<p align="center">Built for engineers who ship. Star the repo if it accelerates your cloud journey.</p>
"""

(ROOT / "README.md").write_text(readme)
print("Wrote README.md")
