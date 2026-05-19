# Podcast Hosting Platform

        > **Level:** Intermediate · **Project 49** · [`49-podcast-hosting-platform`](./)

        Upload episodes, RSS feeds, analytics, and distribution.

        ## Overview

        Podcast Hosting Platform is a production-oriented full stack application demonstrating modern web development
        patterns integrated with AWS cloud services. The codebase follows clean architecture principles
        with separated frontend, backend, and infrastructure layers.

        ## Features

        - RSS generator
- Episode analytics
- Transcripts
- Distribution

        ## Tech Stack

        | Layer | Technologies |
        |-------|--------------|
        | Frontend | Next.js |
        | Backend | NestJS |
        | Database | PostgreSQL |
        | Authentication | JWT |
        | AWS | S3 audio, CloudFront, Transcribe, RDS |

        ## Learning Outcomes

        - Media hosting
- RSS syndication

        ## Repository Layout

        ```
        49-podcast-hosting-platform/
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
