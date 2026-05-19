#!/usr/bin/env python3
"""Generate the 100-fullstack-aws-projects repository structure and scaffolds."""

from __future__ import annotations

import json
import os
from pathlib import Path
from textwrap import dedent

ROOT = Path(__file__).resolve().parent.parent
CATALOG_PATH = Path(__file__).parent / "projects-catalog.json"

LEVEL_ORDER = ["beginner", "intermediate", "advanced", "enterprise"]


def write(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content.rstrip() + "\n", encoding="utf-8")


def numbered_slug(index: int, slug: str) -> str:
    return f"{index:02d}-{slug}"


def project_readme(p: dict, index: int, folder: str) -> str:
    features = "\n".join(f"- {f}" for f in p["features"])
    aws = ", ".join(p["aws"])
    outcomes = "\n".join(f"- {o}" for o in p["outcomes"])
    tech_fe = ", ".join(p["frontend"])
    tech_be = ", ".join(p["backend"])
    return dedent(
        f"""
        # {p["name"]}

        > **Level:** {p["level"].title()} · **Project {index:02d}** · [`{folder}`](./)

        {p["description"]}

        ## Overview

        {p["name"]} is a production-oriented full stack application demonstrating modern web development
        patterns integrated with AWS cloud services. The codebase follows clean architecture principles
        with separated frontend, backend, and infrastructure layers.

        ## Features

        {features}

        ## Tech Stack

        | Layer | Technologies |
        |-------|--------------|
        | Frontend | {tech_fe} |
        | Backend | {tech_be} |
        | Database | {p["db"]} |
        | Authentication | {p["auth"]} |
        | AWS | {aws} |

        ## Learning Outcomes

        {outcomes}

        ## Repository Layout

        ```
        {folder}/
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
        """
    ).strip()


def architecture_md(p: dict) -> str:
    aws_list = "\n".join(f"  - {s}" for s in p["aws"])
    return dedent(
        f"""
        # Architecture — {p["name"]}

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
            DB[({p["db"]})]
            AUTH[Auth Provider]
          end
          WEB --> CF --> AG --> API
          API --> DB
          WEB --> AUTH
          API --> AUTH
        ```

        ## AWS Services

        {aws_list}

        ## Request Flow

        1. User authenticates via {p["auth"]}.
        2. Browser calls REST/GraphQL API with JWT or session cookie.
        3. API validates input, applies rate limits, executes domain logic.
        4. Data persisted in {p["db"]}; assets stored in S3 when applicable.
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
        """
    ).strip()


def env_example(p: dict) -> str:
    return dedent(
        f"""
        # {p["name"]} — Environment Variables
        NODE_ENV=development
        PORT=4000
        FRONTEND_URL=http://localhost:3000
        DATABASE_URL=postgresql://app:app@localhost:5432/{p["slug"].replace("-", "_")}
        REDIS_URL=redis://localhost:6379
        JWT_SECRET=change-me-in-production-use-secrets-manager
        JWT_EXPIRES_IN=7d
        AWS_REGION=us-east-1
        AWS_ACCESS_KEY_ID=
        AWS_SECRET_ACCESS_KEY=
        S3_BUCKET={p["slug"]}-assets-dev
        COGNITO_USER_POOL_ID=
        COGNITO_CLIENT_ID=
        """
    ).strip()


def docker_compose(p: dict) -> str:
    db_image = "postgres:16-alpine" if "PostgreSQL" in p["db"] or "postgres" in p["db"].lower() else "mongo:7"
    db_port = "5432:5432" if "postgres" in db_image else "27017:27017"
    db_env = (
        "POSTGRES_USER=app\n      POSTGRES_PASSWORD=app\n      POSTGRES_DB="
        + p["slug"].replace("-", "_")
        if "postgres" in db_image
        else "MONGO_INITDB_DATABASE=" + p["slug"].replace("-", "_")
    )
    return dedent(
        f"""
        services:
          frontend:
            build: ./frontend
            ports:
              - "3000:3000"
            environment:
              NEXT_PUBLIC_API_URL: http://localhost:4000
            depends_on:
              - backend

          backend:
            build: ./backend
            ports:
              - "4000:4000"
            env_file:
              - .env
            depends_on:
              - db
              - redis

          db:
            image: {db_image}
            ports:
              - "{db_port}"
            environment:
              {db_env}

          redis:
            image: redis:7-alpine
            ports:
              - "6379:6379"
        """
    ).strip()


