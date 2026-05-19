# Personal Expense Tracker

        > **Level:** Beginner · **Project 01** · [`01-personal-expense-tracker`](./)

        Track daily spending with categories, budgets, and monthly reports.

        ## Overview

        Personal Expense Tracker is a production-oriented full stack application demonstrating modern web development
        patterns integrated with AWS cloud services. The codebase follows clean architecture principles
        with separated frontend, backend, and infrastructure layers.

        ## Features

        - JWT auth
- Category budgets
- CSV export
- Dashboard charts

        ## Tech Stack

        | Layer | Technologies |
        |-------|--------------|
        | Frontend | Next.js, Tailwind, Shadcn UI |
        | Backend | Express, TypeScript |
        | Database | PostgreSQL |
        | Authentication | JWT + Cognito |
        | AWS | Cognito, RDS PostgreSQL, S3 receipts, CloudWatch |

        ## Learning Outcomes

        - REST API design
- CRUD with PostgreSQL
- Chart dashboards

        ## Repository Layout

        ```
        01-personal-expense-tracker/
        ├── README.md
        ├── architecture.md
        ├── docker-compose.yml
        ├── .env.example
        ├── frontend/          # Next.js application
        ├── backend/           # API server
        ├── infrastructure/    # Terraform / AWS CDK
        └── docs/              # API & deployment guides
        ```

        ## Quick Start

        ### Prerequisites

        - Node.js 20+
        - Docker & Docker Compose
        - AWS CLI v2 (configured profile)
        - Terraform 1.6+ (for infrastructure)

        ### Local Development

        ```bash
        cp .env.example .env
        docker compose up -d
        cd backend && npm install && npm run dev
        cd ../frontend && npm install && npm run dev
        ```

        - Frontend: http://localhost:3000
        - API: http://localhost:4000
        - API docs: http://localhost:4000/docs

        ## Deployment

        See [docs/deployment.md](./docs/deployment.md) for AWS deployment using the included
        Terraform modules (ECS, RDS, CloudFront) or serverless alternatives where applicable.

        ## Architecture

        See [architecture.md](./architecture.md) for system diagrams, data flows, and security boundaries.

        ## API Documentation

        OpenAPI specification: [docs/openapi.yaml](./docs/openapi.yaml)

        ## Screenshots

        | Dashboard | Mobile |
        |-----------|--------|
        | ![Dashboard](./docs/screenshots/dashboard.png) | ![Mobile](./docs/screenshots/mobile.png) |

        Add screenshots after running locally — paths are wired for CI artifact upload.

        ## License

        MIT — see repository root [LICENSE](../../LICENSE).
