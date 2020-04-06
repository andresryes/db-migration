# db-migration
Datos 1 

# Build de image 
docker build --no-cache --force-rm=true -t node_example .

# Run it 

docker run \
--name typical_node_example -it \
-e NODE_ORACLEDB_USER=$NODE_ORACLEDB_USER \
-e NODE_ORACLEDB_PASSWORD=$NODE_ORACLEDB_PASSWORD \
-e NODE_ORACLEDB_CONNECTIONSTRING=$NODE_ORACLEDB_CONNECTIONSTRING \
node_example

# With ATP 

docker run \
--name cloud_atp_node_example -it \
-v /my/host/machine/credentials/directory:/wallet \
-e NODE_ORACLEDB_USER=$NODE_ORACLEDB_USER \
-e NODE_ORACLEDB_PASSWORD=$NODE_ORACLEDB_PASSWORD \
-e NODE_ORACLEDB_CONNECTIONSTRING=$NODE_ORACLEDB_CONNECTIONSTRING \
-e TNS_ADMIN=/wallet \
-p 3000:3000 \
node_example

# With PostgreSQL AWS RDS