resource "aws_db_subnet_group" "expense" {
  name       = "${var.project_name}-db-subnet"
  subnet_ids = var.private_subnet_ids
}

resource "aws_security_group" "rds" {
  name        = "${var.project_name}-rds-sg"
  description = "PostgreSQL access from ECS tasks"
  vpc_id      = var.vpc_id

  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [var.ecs_security_group_id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_db_instance" "expense" {
  identifier             = "${var.project_name}-postgres"
  engine                 = "postgres"
  engine_version         = "16"
  instance_class         = "db.t4g.micro"
  allocated_storage      = 20
  db_name                = "expense_tracker"
  username               = "app"
  password               = var.db_password
  db_subnet_group_name   = aws_db_subnet_group.expense.name
  vpc_security_group_ids = [aws_security_group.rds.id]
  skip_final_snapshot    = true
  storage_encrypted      = true
}

output "database_endpoint" {
  value = aws_db_instance.expense.endpoint
}
