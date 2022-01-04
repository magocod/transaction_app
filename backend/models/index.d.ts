import { Sequelize, Model, Optional, ModelCtor } from "sequelize";

// models

type ModelObject = { [p: string]: ModelCtor<Model> };

interface TransactionAttributes {
  id: number;
  title: string;
}

interface TransactionCreationAttributes
  extends Optional<TransactionAttributes, "id"> {}

export class Transaction
  extends Model<TransactionAttributes, TransactionCreationAttributes>
  implements TransactionAttributes
{
  public id: number; // Note that the `null assertion` `!` is required in strict mode.
  public title: string;

  // timestamps!
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: ModelObject): void;
}

interface TaskAttributes {
  id: number;
  name: string;
  userId: number;
}

interface TaskCreationAttributes extends Optional<TaskAttributes, "id"> {}

export class Task
  extends Model<TaskAttributes, TaskCreationAttributes>
  implements TaskAttributes
{
  public id: number;
  public name: string;
  public userId: number;

  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: ModelObject): void;
}

interface UserAttributes {
  id: number;
  name: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id: number; // Note that the `null assertion` `!` is required in strict mode.
  public name: string;

  // timestamps!
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: ModelObject): void;
}

interface DbInstance {
  Sequelize: typeof Sequelize;
  sequelize: Sequelize;
  Transaction: ModelCtor<Transaction>;
  Task: ModelCtor<Task>;
  User: ModelCtor<User>;
}

declare const db: DbInstance;

export default db;
