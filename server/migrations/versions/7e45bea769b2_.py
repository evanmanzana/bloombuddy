"""empty message

Revision ID: 7e45bea769b2
Revises: b86ef27c3106
Create Date: 2023-08-09 23:24:24.212043

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7e45bea769b2'
down_revision = 'b86ef27c3106'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('care_tasks', schema=None) as batch_op:
        batch_op.alter_column('due_date',
               existing_type=sa.DATE(),
               type_=sa.DateTime(),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('care_tasks', schema=None) as batch_op:
        batch_op.alter_column('due_date',
               existing_type=sa.DateTime(),
               type_=sa.DATE(),
               existing_nullable=True)

    # ### end Alembic commands ###