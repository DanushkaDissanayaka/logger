# Logger
This is an server for iot device sensor data validation.

create model (no need to do already done!)
sequelize model:create --name solarchargerdata --attributes solar:float,battery:float

migrate database
sequelize db:migrate --env production
