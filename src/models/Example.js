import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Example = sequelize.define(
    'EXAMPLE_TABLE',
    {
      ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      USER_NAME: {
        type: DataTypes.STRING,
        length: 40,
        allowNull: false,
      },
      MEMO: {
        type: DataTypes.STRING,
        length: 255,
      },
      CREATED_AT: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      UPDATED_AT: {
        type: DataTypes.DATE,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      indexes: [
        {
          name: 'EXAMPLE_USER_NAME_IDX',
          unique: true,
          fields: ['USER_NAME'],
        },
      ],
    }
  );

  return Example;
};