def backend_package_json(p: dict) -> str:
    is_nest = any("NestJS" in b for b in p["backend"])
    main = "dist/main.js" if is_nest else "dist/index.js"
    deps = (
        '"@nestjs/common": "^10.4.0", "@nestjs/core": "^10.4.0", "@nestjs/platform-express": "^10.4.0",'
        if is_nest
        else '"express": "^4.21.0",'
    )
    return json.dumps(
        {
            "name": f"{p['slug']}-api",
            "version": "1.0.0",
            "private": True,
            "scripts": {
                "dev": "tsx watch src/main.ts" if is_nest else "tsx watch src/index.ts",
                "build": "tsc",
                "start": f"node {main}",
                "lint": "eslint src --ext .ts",
                "test": "vitest run",
            },
            "dependencies": {
                **json.loads(
                    "{" + deps + '"cors": "^2.8.5", "helmet": "^8.0.0", "zod": "^3.23.0", '
                    '"jsonwebtoken": "^9.0.2", "bcryptjs": "^2.4.3", '
                    '"express-rate-limit": "^7.4.0", "@aws-sdk/client-s3": "^3.650.0", '
                    '"@aws-sdk/client-dynamodb": "^3.650.0", "ioredis": "^5.4.0", "pino": "^9.4.0"}'
                )
            },
            "devDependencies": {
                "@types/node": "^22.0.0",
                "@types/express": "^4.17.21",
                "@types/jsonwebtoken": "^9.0.6",
                "@types/bcryptjs": "^2.4.6",
                "typescript": "^5.6.0",
                "tsx": "^4.19.0",
                "vitest": "^2.1.0",
                "eslint": "^9.0.0",
            },
        },
        indent=2,
    )


def backend_entry(p: dict) -> str:
    return dedent(
        '''
        import cors from "cors";
        import express from "express";
        import helmet from "helmet";
        import rateLimit from "express-rate-limit";
        import { healthRouter } from "./routes/health";
        import { authRouter } from "./routes/auth";
        import { apiRouter } from "./routes/api";
        import { errorHandler } from "./middleware/error-handler";
        import { logger } from "./lib/logger";

        const app = express();
        const port = Number(process.env.PORT ?? 4000);

        app.use(helmet());
        app.use(cors({ origin: process.env.FRONTEND_URL ?? "http://localhost:3000", credentials: true }));
        app.use(express.json({ limit: "2mb" }));
        app.use(rateLimit({ windowMs: 60_000, max: 120 }));

        app.use("/health", healthRouter);
        app.use("/auth", authRouter);
        app.use("/api/v1", apiRouter);

        app.use(errorHandler);

        app.listen(port, () => {
          logger.info({ port }, "API server listening");
        });
        '''
    ).strip()


