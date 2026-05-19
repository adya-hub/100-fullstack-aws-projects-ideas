# Enterprise ERP Lite

        > **Level:** Enterprise · **Project 76** · [`76-enterprise-erp-lite`](./)

        Modules for finance, procurement, inventory, and reporting across business units.

        ## Overview

        Enterprise ERP Lite is a production-oriented full stack application demonstrating modern web development
        patterns integrated with AWS cloud services. The codebase follows clean architecture principles
        with separated frontend, backend, and infrastructure layers.

        ## Features

        - Multi-module
- Approvals
- Audit
- Reporting

        ## Tech Stack

        | Layer | Technologies |
        |-------|--------------|
        | Frontend | Next.js |
        | Backend | NestJS microservices |
        | Database | PostgreSQL |
        | Authentication | SAML SSO |
        | AWS | RDS Multi-AZ, EKS, SQS, KMS |

        ## Learning Outcomes

        - ERP domain modeling
- Enterprise RBAC

        ## Repository Layout

        ```
        76-enterprise-erp-lite/
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
