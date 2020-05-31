import { Sequelize, Model, DataTypes } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db.sqlite'
});

class Method extends Model {}
class Vars extends Model {}

Method.init({
  index: DataTypes.STRING,
  header: DataTypes.STRING,
  name: DataTypes.STRING,
  category: DataTypes.STRING,
  description: DataTypes.STRING,
  vars:  DataTypes.STRING
}, { sequelize });

export { Method, sequelize };