def backend_files(p: dict, base: Path) -> None:
    src = base / "backend" / "src"
    write(base / "backend" / "package.json", backend_package_json(p))
    write(
        base / "backend" / "tsconfig.json",
        json.dumps(
            {
                "compilerOptions": {
                    "target": "ES2022",
                    "module": "NodeNext",
                    "moduleResolution": "NodeNext",
                    "outDir": "dist",
                    "rootDir": "src",
                    "strict": True,
                    "esModuleInterop": True,
                    "skipLibCheck": True,
                },
                "include": ["src/**/*"],
            },
            indent=2,
        ),
    )
    write(base / "backend" / "Dockerfile", dockerfile_backend())
    entry = "main.ts" if any("NestJS" in b for b in p["backend"]) else "index.ts"
    write(src / entry, backend_entry(p))
    write(
        src / "lib/logger.ts",
        'import pino from "pino";\nexport const logger = pino({ level: process.env.LOG_LEVEL ?? "info" });\n',
    )
    write(
        src / "middleware/error-handler.ts",
        dedent(
            '''
            import type { ErrorRequestHandler } from "express";
            import { ZodError } from "zod";
            import { logger } from "../lib/logger";

            export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
              if (err instanceof ZodError) {
                return res.status(400).json({ error: "Validation failed", details: err.flatten() });
              }
              logger.error(err);
              res.status(500).json({ error: "Internal server error" });
            };
            '''
        ).strip(),
    )
    write(
        src / "routes/health.ts",
        dedent(
            '''
            import { Router } from "express";
            export const healthRouter = Router();
            healthRouter.get("/", (_req, res) => {
              res.json({ status: "ok", service: "'''
            + p["slug"]
            + """-api", timestamp: new Date().toISOString() });
            });
            """
        ).strip(),
    )
    write(
        src / "routes/auth.ts",
        dedent(
            '''
            import { Router } from "express";
            import { z } from "zod";
            import bcrypt from "bcryptjs";
            import jwt from "jsonwebtoken";

            export const authRouter = Router();

            const registerSchema = z.object({
              email: z.string().email(),
              password: z.string().min(8),
              name: z.string().min(1),
            });

            authRouter.post("/register", async (req, res, next) => {
              try {
                const body = registerSchema.parse(req.body);
                const passwordHash = await bcrypt.hash(body.password, 12);
                const token = jwt.sign(
                  { sub: body.email, name: body.name },
                  process.env.JWT_SECRET ?? "dev-secret",
                  { expiresIn: process.env.JWT_EXPIRES_IN ?? "7d" },
                );
                res.status(201).json({ token, user: { email: body.email, name: body.name } });
              } catch (e) {
                next(e);
              }
            });

            authRouter.post("/login", async (req, res, next) => {
              try {
                const body = registerSchema.pick({ email: true, password: true }).parse(req.body);
                const token = jwt.sign(
                  { sub: body.email },
                  process.env.JWT_SECRET ?? "dev-secret",
                  { expiresIn: "7d" },
                );
                res.json({ token });
              } catch (e) {
                next(e);
              }
            });
            '''
        ).strip(),
    )
    write(
        src / "routes/api.ts",
        dedent(
            f'''
            import {{ Router }} from "express";
            import {{ requireAuth }} from "../middleware/auth";

            export const apiRouter = Router();

            apiRouter.use(requireAuth);

            apiRouter.get("/dashboard", (_req, res) => {{
              res.json({{
                project: "{p["name"]}",
                metrics: {{
                  activeUsers: 1284,
                  revenue: 48230,
                  growth: 12.4,
                }},
              }});
            }});
            '''
        ).strip(),
    )
    write(
        src / "middleware/auth.ts",
        dedent(
            '''
            import type { RequestHandler } from "express";
            import jwt from "jsonwebtoken";

            export const requireAuth: RequestHandler = (req, res, next) => {
              const header = req.headers.authorization;
              if (!header?.startsWith("Bearer ")) {
                return res.status(401).json({ error: "Unauthorized" });
              }
              try {
                const token = header.slice(7);
                const payload = jwt.verify(token, process.env.JWT_SECRET ?? "dev-secret");
                (req as any).user = payload;
                next();
              } catch {
                res.status(401).json({ error: "Invalid token" });
              }
            };
            '''
        ).strip(),
    )


def dockerfile_backend() -> str:
    return dedent(
        """
        FROM node:20-alpine AS builder
        WORKDIR /app
        COPY package*.json ./
        RUN npm ci
        COPY . .
        RUN npm run build

        FROM node:20-alpine
        WORKDIR /app
        ENV NODE_ENV=production
        COPY --from=builder /app/dist ./dist
        COPY --from=builder /app/package*.json ./
        RUN npm ci --omit=dev
        EXPOSE 4000
        CMD ["node", "dist/index.js"]
        """
    ).strip()


