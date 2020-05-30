import { Sequelize, Model, DataTypes } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db.sqlite'
});

// class User extends Model {}

//   User.init({
//     username: DataTypes.STRING,
//     name: DataTypes.STRING
//   }, { sequelize });
  
//   (async () => {
  
//     await sequelize.sync();
  
//     await User.create({
//       username: 'matlinski',
//       name: 'Mateusz Matlinski'
//     });
//   const displayUserDataValues = (User: User) => User.toJSON();
//     console.log((await User.findAll()).map(displayUserDataValues));
//   })();