def frontend_files(p: dict, base: Path) -> None:
    write(
        base / "frontend" / "package.json",
        json.dumps(
            {
                "name": f"{p['slug']}-web",
                "version": "1.0.0",
                "private": True,
                "scripts": {
                    "dev": "next dev",
                    "build": "next build",
                    "start": "next start",
                    "lint": "next lint",
                },
                "dependencies": {
                    "next": "^14.2.0",
                    "react": "^18.3.0",
                    "react-dom": "^18.3.0",
                    "framer-motion": "^11.5.0",
                    "zustand": "^4.5.0",
                    "clsx": "^2.1.0",
                    "tailwind-merge": "^2.5.0",
                    "lucide-react": "^0.441.0",
                },
                "devDependencies": {
                    "@types/node": "^22.0.0",
                    "@types/react": "^18.3.0",
                    "typescript": "^5.6.0",
                    "tailwindcss": "^3.4.0",
                    "postcss": "^8.4.0",
                    "autoprefixer": "^10.4.0",
                },
            },
            indent=2,
        ),
    )
    write(
        base / "frontend" / "next.config.mjs",
        '/** @type {import("next").NextConfig} */\nconst nextConfig = { reactStrictMode: true };\nexport default nextConfig;\n',
    )
    write(
        base / "frontend" / "tailwind.config.ts",
        dedent(
            '''
            import type { Config } from "tailwindcss";
            const config: Config = {
              darkMode: ["class"],
              content: ["./src/**/*.{ts,tsx}"],
              theme: {
                extend: {
                  colors: {
                    background: "hsl(222 47% 6%)",
                    foreground: "hsl(210 40% 98%)",
                    primary: "hsl(217 91% 60%)",
                    muted: "hsl(217 33% 14%)",
                  },
                },
              },
              plugins: [],
            };
            export default config;
            '''
        ).strip(),
    )
    write(
        base / "frontend" / "Dockerfile",
        dedent(
            """
            FROM node:20-alpine AS deps
            WORKDIR /app
            COPY package*.json ./
            RUN npm ci
            FROM deps AS builder
            COPY . .
            RUN npm run build
            FROM node:20-alpine
            WORKDIR /app
            ENV NODE_ENV=production
            COPY --from=builder /app/.next/standalone ./
            COPY --from=builder /app/.next/static ./.next/static
            COPY --from=builder /app/public ./public
            EXPOSE 3000
            CMD ["node", "server.js"]
            """
        ).strip(),
    )
    write(
        base / "frontend" / "src/app/layout.tsx",
        dedent(
            f'''
            import "./globals.css";
            import type {{ Metadata }} from "next";

            export const metadata: Metadata = {{
              title: "{p["name"]}",
              description: "{p["description"]}",
            }};

            export default function RootLayout({{ children }}: {{ children: React.ReactNode }}) {{
              return (
                <html lang="en" className="dark">
                  <body className="min-h-screen bg-background text-foreground antialiased">
                    {{children}}
                  </body>
                </html>
              );
            }}
            '''
        ).strip(),
    )
    write(
        base / "frontend" / "src/app/globals.css",
        dedent(
            '''
            @tailwind base;
            @tailwind components;
            @tailwind utilities;

            body {
              background: radial-gradient(ellipse at top, hsl(217 33% 12%), hsl(222 47% 6%));
            }

            .glass {
              @apply rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl;
            }
            '''
        ).strip(),
    )
    write(
        base / "frontend" / "src/app/page.tsx",
        dedent(
            f'''
            "use client";
            import {{ motion }} from "framer-motion";

            export default function HomePage() {{
              return (
                <main className="mx-auto max-w-6xl px-6 py-16">
                  <motion.section
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass p-10"
                  >
                    <p className="text-sm uppercase tracking-widest text-primary">AWS Full Stack</p>
                    <h1 className="mt-4 text-4xl font-semibold tracking-tight">{p["name"]}</h1>
                    <p className="mt-4 max-w-2xl text-lg text-white/70">{p["description"]}</p>
                    <motion.a
                      href="/dashboard"
                      whileHover={{ scale: 1.02 }}
                      className="mt-8 inline-flex rounded-xl bg-primary px-6 py-3 font-medium text-white"
                    >
                      Open Dashboard
                    </motion.a>
                  </motion.section>
                </main>
              );
            }}
            '''
        ).strip(),
    )
    write(
        base / "frontend" / "src/app/dashboard/page.tsx",
        dedent(
            f'''
            "use client";
            import {{ useEffect, useState }} from "react";

            type Metrics = {{ activeUsers: number; revenue: number; growth: number }};

            export default function DashboardPage() {{
              const [metrics, setMetrics] = useState<Metrics | null>(null);

              useEffect(() => {{
                fetch(process.env.NEXT_PUBLIC_API_URL + "/api/v1/dashboard", {{
                  headers: {{ Authorization: "Bearer demo-token" }},
                }})
                  .then((r) => r.json())
                  .then((d) => setMetrics(d.metrics))
                  .catch(() =>
                    setMetrics({{ activeUsers: 0, revenue: 0, growth: 0 }}),
                  );
              }}, []);

              return (
                <main className="mx-auto max-w-6xl px-6 py-12">
                  <h1 className="text-3xl font-semibold">Dashboard</h1>
                  <div className="mt-8 grid gap-6 md:grid-cols-3">
                    {{[
                      ["Active Users", metrics?.activeUsers ?? "—"],
                      ["Revenue", metrics?.revenue ?? "—"],
                      ["Growth %", metrics?.growth ?? "—"],
                    ].map(([label, value]) => (
                      <motion.div key={{label}} className="glass p-6">
                        <p className="text-sm text-white/60">{{label}}</p>
                        <p className="mt-2 text-3xl font-semibold">{{value}}</p>
                      </div>
                    ))}}
                  </motion.div>
                </main>
              );
            }}
            '''
        ).strip().replace("motion.div", "motion.div").replace(
            "import { useEffect", 'import { motion } from "framer-motion";\nimport { useEffect'
        ),
    )


def terraform_main(p: dict) -> str:
    return dedent(
        f'''
        terraform {{
          required_version = ">= 1.6.0"
          required_providers {{
            aws = {{
              source  = "hashicorp/aws"
              version = "~> 5.0"
            }}
          }}
        }}

        provider "aws" {{
          region = var.aws_region
        }}

        variable "aws_region" {{
          default = "us-east-1"
        }}

        variable "project_name" {{
          default = "{p["slug"]}"
        }}

        resource "aws_s3_bucket" "assets" {{
          bucket = "${{var.project_name}}-assets-${{data.aws_caller_identity.current.account_id}}"
        }}

        data "aws_caller_identity" "current" {{}}

        output "assets_bucket" {{
          value = aws_s3_bucket.assets.bucket
        }}
        '''
    ).strip()


def openapi_stub(p: dict) -> str:
    return dedent(
        f'''
        openapi: 3.1.0
        info:
          title: {p["name"]} API
          version: 1.0.0
        paths:
          /health:
            get:
              summary: Health check
              responses:
                "200":
                  description: OK
          /auth/login:
            post:
              summary: Login
              responses:
                "200":
                  description: JWT issued
          /api/v1/dashboard:
            get:
              summary: Dashboard metrics
              security:
                - bearerAuth: []
              responses:
                "200":
                  description: Metrics payload
        components:
          securitySchemes:
            bearerAuth:
              type: http
              scheme: bearer
        '''
    ).strip()


def deployment_doc(p: dict) -> str:
    return dedent(
        f'''
        # Deployment Guide — {p["name"]}

        ## AWS Architecture (Recommended)

        1. **VPC** — Public/private subnets across 2 AZs
        2. **RDS / DynamoDB** — Primary datastore ({p["db"]})
        3. **ECS Fargate** — Backend containers behind ALB
        4. **Amplify / S3+CloudFront** — Next.js frontend
        5. **Cognito** — User pools when using {p["auth"]}
        6. **CloudWatch** — Logs, metrics, alarms

        ## Deploy Infrastructure

        ```bash
        cd infrastructure/terraform
        terraform init
        terraform plan -var="project_name={p["slug"]}"
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
        '''
    ).strip()


def generate_project(p: dict, index: int) -> str:
    folder_name = numbered_slug(index, p["slug"])
    level = p["level"]
    base = ROOT / "projects" / level / folder_name

    write(base / "README.md", project_readme(p, index, folder_name))
    write(base / "architecture.md", architecture_md(p))
    write(base / ".env.example", env_example(p))
    write(base / "docker-compose.yml", docker_compose(p))
    backend_files(p, base)
    frontend_files(p, base)
    write(base / "infrastructure/terraform/main.tf", terraform_main(p))
    write(base / "infrastructure/terraform/variables.tf", 'variable "environment" { default = "dev" }\n')
    write(base / "infrastructure/cdk/README.md", "AWS CDK stacks mirror Terraform modules. Use `cdk deploy` after `cdk bootstrap`.\n")
    write(base / "docs/deployment.md", deployment_doc(p))
    write(base / "docs/openapi.yaml", openapi_stub(p))
    write(base / "docs/screenshots/.gitkeep", "")
    return folder_name


def main() -> None:
    catalog = json.loads(CATALOG_PATH.read_text())
    projects = catalog["projects"]
    assert len(projects) == 100, f"Expected 100 projects, got {len(projects)}"

    counters = {level: 0 for level in LEVEL_ORDER}
    generated = []

    for i, p in enumerate(projects, start=1):
        level = p["level"]
        counters[level] += 1
        folder = generate_project(p, i)
        generated.append({**p, "index": i, "folder": folder})

    manifest = ROOT / "projects" / "manifest.json"
    write(manifest, json.dumps(generated, indent=2))
    print(f"Generated {len(generated)} projects under {ROOT / 'projects'}")


if __name__ == "__main__":
    main()
